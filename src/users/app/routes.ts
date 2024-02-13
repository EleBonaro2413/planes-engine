import { createRoute, z } from "@hono/zod-openapi";
import { ParamsSchema, UserSchema } from "./schemas";

export const getUserRoute = createRoute({
  method: "get",
  path: "/{id}",
  tags: ["users"],
  request: {
    params: ParamsSchema,
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: UserSchema,
        },
      },
      description: "Retrieve the user",
    },
    404: {
      description: "User not found",
    },
    500: {
      description: "Internal server error",
    },
  },
});

export const getAllUsersRoute = createRoute({
  method: "get",
  path: "/",
  tags: ["users"],
  responses: {
    200: {
      content: {
        "application/json": {
          schema: UserSchema.array(),
        },
      },
      description: "Retrieve all users",
    },
  },
});

export const createUserRoute = createRoute({
  method: "post",
  path: "/",
  tags: ["users"],
  request: {
    body: {
      content: {
        "application/json": {
          schema: UserSchema,
        },
      },
      required: true,
      description: "User to create",
    },
  },
  responses: {
    201: {
      content: {
        "application/json": {
          schema: UserSchema,
        },
      },
      description: "Create a new user",
    },
  },
});

//@TODO: Add new routes to handle the CRUD operations