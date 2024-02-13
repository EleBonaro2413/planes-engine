import { serve } from '@hono/node-server'

import { OpenAPIHono } from "@hono/zod-openapi";
import { swaggerUI } from "@hono/swagger-ui";
import { userApp } from "./users/app";
import { logger } from "hono/logger";
import { proceduresApp } from "./procedures/app";
import { ErrorCode } from "./shared/codeError";
import { HTTPException } from "hono/http-exception";

const app = new OpenAPIHono();

app.route("/users", userApp);
app.route("/procedures", proceduresApp);

app.get("/ui", swaggerUI({ url: "/doc" }));

app.doc("/doc", {
  openapi: "3.0.0",
  tags: [
    {
      name: "users",
      description: "Operations about users",
    }, {
      name: "procedures",
      description: "Operations about procedures",
    }
  ],
  info: {
    version: "1.0.0",
    title: "Planes",
    description: "A simple API to manage planes",
  },
});

app.onError((err, c) => {
  if (err instanceof ErrorCode) {
    return new HTTPException(err.code, {
      message: err.message,
    }).getResponse();
  }

  return new HTTPException(500).getResponse();
});

console.log(`🔥 Server running on http://localhost:3004 
🧾 openapi: http://localhost:3004/doc
📖 Documentation on http://localhost:3004/ui`);

app.use("*", logger());

serve({
  fetch: app.fetch,
  port: 3004,
});