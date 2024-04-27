import { Prisma } from "@prisma/client";
import getPrismaClient from "~/database/client";

export function create({ ...data }: Prisma.LevelCreateInput) {
    const prisma = getPrismaClient();
    return prisma.level.create({
        data
    });
}

export function get({ where }: Prisma.LevelFindUniqueArgs) {
    const prisma = getPrismaClient();
    return prisma.level.findUnique({
        where: {
            ...where,
            deleteAt: null
        }
    });
}

export function getMany({ where }: {
    where?: Prisma.LevelFindManyArgs['where']
}) {
    const prisma = getPrismaClient();
    return prisma.level.findMany({
        where: {
            ...where,
            deleteAt: null
        }
    });
}

export function update({ where, data }: Prisma.LevelUpdateArgs) {
    const prisma = getPrismaClient();
    return prisma.level.update({
        where: {
            ...where,
            deleteAt: null
        },
        data
    });
}

export function deleteOne({ where }: Prisma.LevelDeleteArgs) {
    const prisma = getPrismaClient();
    return prisma.level.update({
        where,
        data: {
            deleteAt: new Date()
        }
    });
}

export function deleteMany({ where }: Prisma.LevelDeleteManyArgs) {
    const prisma = getPrismaClient();
    return prisma.level.updateMany({
        where,
        data: {
            deleteAt: new Date()
        }
    });
}
