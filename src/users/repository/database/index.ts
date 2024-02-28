import { date, z } from "zod";
import { User } from "~/types";
import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();
let user: Prisma.UserCreateInput;

export async function create(data: User) {
  console.log(data)
  await prisma.user.create({ data });
}

export  const getById = async (id: string) => {
    const user = await prisma.user.findUnique({
      where: {
        id: id
      }
    })
    console.log(user)
    return user
};

export const getAll = async () => {
  const users = await prisma.user.findMany();
  return users
};
