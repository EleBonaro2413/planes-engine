import { Hono } from "hono";
import { createYoga } from "graphql-yoga";
import { schema } from "./schema";
import getPrismaClient from "~/database/client";

type Bindings = {
    NODE_ENV: string;
    LOGGING: string;
};

const graphqlApp = new Hono<{ Bindings: Bindings }>();

const yoga = createYoga({
    schema,
    context() {
        try {
            const prisma = getPrismaClient();
            return { prisma };
        }
        catch (e: any) {
            return e;
        }
    }
});


graphqlApp.on(["POST", "GET", "OPTIONS"], "/graphql/*", async (c) => {
    let req = c.req.raw;
    let accept = c.req.header('accept');
    // use /graphql/stream for subscription
    if (accept && !accept.includes('application/json') && accept.includes('text/event-stream')) {
        if (c.req.path === '/graphql' || c.req.path === '/graphql/') {
            req = new Request(req.url.replace('/graphql', '/graphql/stream'), req);
        }
    }

    return yoga.fetch(req, c.env);
});

export default graphqlApp;