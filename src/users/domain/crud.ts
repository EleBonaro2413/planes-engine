import { ErrorCode } from "~/shared/codeError";
import { User } from "~/types";
import { create, get, getAll } from "../repository/InMemory";

export async function createUser(user: User){
    const created = await create(user).catch((reason: Error) => {
        throw new ErrorCode(500, "Error at create user")
    })
        return created           
    }
export function getUserById(id: string): User {
        const user: User = getUserById(id);
        return user;
}   

export function getAllUsers(){
    const users: User[] = getAll();
    return users
}
