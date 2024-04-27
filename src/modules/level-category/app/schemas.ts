import { z } from "@hono/zod-openapi";

export const LevelCategorySchema = z.object({
    id: z
        .string()
        .uuid()
        .openapi({
            param: {
                name: "id",
                in: "path",
            },
            example: "123",
        }),
    name: z.string().min(1).openapi({
        example: "Level Category Name",
        required: ['true'],
    }),
    description: z.string().openapi({
        example: "Level Category Description",
    }),
    createdAt: z.string().openapi({
        example: "2021-01-01T00:00:00Z",
    }),
    updatedAt: z.string().openapi({
        example: "2021-01-01T00:00:00Z",
    }),
});