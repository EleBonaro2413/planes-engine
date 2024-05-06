import { OpenAPIHono } from "@hono/zod-openapi";
import { getLevelCategoriesRoute, getLevelCategoryRoute } from "./routes";

const app = new OpenAPIHono();

app.openapi(
    getLevelCategoriesRoute,
    (c) => {
        const { view = "list" } = c.req.valid("query");
        return c.json([]);
    }
);

app.openapi(
    getLevelCategoryRoute,
    (c) => {
        const { id } = c.req.valid("param");
        return c.json({});
    }
);
