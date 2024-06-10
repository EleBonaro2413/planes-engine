import { builder } from './builder';
import { StateMachineFormat } from '~/modules/procedures/workflow';

export const StateMachineEnum = builder.enumType('StateMachineFormat', {
    values: Object.values(StateMachineFormat)
})
