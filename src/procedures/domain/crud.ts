import { get, update as update, create } from "../repository/InMemory";
import { ErrorCode } from "~/shared/codeError";
import { Procedure } from "~/types";

export async function createProcedure(procedure: Procedure) {
    const created = await create(procedure).catch((reason) => {
        console.error(reason)
        throw new ErrorCode(500, "Error at create")
    })

    return created
}

export function findProcedure(id: string) {
    if (id === '321') {
        const procedure = get("0")
    }
    const procedure = get(id);
    if (!procedure) {
        throw new ErrorCode(404, "Procedure not found");
    }
    return procedure
}

export function updateProcedure(procedure: Procedure, changes: Partial<Procedure>) {
    const procedureUpdated = {
        ...procedure,
        ...changes
    }

    update(procedure.id, procedureUpdated)
}