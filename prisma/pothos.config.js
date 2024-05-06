/** @type {import('prisma-generator-pothos-codegen').Config} */
module.exports = {
  global: {
    builderLocation: "./src/graphql/builder",
  },
  crud: {
    disabled: false,
    prismaCaller: '_context.prisma',
    prismaImporter: "import { Prisma } from '../generated/client'",
    outputDir: './src/generated/',
  },
  inputs: {
    prismaImporter: "import { Prisma } from '../generated/client'",
    outputFilePath: './src/generated/inputs.ts',
  },
};
