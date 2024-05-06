import SchemaBuilder from '@pothos/core';
import PrismaPlugin from '@pothos/plugin-prisma';
import type PrismaTypes from '@pothos/plugin-prisma/generated';
import getPrismaClient from '~/database/client';
import { Scalars } from 'prisma-generator-pothos-codegen';
import { Prisma } from '.prisma/client';


const prisma = getPrismaClient();

export const builder = new SchemaBuilder<{
    // ... Context, plugins? ...
    PrismaTypes: PrismaTypes; // required for @pothos/plugin-prisma integration (which is required)
    Scalars: Scalars<Prisma.Decimal, Prisma.InputJsonValue | null, Prisma.InputJsonValue>; // required to define correct types for created scalars.
}>({
    prisma: {
        client: prisma,
    },
    plugins: [PrismaPlugin],
});