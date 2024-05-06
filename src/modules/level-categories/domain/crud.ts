import { create, get, update, getMany, deleteOne } from "../repository/database";
import { composeWhere } from "../repository/database/utils";

interface CreateLevelArgs {
    name: string;
    description: string;
}

export function createLevel({ name, description }: CreateLevelArgs) {
    return create({
        name: name,
        description: description,
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
        where: composeWhere({ id, name })
    })
}

interface GetManyLevelsArgs {
    id?: string;
    name?: {
        value: string;
    }
}

export function getManyLevels({ id, name }: GetManyLevelsArgs) {
    return getMany({
        where: composeWhere({ id, name })
    });
}

interface UpdateLevelArgs {
    where: {
        id: string;
    };
    data: {
        name?: string;
        description?: string;
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
        where: composeWhere({ id, name })
    })
}
