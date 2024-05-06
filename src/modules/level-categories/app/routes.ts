import { createRoute, z } from "@hono/zod-openapi";
import { LevelCategorySchema } from "~/schemas";

export const getLevelCategoryRoute = createRoute({
    method: "get",
    tags: ["Level Categories"],
    path: "/{id}",
    request: {
        params: z.object({
            id: z.string().uuid().openapi({ description: "Level category id" }),
        }).openapi({ description: "Level category id" }),
    },
    responses: {
        200: {
            content: {
                "application/json": {
                    schema: LevelCategorySchema,
                },
            },
            description: "Retrieve the level category",
        },
        404: {
            description: "Level category not found",
        },
        500: {
            description: "Internal server error",
        },
    },
});

export const getLevelCategoriesRoute = createRoute({
    method: "get",
    tags: ["Level Categories"],
    path: "/",
    request: {
        query: z.object({
            view: z.enum(["tree", "list"]).optional().openapi({ description: "View of the results" }),
        }).openapi({ description: "Level categories query" }),
    },
    responses: {
        200: {
            content: {
                "application/json": {
                    schema: z.array(LevelCategorySchema),
                },
            },
            description: "Retrieve the level categories",
        },
        500: {
            description: "Internal server error",
        },
    },
});

export const createLevelCategoryRoute = createRoute({
    method: "post",
    tags: ["Level Categories"],
    path: "/",
    request: {
        body: {
            content: {
                "application/json": {
                    schema: LevelCategorySchema.omit({
                        id: true,
                        createdAt: true,
                        updatedAt: true
                    }),
                }
            },
            required: true,
            description: "Level category to create"
        }
    },
    responses: {
        200: {
            content: {
                "application/json": {
                    schema: LevelCategorySchema,
                },
            },
            description: "Retrieve the level category",
        },
        404: {
            description: "Level category not found",
        },
        500: {
            description: "Internal server error",
        },
    },
});