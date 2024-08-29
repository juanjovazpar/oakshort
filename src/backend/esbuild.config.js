const esbuild = require('esbuild');

esbuild
  .build({
    entryPoints: ['./index.ts'],
    bundle: true,
    platform: 'node',
    target: 'node18',
    outfile: './dist/index.js',
    minify: true,
    sourcemap: false,
    external: ['mongoose', 'bcryptjs', 'nanoid', 'jsonwebtoken'],
  })
  .catch(() => process.exit(1));
