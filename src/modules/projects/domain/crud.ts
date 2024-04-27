import { Project } from "~/types";
import { create, getMany } from "../repository/database";

export async function createProject({
    name,
    description,
    leaderId
}: Pick<Project, 'name' | 'description'> & { leaderId?: string }) {
    return await create({
        leaderId: leaderId,
        description: description,
        name: name,
    })

}

export async function findManyProject({ id }: { id?: string }) {
    const users =  await getMany({
        filters: {
            id
        }
    });
    return users
}