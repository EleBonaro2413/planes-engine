import { create, deleteOne, get, getMany, update } from "../repository/database";
import { composeManyWhere, composeUniqueWhere } from "../repository/database/utils";

interface CreateLevelArgs {
    categoryId: string;
    name: string;
    description: string;
    advance: number;
    percentage: number;
}

export function createLevel({ categoryId, name, description, advance, percentage }: CreateLevelArgs) {
    return create({
        Category: {
            connect: {
                id: categoryId
            }
        },
        name: name,
        description: description,
        advance: advance,
        percentage: percentage
    })
}

interface GetLevelArgs {
    id?: string;
    name?: {
        value: string;
    }
}

export function getLevel({ id, name }: GetLevelArgs) {
    return get({
        where: composeUniqueWhere({ id, name })
    })
}

interface GetManyLevelsArgs {
    id?: string;
    categoryId?: string;
    previousLevelId?: string;
    name?: {
        value: string;
    }
}

export function getManyLevels({ categoryId, id, name, previousLevelId }: GetManyLevelsArgs) {
    return getMany({
        where: composeManyWhere({ id, name, categoryId, previousLevelId })
    });
}

interface UpdateLevelArgs {
    where: {
        id: string;
    };
    data: {
        name?: string;
        description?: string;
        advance?: number;
        percentage?: number;
    }
}

export function updateLevel({ where, data }: UpdateLevelArgs) {
    return update({
        where,
        data
    });
}

export function deleteLevel({ id, name }: GetLevelArgs) {
    return deleteOne({
        where: composeUniqueWhere({ id, name })
    })
}