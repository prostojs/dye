import { dye, DyeColors, DyeGrayscale, DyeModifier } from '@prostojs/dye'

export interface CreateDyeReplacementsOptions {
  /** When true, all values resolve to empty strings instead of ANSI escapes. */
  strip?: boolean
}

/**
 * Raw ANSI-string map for every `__DYE_*__` constant. The single source of
 * truth consumed by `createDyeReplacements()`, the runtime-fallback modules,
 * and the lint-manifest build script.
 */
export function createDyeRawValues(): Record<string, string> {
  const c = dye('red')
  const bg = dye('bg-red')
  const out: Record<string, string> = {
    __DYE_RESET__: dye.reset,
    __DYE_COLOR_OFF__: c.close,
    __DYE_BG_OFF__: bg.close,
  }
  DyeModifier.forEach(v => {
    out[`__DYE_${v.toUpperCase()}__`] = dye(v).open
    out[`__DYE_${v.toUpperCase()}_OFF__`] = dye(v).close
  })
  DyeColors.forEach(v => {
    out[`__DYE_${v.toUpperCase()}__`] = dye(v).open
    out[`__DYE_BG_${v.toUpperCase()}__`] = dye(`bg-${v}`).open
    out[`__DYE_${v.toUpperCase()}_BRIGHT__`] = dye(`${v}-bright`).open
    out[`__DYE_BG_${v.toUpperCase()}_BRIGHT__`] = dye(`bg-${v}-bright`).open
  })
  DyeGrayscale.forEach(v => {
    out[`__DYE_${v.toUpperCase()}__`] = dye(v).open
    out[`__DYE_BG_${v.toUpperCase()}__`] = dye(`bg-${v}`).open
  })
  return out
}

/**
 * `define` map for build-tool replacements. Each key maps to a JSON-encoded
 * ANSI string (or `'""'` when `strip` is set, for tests/snapshots).
 */
export function createDyeReplacements(
  options: CreateDyeReplacementsOptions = {}
): Record<string, string> {
  const encode = options.strip ? () => '""' : JSON.stringify
  return Object.fromEntries(
    Object.entries(createDyeRawValues()).map(([k, v]) => [k, encode(v)])
  )
}
