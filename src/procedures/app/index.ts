import { OpenAPIHono } from "@hono/zod-openapi";
import { getProcedureRoute, getNextStatesRoute } from "./routes";
import { findProcedure } from "../domain/crud";
import { calculateNextStates } from "../domain/workflow";
import { ErrorCode } from "~/shared/codeError";

const app = new OpenAPIHono();

app.openapi(
    getProcedureRoute,
    (context) => {
        const { id } = context.req.valid("param");
        const procedure = findProcedure(id);
        if (!procedure) {
            throw new ErrorCode(404, "Invalid workflow");
        }
        return context.json(procedure);
    }
);

app.openapi(
    getNextStatesRoute,
    (c) => {
        const { id } = c.req.valid("param");
        const procedure = findProcedure(id);
        if (!procedure.stateMachine) {
            throw new ErrorCode(500, "Invalid workflow");
        }
        const nextSteps = calculateNextStates(procedure);
        return c.json(nextSteps);
    }
)


export const proceduresApp = app;
