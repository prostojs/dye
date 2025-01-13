/* eslint-disable import/no-default-export */
/**
 * Rolldown plugin for dye
 */
import type { Plugin } from 'rolldown'

import { createDyeReplacements } from './common'

/**
 * Rolldown plugin for dye
 *
 * !IMPORTANT: add
 * "extends": "./node_modules/@prostojs/dye/tsconfig.dye.json",
 * to your tsconfig.json
 */
export default function rolldownPlugin(): Plugin {
  return {
    name: '@prostojs/dye',
    options(o) {
      o.define = { ...createDyeReplacements(), ...o.define }
      return o
    },
  }
}
