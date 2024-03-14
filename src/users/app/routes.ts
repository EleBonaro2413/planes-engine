import { createRoute, z } from "@hono/zod-openapi";
import { ParamsSchema, UserSchema } from "./schemas";
import { create } from "ts-node";

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
          schema: UserSchema.omit({id: true, createdAt: true, updatedAt: true}),
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
export const updateUserRoute = createRoute({
  method: "patch",
  path: "/{id}",
  tags: ["users"],
  request: {
    params: ParamsSchema,
    body: {  
      content: {
        "application/json": {
          schema: UserSchema.pick({name: true, password: true}),
        },
      },
      required: true,
      description: "User info to update",
    },
  },
  responses:{
    200: {
      content: {
        "application/json": {
          schema: UserSchema,
        },
      },
      description: "Updated user information",
    },
    404: {
      description: "User not found",
    },
    500: {  
      description: "Internal server error",
    },
  }
})

export const deleteUserRoute =  createRoute({
  method: "delete",
  path: "/{id}",
  tags: ["users"],
  request: {
    params: ParamsSchema
  },
  responses:{
    200: {
      content: {
        "application/json": {
          schema: UserSchema,
        },
      },
      description: "Delete user information",
    },
    404: {
      description: "User not found",
    },
    500: {  
      description: "Internal sersver error",
    },
  }
})