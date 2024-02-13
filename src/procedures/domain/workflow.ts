import { createMachine, createActor, assign } from "xstate";
import { Procedure } from "~/types";

const checkoutMachine = createMachine({
    id: "checkout",
    initial: "shopping",
    context: {
        items: [] as string[],
    },
    states: {
        shopping: {
            on: {
                checkout: "checkingOut",
            },
        },
        checkingOut: {
            on: {
                "item.remove": {
                    actions: assign({
                        items: ({ context, event }) => {
                            return context.items.filter((item) => item !== event.item);
                        },
                    }),
                    meta: {
                        rendereableLabel: 'Remover elemnto'
                    }
                },
                "item.add": {
                    actions: assign({
                        items: ({ context, event }) => {
                            return [...context.items, event.item];
                        },
                    }),
                },
                cancel: {
                    target: "shopping",
                    meta: { renderableLabel: "shopping phase" }
                },
                submit: "finished",
            },
        },
        finished: {
            type: "final",
        },
    },
});

export function initializeState(procedure: Procedure) {
    if (procedure.stateMachine) {
        return
    }

    const actor = createActor(checkoutMachine)
    const value = actor.getPersistedSnapshot()
    return value
}

export function calculateNextStates(procedure: Procedure) {
    const checkoutActor = createActor(checkoutMachine, {
        snapshot: procedure.stateMachine,
    });
    const { value } = checkoutActor.getSnapshot();
    if (!(value.toString() in checkoutMachine.states)) {
        throw new Error("Invalid state");
    }

    const nextStates = checkoutMachine.states[value.toString()].on
        ? Object.keys(checkoutMachine.states[value.toString()].on)
        : [];

    return nextStates;
}
