/* eslint-disable import/no-default-export */
/**
 * Vite plugin for dye
 */
import type { Plugin } from 'vite'

import { createDyeReplacements } from './common'

/**
 * Vite plugin for dye
 *
 * !IMPORTANT: add
 * "extends": "./node_modules/@prostojs/dye/tsconfig.dye.json",
 * to your tsconfig.json
 */
export default function vitePlugin(): Plugin {
  return {
    name: '@prostojs/dye',

    config() {
      return {
        define: createDyeReplacements(),
      }
    },
  }
}
