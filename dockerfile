# Base image with Node.js and system dependencies
FROM node:22.3.0-slim as base

ENV NODE_ENV production

RUN apt-get update && apt-get install -y openssl

WORKDIR /myapp

# Stage for installing development dependencies
FROM base as dev-dependencies

WORKDIR /myapp
COPY package.json yarn.lock ./
RUN yarn install --production=false

# Stage for installing production dependencies
FROM dev-dependencies as prod-dependencies
RUN yarn install --production=false

# Stage for building the application
FROM base as build

# Add prisma configuration and generate Prisma code
COPY --from=prod-dependencies /myapp/node_modules /myapp/node_modules
ADD prisma ./
RUN npx prisma generate

WORKDIR /myapp
COPY --from=dev-dependencies /myapp/node_modules /myapp/node_modules
COPY --from=prod-dependencies /myapp/node_modules /myapp/node_modules
COPY . .
RUN yarn build

# Final production image with minimal footprint
# @TODO: Use a smaller base image
FROM base

WORKDIR /myapp
# @TODO: Review which files are needed in the final image (e.g. prisma/schema.prisma)
COPY --from=prod-dependencies /myapp/node_modules /myapp/node_modules
COPY --from=build /myapp/node_modules/.prisma /myapp/node_modules/.prisma
COPY --from=build /myapp /myapp
# Review how to run the application in production (Because the application is built in the build stage, we can run the application directly in the final image) ref
CMD ["node", "dist/index.js"]
