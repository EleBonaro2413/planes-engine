import { z } from "@hono/zod-openapi";

const ParamsSchema = z.object({
  id: z.string().openapi({
    param: {
      name: "id",
      in: "path",
    },
    example: "clt4uksj232jb",
  }),
});

const UserSchema = z
  .object({
    id: z.string().openapi({
      example: "123",
    }),
    email: z.string().email().openapi({
      example: "joDoe123@gmail.com",
    }),
    password: z.string().openapi({
      example: "password",
    }),
    name: z.string().openapi({
      example: "John Doe",
    }),
    createdAt: z.date().openapi({
      example: "2023-09-07T07:19:51.128Z"
    }),
    updatedAt: z.date().openapi({
      example: "2023-09-07T07:19:51.128Z"
    }),
    deleteAt: z.date().nullable().openapi({
      example: "2023-09-07T07:19:51.128Z"
    })
  })
  .openapi("User");

export { ParamsSchema, UserSchema };
