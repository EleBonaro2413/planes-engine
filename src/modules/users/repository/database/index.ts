import { User } from "~/types";
import { Prisma } from "@prisma/client";
import getPrismaClient from "~/database/client";


export async function create(data: Prisma.UserCreateArgs['data']) {
  const prisma = getPrismaClient();
  return await prisma.user.create({ data });
}

export const getById = async (id: string) => {
  const prisma = getPrismaClient();
  return await prisma.user.findUnique({
    where: {
      id: id
    },
    include: {
      leaderOf: true,
      collaboratorOf: true,
    }
  })
};

export const getAll = async ({
  filters,
}: {
  filters: {
    name?: string;
  };
}) => {
  const prisma = getPrismaClient();
  const users = await prisma.user.findMany({
    where: {
      deleteAt: null,
      name: filters.name ? {
        mode: "insensitive",
        contains: filters.name,
      } : undefined,
    },
    include: {
      leaderOf: true,
      collaboratorOf: true,
    }
  });
  return users
};


export const update = async (id: string, data: Pick<User, "name">) => {
  const prisma = getPrismaClient();
  const updateUser = await prisma.user.update({
    where: {
      id: id,
    },
    data: data
  })
  return updateUser
}

export const softDelete = async (id: string) => {
  const prisma = getPrismaClient();
  const dltUser = await prisma.user.update({
    where: { id },
    data: { deleteAt: new Date() }
  })
  return dltUser
} 