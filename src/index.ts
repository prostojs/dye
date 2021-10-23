enum PlainColors {
    BLACK,
    RED,
    GREEN,
    YELLOW,
    BLUE,
    MAGENTA,
    CYAN,
    WHITE,
    RESET = 9,
    BLACK_BRIGHT = 60,
    RED_BRIGHT,
    GREEN_BRIGHT,
    YELLOW_BRIGHT,
    BLUE_BRIGHT,
    MAGENTA_BRIGHT,
    CYAN_BRIGHT,
    WHITE_BRIGHT,
}

enum Grayscale {
    BLACK,
    GRAY01,
    GRAY02,
    GRAY03,
    GRAY04,
    GRAY05,
    GRAY06,
    GRAY07,
    GRAY08,
    GRAY09,
    GRAY10,
    GRAY11,
    GRAY12,
    GRAY13,
    GRAY14,
    GRAY15,
    GRAY16,
    GRAY17,
    GRAY18,
    GRAY19,
    GRAY20,
    GRAY21,
    GRAY22,
    WHITE,
}

enum Modifiers {
    RESET,
    BOLD,
    DIM,
    ITALIC,
    UNDERSCORE,
    BLINK_SLOW,
    BLINK_RAPID,
    INVERSE,
    HIDDEN,
    CROSSED,
    PRIMARY,
    ALT0,
    ALT1,
    ALT2,
    ALT3,
    ALT4,
    ALT5,
    ALT6,
    ALT7,
    ALT8,
    FRAKTUR,
    BOLD_OFF = 22,
    DIM_OFF = 22,
    ITALIC_OFF,
    UNDERSCORE_OFF,
    BLINK_SLOW_OFF,
    BLINK_RAPID_OFF,
    INVERSE_OFF,
    REVEAL,
    CROSSED_OFF,
}

type number256 = number
type number6 = number

const BG_OFFSET = 10

const modify = (n: Modifiers) => `\x1b[${ n }m`
const plain = (n: PlainColors, bg = false) => `\x1b[${ 30 + Number(bg) * BG_OFFSET + n }m`
const gray = (n: Grayscale, bg = false) => `\x1b[${ 38 + Number(bg) * BG_OFFSET };5;${ 232 + n }m`
const rgb256 = (r: number6, g: number6, b: number6, bg = false) => `\x1b[${ 38 + Number(bg) * BG_OFFSET };5;${ 16 + r * 36 + g * 6 + b }m`
const tcRGB = (r: number256, g: number256, b: number256, bg = false) => `\x1b[${ 38 + Number(bg) * BG_OFFSET };2;${ r };${ g };${ b }m`

export type TDyeColor = 'BLACK' | 'RED' | 'GREEN' | 'YELLOW' | 'BLUE' | 'MAGENTA' | 'CYAN' | 'WHITE'
export type TDyeGrayscale = 'GRAY01' | 'GRAY02' | 'GRAY03' | 'GRAY04' | 'GRAY05' | 'GRAY06' | 'GRAY07' | 'GRAY08' |
                     'GRAY09' | 'GRAY10' | 'GRAY11' | 'GRAY12' | 'GRAY13' | 'GRAY14' | 'GRAY15' | 'GRAY16' |
                     'GRAY17' | 'GRAY18' | 'GRAY19' | 'GRAY20' | 'GRAY21' | 'GRAY22'
export type TDyeColorBright = `${ TDyeColor }_BRIGHT`

export type TDyeColorAll = TDyeColor | TDyeColorBright | TDyeGrayscale

export type TDyeBgColor = `BG_${ TDyeColorAll }`

export type TDyeModifier = 'BOLD' | 'DIM' | 'ITALIC' | 'UNDERSCORE' | 'INVERSE' | 'HIDDEN' | 'CROSSED'

