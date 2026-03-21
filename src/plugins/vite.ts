/* eslint-disable import/no-default-export */
import type { Plugin } from 'vite'

import { createDyeReplacements } from './common'
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
