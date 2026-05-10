// Populates globalThis.__DYE_*__ with empty strings. See README.
import { createDyeRawValues } from './common'

const target = globalThis as Record<string, unknown>

for (const key of Object.keys(createDyeRawValues())) {
  target[key] = ''
}
