   import { date, z } from "zod";
import { User } from "~/types";

const UsersInMemory: Array<User> = [
  {
    age: 20,
    id: "123",
    name: "Nombre",
    email: "jhonDutton@gmail.com",
    password: "123",

  },{
    age: 22,
    id: "13",
    name: "Name",
    email: "jhonDutton@gmail.com",
    password: "123",
  
  },{
    age: 52,
    id: "117",
    name: "Master Chief",
    email: "MasterPechosTitanicos@gmail.com",
    password: "lovuC0rt4na ",
  
  },
] satisfies User[];

export const create = (user: User) => {
  return new Promise<User>((resolve, reject) => {
    if (UsersInMemory.find((existent) => user.id === existent.id)) {
      reject("already exist");
    }
    UsersInMemory.push(user);
    resolve(user);
  });
};

export const get = (id: string) => {
  return UsersInMemory.find((u: User) => u.id === id);
};

export const getAll = () => {
  return UsersInMemory;
};
