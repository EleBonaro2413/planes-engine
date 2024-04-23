import { OpenAPIHono } from "@hono/zod-openapi";
import {
  getUserRoute,
  createUserRoute,
  getAllUsersRoute,
  updateUserRoute,
  deleteUserRoute,
} from "./routes";
import { HTTPException } from "hono/http-exception";
import {
  createUser,
  deleteUser,
  findAllUsers,
  findUserById,
  updateUser,
} from "../domain/crud";

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
  const { name, email } = c.req.valid("query");
  return c.json(await findAllUsers({ filters: { name } }));
});

app.openapi(createUserRoute, async (c) => {
  const userData = c.req.valid("json");
  const user = await createUser(userData);
  return c.json(user, 201);
});

app.openapi(updateUserRoute, async (c) => {
  const { id } = c.req.valid("param");
  const userJson = await c.req.valid("json");
  const userinfo = await updateUser(id, userJson);
  return c.json(userinfo, 200);
});

app.openapi(deleteUserRoute, async (c) => {
  const { id } = c.req.valid("param")
  const user = await deleteUser(id)
  return c.json(user)
})
export const userApp = app;

