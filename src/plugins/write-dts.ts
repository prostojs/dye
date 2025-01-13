import { writeFileSync } from 'fs'

export function writeDts(keys: string[]) {
  const lines = [
    `/**
 * This file is auto-generated by the Dye plugin.
 * It defines global color and modifier variables that can be used in the codebase.
 * These variables will be replaced during the build process.
 */`,
    '/* eslint-disable unicorn/no-abusive-eslint-disable */',
    '/* eslint-disable */',
    '',
    ...keys.map(key => `declare var ${key}: string`),
    '',
  ]

  const dtsContents = lines.join('\n')
  writeFileSync('./dye.d.ts', dtsContents)
}
