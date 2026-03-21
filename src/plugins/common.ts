import { dye, DyeColors, DyeGrayscale, DyeModifier } from '@prostojs/dye'

export function createDyeReplacements(): Record<string, string> {
  const c = dye('red')
  const bg = dye('bg-red')
  const dyeReplacements = {
    __DYE_RESET__: JSON.stringify(dye.reset),
    __DYE_COLOR_OFF__: JSON.stringify(c.close),
    __DYE_BG_OFF__: JSON.stringify(bg.close),
  } as Record<string, string>
  DyeModifier.forEach(v => {
    dyeReplacements[`__DYE_${v.toUpperCase()}__`] = JSON.stringify(dye(v).open)
    dyeReplacements[`__DYE_${v.toUpperCase()}_OFF__`] = JSON.stringify(dye(v).close)
  })
  DyeColors.forEach(v => {
    dyeReplacements[`__DYE_${v.toUpperCase()}__`] = JSON.stringify(dye(v).open)
    dyeReplacements[`__DYE_BG_${v.toUpperCase()}__`] = JSON.stringify(dye(`bg-${v}`).open)
    dyeReplacements[`__DYE_${v.toUpperCase()}_BRIGHT__`] = JSON.stringify(dye(`${v}-bright`).open)
    dyeReplacements[`__DYE_BG_${v.toUpperCase()}_BRIGHT__`] = JSON.stringify(dye(`bg-${v}-bright`).open)
  })
  DyeGrayscale.forEach(v => {
    dyeReplacements[`__DYE_${v.toUpperCase()}__`] = JSON.stringify(dye(v).open)
    dyeReplacements[`__DYE_BG_${v.toUpperCase()}__`] = JSON.stringify(dye(`bg-${v}`).open)
  })
  return dyeReplacements
}
