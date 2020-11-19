import { join } from 'path';
import json from '@rollup/plugin-json';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import license from 'rollup-plugin-license';

export default {
  input: join(__dirname, '../index.ts'),
  output: [
    {
      format: 'cjs',
      file: join(__dirname, '../dist/telenoty.js'),
    },
  ],
  plugins: [
    json(),
    commonjs(),
    typescript(),
    license({
      banner: {
        commentStyle: 'none',
        content: '#!/usr/bin/env node',
      },
    }),
  ],
  external: ['fs', 'arg', 'axios'],
};
