import { PrismaClient, Prisma } from "@prisma/client"
import { Project } from "~/types"

export const prisma = new PrismaClient()

export function create({ description, leaderId, name }: Pick<Project, 'name' | 'description'> & { leaderId?: string }) {
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
    return prisma.project.findUnique({
        where
    })
}

export function getMany({ filters }: {
    filters: {
        id?: string
    }
}) {
    return prisma.project.findMany({
        include: {
            leader: true,
        }
    })
}