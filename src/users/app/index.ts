import { OpenAPIHono, z } from "@hono/zod-openapi";
import {
  getUserRoute,
  createUserRoute,
  getAllUsersRoute,
  updateUserRoute,
  deleteUserRoute,
} from "./routes";
import { getById, getAll, create, update } from "../repository/database";
import { HTTPException } from "hono/http-exception";
import {
  createUser,
  deleteUser,
  findAllUsers,
  findUserById,
  updateUser,
} from "../domain/crud";
import { swaggerUI } from "@hono/swagger-ui";
import { zValidator } from "@hono/zod-validator";
import { UserSchema } from "./schemas";
import { Prisma } from "@prisma/client";
const app = new OpenAPIHono();

app.openapi(
  getUserRoute,
  async (c) => {
    const { id } = c.req.valid("param");
    const user = await findUserById(id);
    if (!user) {
      throw new HTTPException(404, { message: "User not found" });
    }
    return c.json(user);
  },
  (result, c) => {
    if (!result.success) {
      return c.json({ message: "User not found" });
    }
  }
);

app.openapi(getAllUsersRoute, async (c) => {
  return c.json(await findAllUsers());
});

app.openapi(createUserRoute, (c) => {
  const userData = c.req.valid("json");
  const user = createUser(userData);
  return c.json(user, 201);
});

app.openapi(updateUserRoute, async (c) => {
  const { id } = c.req.valid("param");
  const userJson = await c.req.valid("json");
  const userinfo = await updateUser(id, userJson);
  return c.json(userinfo, 200);
});

app.openapi(deleteUserRoute, async (c)=> {
    const {id} = c.req.valid("param")
    const user = await deleteUser(id)
    return c.json(user)
})
export const userApp = app;

