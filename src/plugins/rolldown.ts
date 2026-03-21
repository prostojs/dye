/* eslint-disable import/no-default-export */
import type { Plugin } from 'rolldown'

import { createDyeReplacements } from './common'
export default function rolldownPlugin(): Plugin {
  return {
    name: '@prostojs/dye',
    options(o) {
      o.transform = o.transform || {}
      o.transform.define = { ...createDyeReplacements(), ...o.transform.define }
      return o
    },
  }
}
