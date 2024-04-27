import { createRoute, z } from "@hono/zod-openapi";
import { ProcedureSchema, ParamsSchema } from "~/schemas";

export const createProcedureRoute = createRoute({
    method: "post",
    tags: ["Procedures"],
    path: "/",
    request: {
        body: {
            content: {
                "application/json": {
                    schema: ProcedureSchema
                }
            },
            required: true,
            description: "Procedure to create"
        }
    },
    responses: {
        200: {
            content: {
                "application/json": {
                    schema: ProcedureSchema,
                },
            },
            description: "Retrieve the procedure",
        },
        404: {
            description: "Procedure not found",
        },
        500: {
            description: "Internal server error",
        },
    },
});

export const getProcedureRoute = createRoute({
    method: "get",
    tags: ["Procedures"],
    path: "/{id}",
    request: {
        params: ParamsSchema,
    },
    responses: {
        200: {
            content: {
                "application/json": {
                    schema: ProcedureSchema,
                },
            },
            description: "Retrieve the procedure",
        },
        404: {
            description: "Procedure not found",
        },
        500: {
            description: "Internal server error",
        },
    },
});

export const getNextStatesRoute = createRoute({
    method: "get",
    tags: ["Procedures"],
    path: "/{id}/next-states",
    request: {
        params: ParamsSchema,
    },
    responses: {
        200: {
            content: {
                "application/json": {
                    schema: z.array(z.string()),
                },
            },
            description: "Retrieve the next states",
        },
        404: {
            description: "Procedure not found",
        },
        500: {
            description: "Internal server error",
        },
    },
});