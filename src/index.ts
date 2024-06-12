import { serve } from '@hono/node-server'

import { Hono } from "hono";
import { logger } from "hono/logger";
import { HTTPException } from "hono/http-exception";
import { env } from 'hono/adapter';
import graphqlApp from './graphql/app';
const app = new Hono();

// app.use("*", async (c, next) => {
//   const { OPERATION_SECRET } = env<{ OPERATION_SECRET: string }>(c);
//   const auth = c.req.raw.headers.get("Authorization");
//   if (!auth || auth !== OPERATION_SECRET) {
//     return new HTTPException(401).getResponse();
//   }

//   await next();
// });

app.use("*", logger((strig, ...args) => console.log(strig, ...args)));

app.route("/", graphqlApp);

console.log(`🔥 Server running on http://localhost:3004 
🧾 GraphQL: http://localhost:3004/graphql
`);

serve({
  fetch: app.fetch,
  port: 3004,
});