import { createActor, createMachine } from "xstate";
import { ErrorCode } from "~/shared/codeError";

type Place = {
    isInitial: boolean
    value: string
}

type Transition = {
    from: string
    to: string
    event: string
};
type Context = any;

export class WorkflowBuilder {
    private id: string;
    private places: Map<Place['value'], Exclude<Place, 'value'>>;
    private transitions: Transition[];
    private context: Context[] | null;

    constructor(id: string) {
        this.places = new Map()
        this.transitions = []
        this.context = null
        this.id = id
    }

    addPlace(place: Place) {
        this.places.set(place.value, place)
        return this
    }

    addTransition(transition: Transition) {
        this.transitions.push(transition)
        return this
    }

    private composeStates() {
        const states = {} as Record<string, any>
        this.places.forEach((_, key) => {
            states[key] = {
                on: {
                }
            }
        })
        this.transitions.forEach(transition => {
            states[transition.from].on[transition.event] = transition.to
        })

        for (const key in states) {
            if (Object.prototype.hasOwnProperty.call(states, key)) {
                const element = states[key];
                if (Object.keys(element.on).length === 0) {
                    delete states[key].on
                    states[key].type = 'final'
                }
            }
        }

        return states
    }

    build() {
        const initialPlace = Array.from(this.places.values()).find(place => place.isInitial)?.value
        if (!initialPlace) {
            throw new ErrorCode(500, 'Invalid workflow')
        }

        const states = this.composeStates()
        return createMachine({
            id: this.id,
            initial: initialPlace,
            context: {
                items: [] as string[],
            },
            states
        })
    }
}
