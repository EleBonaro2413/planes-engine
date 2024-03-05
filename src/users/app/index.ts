import { OpenAPIHono } from "@hono/zod-openapi";
import { getUserRoute, createUserRoute, getAllUsersRoute } from "./routes";
import {getById, getAll, create} from "../repository/database"
import { HTTPException } from "hono/http-exception";
import { createUser, findAllUsers, findUserById } from "../domain/crud";

const app = new OpenAPIHono();


app.openapi(
  getUserRoute,
  (c) => {
    const { id } = c.req.valid("param");
    const user = findUserById(id);
    console.log(user)
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
  const user = createUser(userData)
  return c.json(user, 201);
});

export const userApp = app;
