import {
    generateAllCrud,
} from '~/generated/autocrud';
import { builder } from './builder';

generateAllCrud();

builder.queryType({});
builder.mutationType({});

export const schema = builder.toSchema({});