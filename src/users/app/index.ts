import { OpenAPIHono } from "@hono/zod-openapi";
import { getUserRoute, createUserRoute, getAllUsersRoute } from "./routes";
import { get, getAll } from "../repository/InMemory";
import { HTTPException } from "hono/http-exception";

const app = new OpenAPIHono();

//@TODO: Add more controllers to handle the crud operations
app.openapi(
  getUserRoute,
  (c) => {
    const { id } = c.req.valid("param");
    const user = get(id);
    if (!user) {
      throw new HTTPException(404, { message: "User not found" });
    }
    return c.json(user);
  },
  (result, c) => {
    console.log(result);
    if (!result.success) {
      return c.json({ message: "User not found" });
    }
  }
);

app.openapi(getAllUsersRoute, (c) => {
  return c.json(getAll());
});

app.openapi(createUserRoute, (c) => {
  const userData = c.req.valid("json");
  return c.json(userData, 201);
});

export const userApp = app;
