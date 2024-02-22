import { z } from "@hono/zod-openapi";

const ParamsSchema = z.object({
  id: z.string().openapi({
    param: {
      name: "id",
      in: "path",
    },
    example: "123",
  }),
});

//@TODO: Add more properties to match the User entity
const UserSchema = z
  .object({
    id: z.string().openapi({
      example: "123",
    }),
    email: z.string().openapi({
      example: "joDoe123@gmail.com",
    }),
    password: z.string().openapi({
      example: "password",
    }),
    name: z.string().openapi({
      example: "John Doe",
    }),
    age: z.number().openapi({
      example: 42,
    }),
    
  })
  .openapi("User");

export { ParamsSchema, UserSchema };
