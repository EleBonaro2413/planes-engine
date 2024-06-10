import {
    generateAllCrud,
    generateAllObjects,
    generateAllQueries,
    generateAllMutations,
} from '~/generated/autocrud';
import { builder } from './builder';
import { ProjectObject, updateOneProjectMutationObject } from '~/generated/Project';
import { parseFormatToWorkflow } from '~/modules/procedures/workflow';
import { StateMachineEnum } from './enums';
import getWorkflow from '~/modules/procedures/resolvers/objects/workflow';

type Options = Parameters<typeof generateAllCrud>[0];
const options: Options = { exclude: ['Project'] };

generateAllObjects(options);
generateAllQueries();
generateAllMutations(options);


builder.prismaObject('Project', {
    ...ProjectObject,
    fields: (t) => ({
        ...ProjectObject.fields(t),
        workflow: t.field({
            type: "Json",
            description: 'My field desc',
            args: {
                format: t.arg({
                    type: StateMachineEnum,
                    required: true,
                    defaultValue: "ReactFlow",
                    description: 'The format of the workflow state'
                })
            },
            resolve: ({ id }, args) => {
                const workflow = getWorkflow({ id, format: args.format });
                return workflow as object;
            },
        }),
    }),
});

builder.queryType({
    fields: (t) => ({
        health: t.field({ type: "String", resolve: () => "Ok" }),
    }),
});

builder.mutationFields((t) => {
    const field = updateOneProjectMutationObject(t);
    return {
        updateOneProject: t.prismaField({
            ...field,
            args: {
                ...field.args,
                format: t.arg({
                    type: StateMachineEnum,
                    required: true,
                    defaultValue: "ReactFlow",
                    description: 'The format of the workflow state'
                })
            },
            resolve: async (query, root, args, context, info) => {
                const { data: { workflow }, format } = args;
                const formatedWorkflow = parseFormatToWorkflow({ workflow, format })
                return field.resolve(query, root, {
                    ...args,
                    data: {
                        ...args.data,
                        workflow: formatedWorkflow
                    },
                }, context, info);
                return null
            }
        })
    }
})
builder.mutationType({});

export const schema = builder.toSchema({});