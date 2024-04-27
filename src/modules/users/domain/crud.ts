import { ErrorCode } from "~/modules/shared/codeError";
import { User } from "~/types";
import { create, getById as getUserById, getAll as getAllUsers, update, softDelete } from "../repository/database";

export async function createUser(data: Pick<User, "email" | "name">) {
    const created = await create(data).catch((reason: Error) => {
        throw new ErrorCode(500, "Error at create user")
    })
    return created
}
export function findUserById(id: string) {
    return getUserById(id);
}

export function findAllUsers({ filters }: { filters: { name?: string } }) {
    return getAllUsers({ filters })
}

export function updateUser(id: string, data: Pick<User, "name">) {
    return update(id, data)
}

export function deleteUser(id: string) {
    return softDelete(id);
}