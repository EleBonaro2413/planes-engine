import { User } from "~/types";

const UsersInMemory = [
  {
    age: 20,
    id: "1",
    name: "Nombre",
    password: "123",
  },
] satisfies User[];

//@TODO: Rename to simple name `create` and `get` and so on, to keep it only as the data access layer
export const createUser = (user: User) => {
  UsersInMemory.push(user);
  return user;
};

export const getUser = (id: string) => {
  return UsersInMemory.find((u) => u.id === id);
};

export const getAllUsers = () => {
  return UsersInMemory;
};
