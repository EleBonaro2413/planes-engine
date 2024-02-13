import { z } from "@hono/zod-openapi";

export const ProcedureSchema = z.object({
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
    example: "Procedure Name",
    required: ['true'],
  }),
  description: z.string().openapi({
    example: "Procedure Description",
  }),
  machineName: z.string().openapi({
    example: "Procedure Machine Name",
  }),
  stateMachine: z.any().openapi({
    example: "Procedure State Machine",
  }),
});

export const ParamsSchema = z.object({
  id: z
    .string()
    .openapi({
      param: {
        name: "id",
        in: "path",
      },
      example: "123",
    }),
});
