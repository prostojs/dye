/* eslint-disable @typescript-eslint/consistent-type-imports */
declare module '@prostojs/dye' {
  export const dye: typeof import('./index').dye
  export const DyeColors: typeof import('./index').DyeColors
  export const DyeGrayscale: typeof import('./index').DyeGrayscale
  export const DyeModifier: typeof import('./index').DyeModifier
}
