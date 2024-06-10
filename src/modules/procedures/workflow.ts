import { createMachine } from "xstate";
import { WorkflowBuilder } from "./domain/workflowBuilder";

export const StateMachineFormat = {
    REACT_FLOW: "ReactFlow",
    RAW: "Raw",
} as const;

export function initializeState(workflow: any) {
    return createMachine(workflow)

}

interface FormatStateArgs {
    format: typeof StateMachineFormat[keyof typeof StateMachineFormat];
    stateMachine: ReturnType<typeof initializeState>;
}

const EDGE_SEPARATOR = "-{TO}-";

/**
 * 
 * @param state State that came from a xstate machine json
 * @param format The values of the StateMachineFormat enum `ReactFlow`
 * @returns 
 */
export function formatState({ stateMachine, format }: FormatStateArgs) {
    if (format === "ReactFlow") {
        console.log(stateMachine)
        const states = stateMachine.states;
        const nodes = Object.keys(states).map((key) => {
            const { meta } = states[key];
            return {
                width: meta.width,
                height: meta.height,
                id: key,
                type: meta.type,
                position: meta.position,
                data: {
                    label: meta.data.label,
                },
            };
        });

        const edges = Object.keys(states).flatMap((key) => {
            const { transitions, key: stateKey } = states[key];
            return transitions.map((transition) => {
                return transition.target?.flatMap((target) => {
                    return {
                        id: `${stateKey}${EDGE_SEPARATOR}${target.key}`,
                        source: transition.source.key,
                        sourceHandle: null,
                        target: target?.key,
                        targetHandle: null,
                        type: "custom",
                    };
                });
            });
        }).flat();

        return { nodes, edges };
    }
    if (format === "Raw") {
        return stateMachine;
    }

    throw new Error("Format not supported");
}

export function parseFormatToWorkflow({ workflow, format }: { workflow: any, format: typeof StateMachineFormat[keyof typeof StateMachineFormat] }) {
    if (format === 'ReactFlow') {
        const workflowBuilder = new WorkflowBuilder('registro-de-inventario')

        const initialNode = workflow.nodes.find((node: any) => {
            return !workflow.edges.some((edge: any) => { edge.target === node.id })
        })

        workflow.nodes.forEach((node: any) => {
            workflowBuilder.addPlace({
                value: node.id,
                isInitial: node.id === initialNode.id,
                meta: {
                    width: node.width,
                    height: node.height,
                    type: node.type,
                    position: node.position,
                    data: {
                        label: node.data.label,
                    },
                }
            })
        })

        workflow.edges.forEach((edge: any) => {
            const [source, target] = edge.id.split(EDGE_SEPARATOR);
            console.log(source, target)
            workflowBuilder.addTransition({
                from: source,
                to: target,
                event: `${source}${EDGE_SEPARATOR}${target}`,
            })
        })

        const workflowBuilt = workflowBuilder.build().machineJson

        return workflowBuilt
    }

    throw new Error("Format not supported");
}