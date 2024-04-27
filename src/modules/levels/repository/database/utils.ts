import { Prisma } from "@prisma/client";

interface UniqueWhere {
    id?: string;
    name?: {
        value: string;
    }
}

export const composeUniqueWhere = ({ id, name }: UniqueWhere) => {
    const where: Prisma.LevelWhereUniqueInput = {
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

interface ManyWhere {
    id?: string;
    name?: {
        value: string;
    }
    categoryId?: string;
    previousLevelId?: string;
}

export const composeManyWhere = ({ id, name, categoryId, previousLevelId }: ManyWhere) => {
    const where: Prisma.LevelWhereInput = {
        id: undefined,
        levelCategoryId: undefined,
        PreviousLevelId: undefined,
        name: undefined
    }
    if (id) {
        where['id'] = id;
    }
    if (name) {
        where['name'] = name.value;
    }
    if (categoryId) {
        where['levelCategoryId'] = categoryId;
    }
    if (previousLevelId) {
        where['PreviousLevelId'] = previousLevelId;
    }

    return where;
}