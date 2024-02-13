import { Procedure } from "~/types";

const procedures: Array<Procedure> = [
    {
        id: "123",
        name: "Procedure 1",
        description: "This is the first procedure",
        machineName: "checkout",
        stateMachine: {
            status: "active",
            output: undefined,
            error: undefined,
            value: "checkingOut",
            historyValue: {},
            context: {
                items: [],
            },
            children: {},
        },
    }
]

export const create = (procedure: Procedure) => {
    return new Promise<Procedure>((resolve, reject) => {
        if (procedures.find(existent => procedure.id === existent.id)) {
            reject('already exist')
        }
        procedures.push(procedure);
        resolve(procedure)
    })
}

export const get = (id: string) => {
    return procedures.find((p) => p.id === id);
}

export const getAll = () => {
    return procedures;
}

export const update = (id: string, procedure: Procedure) => {
    const index = procedures.findIndex((p) => p.id === id);
    procedures[index] = procedure;
    return procedure;
}
