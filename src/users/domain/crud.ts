import { ErrorCode } from "~/shared/codeError";
import { User } from "~/types";
import { create,getById as getUserById, getAll as getAllUsers, update, delUser, softDelete} from "../repository/database";

export async function createUser(data: Pick<User, "email"| "name" | "password">){
    const created = await create(data).catch((reason: Error) => {
        throw new ErrorCode(500, "Error at create user")
    })
        return created           
    }
export function findUserById(id: string) {
        return getUserById(id);
}   

export function findAllUsers(){
    return getAllUsers()
}

export function updateUser(id: string, data: Pick<User, "name"| "password">){
        return update(id,data)
}

export function deleteUser(id: string){
    return softDelete(id);
}