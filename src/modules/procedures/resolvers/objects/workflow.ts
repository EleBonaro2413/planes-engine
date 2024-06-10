import getPrismaClient from "~/database/client";
import { StateMachineFormat } from "../../workflow";

interface Args {
    id: string;
    format: typeof StateMachineFormat[keyof typeof StateMachineFormat];
}

export default async function getWorkflow({ id, format }: Args) {
    const db = getPrismaClient();

    if (format === 'Raw') {
        const nodes = await db.node.findMany({
            select: {
                id: true,
                label: true,
                description: true,
            },
            where: {
                Project: {
                    id: {
                        equals: id
                    }
                }
            }
        });
        return { nodes };
    }

    const nodes = await db.node.findMany({
        select: {
            id: true,
            label: true,
            description: true,
            meta: true,
            fromArrows: {
                select: {
                    id: true,
                    label: true,
                    arrowData: {
                        select: {
                            id: true,
                            indicators: true,
                            requirements: {
                                select: {
                                    label: true,
                                    machineName: true,
                                    value: true
                                }
                            },
                            responsability: {
                                select: {
                                    collaborators: {
                                        select: {
                                            name: true,
                                            avatar: true
                                        }
                                    }
                                }
                            },
                        }
                    },
                    target: {
                        select: {
                            id: true,
                        }
                    }
                }
            },
        },
        where: {
            Project: {
                id: {
                    equals: id
                }
            }
        }
    });

    const initialNode = nodes.find((node) => node.fromArrows.length === 0);
    return {
        nodes: nodes.map((node) => ({
            id: node.id,
            type: "node",
            position: node.meta?.position,
            width: node.meta?.width,
            height: node.meta?.height,
            data: {
                label: node.label,
            }
        })),
        edges: nodes.flatMap((node) => {
            return node.fromArrows.map((arrow) => ({
                id: arrow.id,
                source: node.id,
                sourceHandle: null,
                target: arrow.target.id,
                targetHandle: null,
                type: "custom",
                data: {
                    id: arrow.arrowData.id,
                    label: arrow.label,
                    requirements: [...arrow.arrowData.requirements],
                    collaborators: arrow.arrowData.responsability.collaborators,
                }
            }));
        }),
        initialState: initialNode
    }
}