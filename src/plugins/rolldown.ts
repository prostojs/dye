/* eslint-disable import/no-default-export */
/**
 * Rolldown plugin for dye
 */
import type { Plugin } from 'rolldown'

import { createDyeReplacements } from './common'

export default function rolldownPlugin(): Plugin {
  return {
    name: '@prostojs/dye',
    options() {
      return {
        define: createDyeReplacements(),
      }
    },
  }
}
