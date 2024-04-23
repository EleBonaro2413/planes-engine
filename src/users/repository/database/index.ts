import { User } from "~/types";
import { PrismaClient, Prisma } from "@prisma/client";
import { createSoftDeleteExtension } from "prisma-extension-soft-delete";

const prisma = new PrismaClient();

// const extendedClient = prisma.$extends(
//   createSoftDeleteExtension({
//     models: {
//       User: {
//         field: "deletedAt",
//         createValue: (deleted) => {
//           if (deleted) return new Date();
//           return null;
//         },
//       },
//     },
//   })
// );

export async function create(data: Prisma.UserCreateArgs['data']) {
  return await prisma.user.create({ data });
}

export const getById = async (id: string) => {
  return await prisma.user.findUnique({
    where: {
      id: id
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
  const users = await prisma.user.findMany({
    where: {
      deleteAt: null,
      name: filters.name ? {
        mode: "insensitive",
        contains: filters.name,
      } : undefined,
    },
  });
  return users
};


export const update = async (id: string, data: Pick<User, "name" | "password">) => {
  const updateUser = await prisma.user.update({
    where: {
      id: id,
    },
    data: data
  })
  return updateUser
}

export const softDelete = async (id: string) => {
  const dltUser = await prisma.user.update({
    where: { id },
    data: { deleteAt: new Date() }
  })
  return dltUser
} 