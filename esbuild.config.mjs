import esbuild from 'esbuild';
import dotenv from 'dotenv';
import { rmSync } from 'fs';

dotenv.config();

const isWatch = process.argv.includes('--watch');
const outDirs = ['client', 'server', 'shared'];

outDirs.forEach(dir => rmSync(dir, { recursive: true, force: true }));

const common = {
  bundle: true,
  minify: !isWatch,
  sourcemap: isWatch,
  target: 'es2022',
  format: 'cjs',
  logLevel: 'info',
};

async function buildAll() {
  await Promise.all([
    esbuild.build({ ...common, entryPoints: ['src/client/index.ts'], outfile: 'client/index.js', platform: 'browser' }),
    esbuild.build({ ...common, entryPoints: ['src/server/index.ts'], outfile: 'server/index.js', platform: 'node' }),
    esbuild.build({ ...common, entryPoints: ['src/shared/index.ts'], outfile: 'shared/index.js', platform: 'neutral' }),
  ]);
  console.log('✅ Mercy-TS Boilerplate built!');
}

if (isWatch) {
  const contexts = await Promise.all([
    esbuild.context({ ...common, entryPoints: ['src/client/index.ts'], outfile: 'client/index.js', platform: 'browser' }),
    esbuild.context({ ...common, entryPoints: ['src/server/index.ts'], outfile: 'server/index.js', platform: 'node' }),
    esbuild.context({ ...common, entryPoints: ['src/shared/index.ts'], outfile: 'shared/index.js', platform: 'neutral' }),
  ]);
  await Promise.all(contexts.map(ctx => ctx.watch()));
  console.log('👀 Watching TS files... (Vite NUI preview running at http://localhost:5173)');
  process.on('SIGINT', () => contexts.forEach(ctx => ctx.dispose()));
} else {
  await buildAll();
}