import { z } from "@hono/zod-openapi"
import { UserSchema } from "~/users/app/schemas"

const ProjectSchema = z.object({
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
    leader: UserSchema.omit({ password: true }).openapi({
        description: "The user that is the leader of the project",
        example: {
            id: "a1b2c3d4e5f6g7h8i9j0",
            email: "mail@server.com",
            createdAt: new Date(),
            updatedAt: new Date(),
            name: "John Doe",
        }
    }),
    collaborators: z.array(UserSchema.omit({ password: true })).openapi({
        description: "The users that are collaborators on the project",
        example: [{
            id: "a1b2c3d4e5f6g7h8i9j0",
            email: "mail@server.com",
            createdAt: new Date(),
            updatedAt: new Date(),
            name: "John Doe",
        }]
    }),
    tasks: z.array(z.string()).openapi({
        description: "The unique identifiers for the tasks that are part of the project",
    }),
}).openapi("Project")

export { ProjectSchema }