import { Prisma } from "@prisma/client";

interface UniqueWhere {
    id?: string;
    name?: {
        value: string;
    }
}

export const composeWhere = ({ id, name }: UniqueWhere) => {
    const where: Prisma.LevelCategoryWhereUniqueInput = {
        id: undefined,
        name: undefined
    }
    if (id) {
        where['id'] = id;
    }
    if (name) {
        where['name'] = name.value;
    }
    return where;
}