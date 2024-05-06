import { Prisma } from "@prisma/client";
import getPrismaClient from "~/database/client";

export function create(data: Prisma.LevelCategoryCreateInput) {
    const prisma = getPrismaClient();
    return prisma.levelCategory.create({
        data
    });
}

export function get({ where }: Prisma.LevelCategoryFindUniqueArgs) {
    const prisma = getPrismaClient();
    return prisma.levelCategory.findUnique({
        where
    });
}

export function getMany({ where }: {
    where?: Prisma.LevelCategoryFindManyArgs['where']
}) {
    const prisma = getPrismaClient();
    return prisma.levelCategory.findMany({
        where,
    });
}

export function update({ where, data }: Prisma.LevelCategoryUpdateArgs) {
    const prisma = getPrismaClient();
    return prisma.levelCategory.update({
        where,
        data
    });
}

export function deleteOne({ where }: Prisma.LevelCategoryDeleteArgs) {
    const prisma = getPrismaClient();
    return prisma.levelCategory.delete({
        where
    });
}

export function deleteMany({ where }: Prisma.LevelCategoryDeleteManyArgs) {
    const prisma = getPrismaClient();
    return prisma.levelCategory.deleteMany({
        where
    });
}
