/* eslint-disable import/no-default-export */
import fs from 'fs'
import path from 'path'
import { defineConfig } from 'rolldown'
import dts from 'unplugin-isolated-decl/rolldown'
import { fileURLToPath } from 'url'

// Clear the dist folder
const __dirname = path.dirname(fileURLToPath(import.meta.url))
const distPath = path.resolve(__dirname, 'dist')
if (fs.existsSync(distPath)) {
  fs.rmSync(distPath, { recursive: true, force: true })
}

export default defineConfig([
  {
    input: 'src/index.ts',
    output: {
      format: 'es',
      dir: 'dist',
      entryFileNames: 'index.mjs',
    },
    plugins: [dts()],
  },
  {
    input: 'src/index.ts',
    output: {
      format: 'cjs',
      dir: 'dist',
      entryFileNames: 'index.cjs',
    },
  },
  {
    input: ['src/plugins/rolldown.ts', 'src/plugins/vite.ts'],
    output: {
      format: 'es',
      dir: 'dist/plugins',
      entryFileNames: '[name].mjs',
    },
    plugins: [dts()],
  },
])
