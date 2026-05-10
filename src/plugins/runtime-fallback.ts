// Populates globalThis.__DYE_*__ with ANSI escape sequences. See README.
import { createDyeRawValues } from './common'

const target = globalThis as Record<string, unknown>

for (const [key, value] of Object.entries(createDyeRawValues())) {
  // Preserve any value already injected by a bundler `define` pass.
  if (typeof target[key] === 'string' && target[key] !== '') continue
  target[key] = value
}