const colors: Record<TDyeColorAll, string> = {
    BLACK:      plain(PlainColors.BLACK),
    RED:        plain(PlainColors.RED),
    GREEN:      plain(PlainColors.GREEN),
    YELLOW:     plain(PlainColors.YELLOW),
    BLUE:       plain(PlainColors.BLUE),
    MAGENTA:    plain(PlainColors.MAGENTA),
    CYAN:       plain(PlainColors.CYAN),
    WHITE:      plain(PlainColors.WHITE),

    BLACK_BRIGHT:      plain(PlainColors.BLACK_BRIGHT),
    RED_BRIGHT:        plain(PlainColors.RED_BRIGHT),
    GREEN_BRIGHT:      plain(PlainColors.GREEN_BRIGHT),
    YELLOW_BRIGHT:     plain(PlainColors.YELLOW_BRIGHT),
    BLUE_BRIGHT:       plain(PlainColors.BLUE_BRIGHT),
    MAGENTA_BRIGHT:    plain(PlainColors.MAGENTA_BRIGHT),
    CYAN_BRIGHT:       plain(PlainColors.CYAN_BRIGHT),
    WHITE_BRIGHT:      plain(PlainColors.WHITE_BRIGHT),
    
    GRAY01:     gray(Grayscale.GRAY01),
    GRAY02:     gray(Grayscale.GRAY02),
    GRAY03:     gray(Grayscale.GRAY03),
    GRAY04:     gray(Grayscale.GRAY04),
    GRAY05:     gray(Grayscale.GRAY05),
    GRAY06:     gray(Grayscale.GRAY06),
    GRAY07:     gray(Grayscale.GRAY07),
    GRAY08:     gray(Grayscale.GRAY08),
    GRAY09:     gray(Grayscale.GRAY09),
    GRAY10:     gray(Grayscale.GRAY10),
    GRAY11:     gray(Grayscale.GRAY11),
    GRAY12:     gray(Grayscale.GRAY12),
    GRAY13:     gray(Grayscale.GRAY13),
    GRAY14:     gray(Grayscale.GRAY14),
    GRAY15:     gray(Grayscale.GRAY15),
    GRAY16:     gray(Grayscale.GRAY16),
    GRAY17:     gray(Grayscale.GRAY17),
    GRAY18:     gray(Grayscale.GRAY18),
    GRAY19:     gray(Grayscale.GRAY19),
    GRAY20:     gray(Grayscale.GRAY20),
    GRAY21:     gray(Grayscale.GRAY21),
    GRAY22:     gray(Grayscale.GRAY22),
}

const bgColors: Record<TDyeBgColor, string> = {
    BG_BLACK:      plain(PlainColors.BLACK, true),
    BG_RED:        plain(PlainColors.RED, true),
    BG_GREEN:      plain(PlainColors.GREEN, true),
    BG_YELLOW:     plain(PlainColors.YELLOW, true),
    BG_BLUE:       plain(PlainColors.BLUE, true),
    BG_MAGENTA:    plain(PlainColors.MAGENTA, true),
    BG_CYAN:       plain(PlainColors.CYAN, true),
    BG_WHITE:      plain(PlainColors.WHITE, true),

    BG_BLACK_BRIGHT:      plain(PlainColors.BLACK_BRIGHT, true),
    BG_RED_BRIGHT:        plain(PlainColors.RED_BRIGHT, true),
    BG_GREEN_BRIGHT:      plain(PlainColors.GREEN_BRIGHT, true),
    BG_YELLOW_BRIGHT:     plain(PlainColors.YELLOW_BRIGHT, true),
    BG_BLUE_BRIGHT:       plain(PlainColors.BLUE_BRIGHT, true),
    BG_MAGENTA_BRIGHT:    plain(PlainColors.MAGENTA_BRIGHT, true),
    BG_CYAN_BRIGHT:       plain(PlainColors.CYAN_BRIGHT, true),
    BG_WHITE_BRIGHT:      plain(PlainColors.WHITE_BRIGHT, true),
    
    BG_GRAY01:     gray(Grayscale.GRAY01, true),
    BG_GRAY02:     gray(Grayscale.GRAY02, true),
    BG_GRAY03:     gray(Grayscale.GRAY03, true),
    BG_GRAY04:     gray(Grayscale.GRAY04, true),
    BG_GRAY05:     gray(Grayscale.GRAY05, true),
    BG_GRAY06:     gray(Grayscale.GRAY06, true),
    BG_GRAY07:     gray(Grayscale.GRAY07, true),
    BG_GRAY08:     gray(Grayscale.GRAY08, true),
    BG_GRAY09:     gray(Grayscale.GRAY09, true),
    BG_GRAY10:     gray(Grayscale.GRAY10, true),
    BG_GRAY11:     gray(Grayscale.GRAY11, true),
    BG_GRAY12:     gray(Grayscale.GRAY12, true),
    BG_GRAY13:     gray(Grayscale.GRAY13, true),
    BG_GRAY14:     gray(Grayscale.GRAY14, true),
    BG_GRAY15:     gray(Grayscale.GRAY15, true),
    BG_GRAY16:     gray(Grayscale.GRAY16, true),
    BG_GRAY17:     gray(Grayscale.GRAY17, true),
    BG_GRAY18:     gray(Grayscale.GRAY18, true),
    BG_GRAY19:     gray(Grayscale.GRAY19, true),
    BG_GRAY20:     gray(Grayscale.GRAY20, true),
    BG_GRAY21:     gray(Grayscale.GRAY21, true),
    BG_GRAY22:     gray(Grayscale.GRAY22, true),
}

const modifiers: Record<TDyeModifier, string> = {
    BOLD: modify(Modifiers.BOLD),
    DIM: modify(Modifiers.DIM),
    ITALIC: modify(Modifiers.ITALIC),
    UNDERSCORE: modify(Modifiers.UNDERSCORE),
    INVERSE: modify(Modifiers.INVERSE),
    HIDDEN: modify(Modifiers.HIDDEN),
    CROSSED: modify(Modifiers.CROSSED),
}

