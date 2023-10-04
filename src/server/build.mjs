import esbuild from 'esbuild';


console.log("Building ....")
await esbuild.build({
    entryPoints: ['./extension.ts'],
    bundle: true,
    platform: 'node',
    target: ['es2020'],
    format: 'esm',
    color: true,
    external: ['omni-sockets'],
    outdir: '../../server/',
}).catch((ex) =>
{
    console.error(ex)
    process.exit(1)
}).then(() =>
console.log("Build complete")
)