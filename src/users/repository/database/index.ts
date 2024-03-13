import { date, z } from "zod";
import { User } from "~/types";
import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();
let user: Prisma.UserCreateInput;

export async function create(data: User) {
  await prisma.user.create({ data });
}

export const getById = async (id: string) => {
    return await prisma.user.findUnique ({
      where: {
        id: id
      }
    })
};

export const getAll = async () => {
  const users = await prisma.user.findMany();
  return users
};


export const update = (id: string, data: Pick<User, "name" | "password">) => { 
      const updateUser = prisma.user.update({
        where: {
          id: id,
        },
        data: data
      })
    return updateUser
}
