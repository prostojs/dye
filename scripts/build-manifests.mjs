// Post-build: emits dist/globals.json, dist/oxlint.json, dist/eslint.cjs
// from the canonical __DYE_*__ list in dist/plugins/common.mjs.

import { writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const here = dirname(fileURLToPath(import.meta.url))
const distDir = resolve(here, '..', 'dist')

const { createDyeRawValues } = await import(resolve(distDir, 'plugins/common.mjs'))

const names = Object.keys(createDyeRawValues()).sort()
const globals = Object.fromEntries(names.map(n => [n, 'readonly']))
const globalsJson = JSON.stringify(globals, null, 2)

await writeFile(resolve(distDir, 'globals.json'), `${globalsJson}\n`)
await writeFile(resolve(distDir, 'oxlint.json'), `${JSON.stringify({ globals }, null, 2)}\n`)
await writeFile(
  resolve(distDir, 'eslint.cjs'),
  `// Shareable ESLint flat config exposing @prostojs/dye build-time globals.
const globals = ${globalsJson}
module.exports = {
  name: '@prostojs/dye/globals',
  languageOptions: { globals },
}
module.exports.default = module.exports
`
)

console.log(`[@prostojs/dye] manifests written: ${names.length} globals`)
