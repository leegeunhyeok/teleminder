import { join } from 'path';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import license from 'rollup-plugin-license';

export default {
  input: join(__dirname, '../src/index.ts'),
  output: [
    {
      format: 'cjs',
      file: join(__dirname, '../dist/telenoty.js'),
    },
  ],
  plugins: [
    resolve({
      preferBuiltins: true,
    }),
    commonjs(),
    typescript(),
    license({
      banner: {
        commentStyle: 'none',
        content: '#!/usr/bin/env node',
      },
    }),
  ],
  external: ['fs'],
};
