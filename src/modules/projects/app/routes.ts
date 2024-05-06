import { createRoute, z } from "@hono/zod-openapi";
import { ProjectSchema } from "~/schemas";

export const getProjectRoute = createRoute({
    method: "get",
    path: "/{id}",
    tags: ["projects"],
    request: {
        params: ProjectSchema.pick({ id: true }),
    },
    responses: {
        200: {
            content: {
                "application/json": {
                    schema: ProjectSchema
                },
            },
            description: "Retrieve the project",
        },
        404: {
            description: "Project not found",
        },
        500: {
            description: "Internal server error",
        },
    },
});

export const createProjectRoute = createRoute({
    method: "post",
    path: "/",
    tags: ["projects"],
    request: {
        body: {
            content: {
                "application/json": {
                    schema: ProjectSchema.omit({
                        id: true,
                        createdAt: true,
                        updatedAt: true,
                        tasks: true,
                        
                    })
                },
            },
            required: true,
            description: "The project to create",
        }
    },
    responses: {
        201: {
            content: {
                "application/json": {
                    schema: ProjectSchema,
                },
            },
            description: "Create a new project",
        },
        400: {
            description: "Invalid request",
        },
        500: {
            description: "Internal server error",
        },
    },
});

export const updateProjectRoute = createRoute({
    method: "put",
    path: "/{id}",
    tags: ["projects"],
    request: {
        params: ProjectSchema.pick({ id: true }),
        body: {
            content: {
                "application/json": {
                    schema: ProjectSchema.omit({ id: true }),
                },
            },
            required: true,
            description: "The project to update",
        }
    },
    responses: {
        200: {
            content: {
                "application/json": {
                    schema: ProjectSchema,
                },
            },
            description: "Update the project",
        },
        400: {
            description: "Invalid request",
        },
        404: {
            description: "Project not found",
        },
        500: {
            description: "Internal server error",
        },
    },
});

export const deleteProjectRoute = createRoute({
    method: "delete",
    path: "/{id}",
    tags: ["projects"],
    request: {
        params: ProjectSchema.pick({ id: true }),
    },
    responses: {
        204: {
            content: {
                "application/json": {
                    schema: ProjectSchema,
                },
            },
            description: "Project deleted",
        },
        404: {
            description: "Project not found",
        },
        500: {
            description: "Internal server error",
        },
    },
});

export const findProjectsRoute = createRoute({
    method: "get",
    path: "/",
    tags: ["projects"],
    request: {
        query: ProjectSchema.pick({ id: true, name: true }).partial(),
    },
    responses: {
        200: {
            content: {
                "application/json": {
                    schema: z.array(ProjectSchema)
                },
            },
            description: "Retrieve the projects",
        },
        500: {
            description: "Internal server error",
        },
    },
});
