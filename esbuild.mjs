import * as esbuild from 'esbuild'

await esbuild.build({
    entryPoints: ['src/index.ts'],
    bundle: true,
    platform: 'node',
    target: ['node20.11.1'],
    outfile: 'dist/index.js',
})
