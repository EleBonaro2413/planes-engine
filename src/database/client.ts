import { PrismaClient } from "@prisma/client";

let prisma: PrismaClient;

export default function getPrismaClient(): PrismaClient {
    if (!prisma) {
        prisma = new PrismaClient()
    }
    return prisma;
}