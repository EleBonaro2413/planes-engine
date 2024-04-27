import { Prisma } from "@prisma/client";
import getPrismaClient from "~/database/client";
import { Project } from "~/types"

export function create({ description, leaderId, name }: Pick<Project, 'name' | 'description'> & { leaderId?: string }) {
    const prisma = getPrismaClient();
    return prisma.project.create({
        data: {
            name,
            description,
            places: {},
            requirements: {},
            transitions: {},
            leader: {
                connect: {
                    id: leaderId
                }
            }
        }
    })
}

export function get({ where }: Prisma.ProjectFindUniqueArgs) {
    const prisma = getPrismaClient();
    return prisma.project.findUnique({
        where
    })
}

export function getMany({ filters }: {
    filters: {
        id?: string
    }
}) {
    const prisma = getPrismaClient();
    return prisma.project.findMany({
        include: {
            leader: true,
        }
    })
}