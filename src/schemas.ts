import { z } from "@hono/zod-openapi";

export const ParamsSchema = z.object({
    id: z.string().openapi({
        param: {
            name: "id",
            in: "path",
        },
        example: "clt4uksj232jb",
    }),
});

export const UserSchema = z
    .object({
        id: z.string().openapi({
            example: "123",
        }),
        email: z.string().email().openapi({
            example: "joDoe123@gmail.com",
        }),
        name: z.string().openapi({
            example: "John Doe",
        }),
        createdAt: z.string().openapi({
            example: "2023-09-07T07:19:51.128Z"
        }),
        updatedAt: z.string().openapi({
            example: "2023-09-07T07:19:51.128Z"
        }),
        deleteAt: z.string().nullable().openapi({
            examples: ["2023-09-07T07:19:51.128Z", null]
        })
    })
    .openapi("User");

export const ProjectSchema = z.object({
    id: z.string().openapi({
        description: "The unique identifier for the project",
        example: "a1b2c3d4e5f6g7h8i9j0",
    }),
    name: z.string().openapi({
        description: "The name of the project",
        example: "My Project",
    }),
    description: z.string().openapi({
        description: "The description of the project",
        example: "This is my project",
    }),
    createdAt: z.coerce.date().openapi({
        description: "The date and time the project was created",
        example: "2023-09-07T07:19:51.128Z"
    }),
    updatedAt: z.coerce.date().openapi({
        description: "The date and time the project was last updated",
        example: "2023-09-07T07:19:51.128Z"
    }),
    leader: UserSchema.openapi({
        description: "The user that is the leader of the project",
        example: {
            id: "a1b2c3d4e5f6g7h8i9j0",
            email: "mail@server.com",
            createdAt: '2023-09-07T07:19:51.128Z',
            updatedAt: '2023-09-07T07:19:51.128Z',
            name: "John Doe",
            deleteAt: null
        }
    }),
    collaborators: z.array(UserSchema).openapi({
        description: "The users that are collaborators on the project",
        example: [{
            id: "a1b2c3d4e5f6g7h8i9j0",
            email: "mail@server.com",
            createdAt: '2023-09-07T07:19:51.128Z',
            updatedAt: '2023-09-07T07:19:51.128Z',
            name: "John Doe",
            deleteAt: null
        }]
    }),
    tasks: z.array(z.string()).openapi({
        description: "The unique identifiers for the tasks that are part of the project",
    }),
}).openapi("Project")

export const ProcedureSchema = z.object({
    id: z
        .string()
        .uuid()
        .openapi({
            param: {
                name: "id",
                in: "path",
            },
            example: "123",
        }),
    name: z.string().min(1).openapi({
        example: "Procedure Name",
        required: ['true'],
    }),
    description: z.string().openapi({
        example: "Procedure Description",
    }),
    machineName: z.string().openapi({
        example: "Procedure Machine Name",
    }),
    stateMachine: z.any().openapi({
        example: "Procedure State Machine",
    }),
}).openapi("Procedure");

export const LevelSchema = z.object({
    id: z
        .string()
        .uuid()
        .openapi({
            example: "123",
        }),
    name: z.string().min(1).openapi({
        example: "Level Name",
        required: ['true'],
    }),
    description: z.string().openapi({
        example: "Level Description",
    }),
    machineName: z.string().openapi({
        example: "Level Machine Name",
    }),
    stateMachine: z.any().openapi({
        example: "Level State Machine",
    }),
}).openapi("Level");

export const LevelCategorySchema = z.object({
    id: z
        .string()
        .uuid()
        .openapi({
            param: {
                name: "id",
                in: "path",
            },
            example: "123",
        }),
    name: z.string().min(1).openapi({
        example: "Level Category Name",
        required: ['true'],
    }),
    description: z.string().openapi({
        example: "Level Category Description",
    }),
    createdAt: z.string().openapi({
        example: "2021-01-01T00:00:00Z",
    }),
    updatedAt: z.string().openapi({
        example: "2021-01-01T00:00:00Z",
    }),
}).openapi("LevelCategory");