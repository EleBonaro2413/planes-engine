FROM node:20.12.2 as base

ENV NODE_ENV production

RUN apt-get update && apt-get install -y git
RUN apt-get install -y openssl

WORKDIR /myapp

FROM base as planes-engine-deps
RUN git clone https://github.com/EleBonaro2413/planes-engine.git
ADD planes-engine/package.json ./planes-engine/
ADD planes-engine/.env ./planes-engine/
WORKDIR /myapp/planes-engine
RUN  npm install --include=dev


FROM base as planes-gateway-deps
RUN git clone https://github.com/EleBonaro2413/planes-gateway.git
ADD planes-gateway/package.json ./planes-gateway/
ADD planes-gateway/.env ./planes-gateway/
WORKDIR /myapp/planes-gateway
RUN  npm install --include=dev

FROM base as planes-dashboard-deps
RUN git clone https://github.com/EleBonaro2413/planes-dashboard.git
ADD planes-dashboard/package.json ./planes-dashboard/
WORKDIR /myapp/planes-dashboard
RUN npm install --include=dev

FROM base as merge-deps
WORKDIR /myapp
COPY --from=planes-engine-deps /myapp/planes-engine/node_modules /myapp/planes-engine/node_modules
COPY --from=planes-gateway-deps /myapp/planes-gateway/node_modules /myapp/planes-gateway/node_modules
COPY --from=planes-dashboard-deps /myapp/planes-dashboard/node_modules /myapp/planes-dashboard/node_modules
ADD package.json ./
RUN npm prune --omit=dev

# Build the app
FROM base as build
WORKDIR /myapp

# Add prisma configuration and generate Prisma code
COPY --from=merge-deps /myapp/node_modules /myapp/node_modules
ADD prisma ./
RUN npx prisma generate

ADD . .
RUN npm run build

# Create the production image with minimal footprint
FROM base

WORKDIR /myapp

COPY --from=merge-deps /myapp/node_modules /myapp/node_modules
COPY --from=build /myapp/node_modules/.prisma /myapp/node_modules/.prisma
COPY --from=build /myapp/build /myapp/build
COPY --from=build /myapp/public /myapp/public
ADD . .

CMD ["npm", "start"]

