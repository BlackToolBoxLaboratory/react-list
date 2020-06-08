import fs from 'fs'
import path from 'path'
import babel from "@rollup/plugin-babel";
import { eslint } from 'rollup-plugin-eslint';
import postcss from 'rollup-plugin-postcss'
import clear from 'rollup-plugin-clear';
import { terser } from "rollup-plugin-terser";
import autoprefixer from 'autoprefixer';

import { packageName } from './package.json'

const baseConfig = {
  input: path.resolve('module', 'index.jsx'),
  external: ['react', 'classnames'],
  plugins: [
    clear({
      targets: ['umd', 'lib', 'esm']
    }),
    postcss({
      plugins: [
        autoprefixer
      ],
      minimize: true,
      sourceMap: true,
      extract: true
    }),
    eslint({
      fix: true,
      throwOnError: true
    }),
    babel({
      exclude: "/node_modules/*"
    }),
    terser()
  ]
}

if (!fs.existsSync('umd')) {
  fs.mkdirSync('umd')
}
if (!fs.existsSync('lib')) {
  fs.mkdirSync('lib')
}
if (!fs.existsSync('esm')) {
  fs.mkdirSync('esm')
}

export default [
  // UMD
  {
    ...baseConfig,
    output: {
      format: 'umd',
      globals: {
        'react': 'React',
        'classnames': 'classnames'
      },
      name: packageName,
      file: path.resolve('umd', `index.js`),
      sourcemap: false
    }
  },
  // COMMON
  {
    ...baseConfig,
    output: {
      format: 'cjs',
      name: packageName,
      file: path.resolve('lib', `index.js`),
      sourcemap: false
    }
  },
  // ESM
  {
    ...baseConfig,
    output: {
      format: 'esm',
      globals: {
        'react': 'React',
        'classnames': 'classnames'
      },
      name: packageName,
      file: path.resolve('esm', `index.js`),
      sourcemap: false
    }
  }
]