const modifiersClose: Record<TDyeModifier | 'COLOR' | 'BG_COLOR', string> = {
    COLOR: plain(PlainColors.RESET),
    BG_COLOR: plain(PlainColors.RESET, true),
    BOLD: modify(Modifiers.BOLD_OFF),
    DIM: modify(Modifiers.DIM_OFF),
    ITALIC: modify(Modifiers.ITALIC_OFF),
    UNDERSCORE: modify(Modifiers.UNDERSCORE_OFF),
    INVERSE: modify(Modifiers.INVERSE_OFF),
    HIDDEN: modify(Modifiers.REVEAL),
    CROSSED: modify(Modifiers.CROSSED_OFF),
}

export type TRGB = `${ number },${ number },${ number }`
export type TBgRGB = `BG${ number },${ number },${ number }`
export type TRGB256 = `_${ number },${ number },${ number }`
export type TBgRGB256 = `BG_${ number },${ number },${ number }`

export type TRGBTypes = TRGB | TBgRGB | TRGB256 | TBgRGB256

/**
 * Returns a `style` function based on input arguments.
 * 
 * Supports plain colors: `BLACK`, `RED`, `GREEN`, `YELLOW`, `BLUE`, `MAGENTA`, `CYAN`, `WHITE`.
 * 
 * Prefix `BG_` turns color to background color.
 * 
 * Suffix `_BRIGHT` makes color brighter.
 * 
 * Supports modifiers: `BOLD`, `DIM`, `ITALIC`, `UNDERSCORE`, `INVERSE`, `HIDDEN`, `CROSSED`.
 * 
 * Supports True Color rgb:
 * ```js
 * dye('255,0,0') // red True Color
 * dye('BG255,0,0') // red True Color background
 * ```
 * 
 * Supports 256 rgb version:
 * ```js
 * dye('_5,0,0') // red 256
 * dye('BG_5,0,0') // red 256 background
 * ```
 * 
 * Simple example
 * ```js
 * bold = dye('BOLD')
 * console.log(bold('Text In Bold'))
 * ```
 * 
 * Advanced example
 * ```js
 * myStyle = dye('ITALIC', 'BG_RED', '0,0,255')
 * console.log(myStyle('Styled italic blue text with red BG'))
 * ```
 * @param args[]
 * @returns (text: string | number, mode?: 'OPEN' | 'CLOSE') => string
 */
export function dye(...args: (TDyeColorAll | TDyeBgColor | TDyeModifier | TRGBTypes)[]) {
    let open = ''
    let close = ''
    const closeObject: Record<string, string> = {}

    if (args.length) {
        for (let i = 0; i < args.length; i++) {
            const c = args[i];
            if (c.indexOf(',') > 0) {
                let [r, g, b]: (string | number)[] = c.split(',')
                let bg = false
                let mode256 = false
                if (r.startsWith('BG')) {
                    bg = true
                    r = r.slice(2)
                }
                if (r.startsWith('_')) {
                    mode256 = true
                    r = r.slice(1)
                }
                if (mode256) {
                    r = checkRGBNumber(r.trim(), 'r', 5)
                    g = checkRGBNumber(g, 'g', 5)
                    b = checkRGBNumber(b, 'b', 5)
                    open += rgb256(r, g, b, bg)
                } else {
                    r = checkRGBNumber(r.trim(), 'r', 255)
                    g = checkRGBNumber(g, 'g', 255)
                    b = checkRGBNumber(b, 'b', 255)
                    open += tcRGB(r, g, b, bg)
                }
                closeObject.COLOR = bg ? modifiersClose.BG_COLOR : modifiersClose.COLOR
            } else if (colors[c as TDyeColor]) {
                open += colors[c as TDyeColor]
                closeObject.COLOR = modifiersClose.COLOR
            } else if (bgColors[c as TDyeBgColor]) {
                open += bgColors[c as TDyeBgColor]
                closeObject.BG_COLOR = modifiersClose.BG_COLOR
            } else if (modifiers[c as TDyeModifier]) {
                open += modifiers[c as TDyeModifier]
                closeObject[c as TDyeModifier] = modifiersClose[c as TDyeModifier]
            } else {
                throw new Error(`[Dye] Color or modifier "${ c }" is not supported.`)
            }
        }
    }
    for (const closing of Object.values(closeObject)) {
        close += closing
    }
    const styleFunc = (text: string | number) => `${ open }${ text }${ close }`
    styleFunc.open = open 
    styleFunc.close = close
    return styleFunc
}

dye.strip = (coloredText: string): string => {
    return coloredText.replace(/\x1b\[[^m]+m/g, '')
}

function checkRGBNumber(n: number | string, component: 'r' | 'g' | 'b', limit = 255): number {
    const _n = Number(n)
    if (Number.isNaN(_n)) throw new Error(`[Dye] Color component "${ component }" must be a number. Received "${ n }".`);
    if (_n > limit) throw new Error(`[Dye] Color component "${ component }" must be less than ${ limit + 1 }. Received "${ n }".`);
    return _n
}
