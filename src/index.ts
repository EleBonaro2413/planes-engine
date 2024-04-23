import { serve } from '@hono/node-server'

import { OpenAPIHono } from "@hono/zod-openapi";
import { swaggerUI } from "@hono/swagger-ui";
import { userApp } from "./users/app";
import { logger } from "hono/logger";
import { projectsApp } from "./projects/app";
import { HTTPException } from "hono/http-exception";
import { Prisma } from "@prisma/client";
import { env } from 'hono/adapter';
const app = new OpenAPIHono();

app.use("*", async (c, next) => {
  const { OPERATION_SECRET } = env<{ OPERATION_SECRET: string }>(c);
  const auth = c.req.raw.headers.get("Authorization");
  if (!auth || auth !== OPERATION_SECRET) {
    return new HTTPException(401).getResponse();
  }

  await next();
});
app.use("*", logger((strig, ...args) => console.log(strig, ...args)));

app.route("/users", userApp);
app.route("/projects", projectsApp);

app.get("/ui", swaggerUI({ url: "/doc" }));

app.doc("/doc", {
  openapi: "3.0.0",
  info: {
    version: "1.0.0",
    title: "Planes",
    description: "A simple API to manage planes",
  },
});

app.onError((err) => {
  if (err instanceof HTTPException) {
    return err.getResponse()
  }
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === "P2025") {
      return new HTTPException(404).getResponse();
    }
  }
  return new HTTPException(500).getResponse();

});

console.log(`🔥 Server running on http://localhost:3004 
🧾 openapi: http://localhost:3004/doc
📖 Documentation on http://localhost:3004/ui`);

serve({
  fetch: app.fetch,
  port: 3004,
});