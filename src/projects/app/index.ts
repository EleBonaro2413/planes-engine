import { OpenAPIHono } from "@hono/zod-openapi";
import { getProjectRoute, createProjectRoute, deleteProjectRoute, findProjectsRoute, updateProjectRoute } from "./routes";
import { createProject, findManyProject } from "../domain/crud";

const app = new OpenAPIHono();

app.openapi(
    getProjectRoute,
    async (c) => {
        const { id } = c.req.valid("param")
        return c.json({ id: id, name: "My Project" })
    }
)

app.openapi(
    createProjectRoute,
    async (c) => {
        const project = c.req.valid("json")
        const { name, description, leaderId, collaboratorsIds } = project
        const newProject = await createProject({ name, description, leaderId })
        return c.json(newProject, 201)
    }
)

app.openapi(
    deleteProjectRoute,
    async (c) => {
        const { id } = c.req.valid("param")
        return c.json({ id }, 204)
    }
)

app.openapi(
    findProjectsRoute,
    async (c) => {
        const { id, name } = c.req.valid("query")
        const projects = await findManyProject({ id })
        return c.json(projects)
    }
)

app.openapi(
    updateProjectRoute,
    async (c) => {
        const { id } = c.req.valid("param")
        const project = c.req.valid("json")
        return c.json({ id, ...project })
    }
)

export const projectsApp = app;
