// types
type number256 = number
type number6 = number

export type TDyeColor = 'black' | 'red' | 'green' | 'yellow' | 'blue' | 'magenta' | 'cyan' | 'white'
export type TDyeGrayscale = 'gray01' | 'gray02' | 'gray03' | 'gray04' | 'gray05' | 'gray06' | 'gray07' | 'gray08' |
                     'gray09' | 'gray10' | 'gray11' | 'gray12' | 'gray13' | 'gray14' | 'gray15' | 'gray16' |
                     'gray17' | 'gray18' | 'gray19' | 'gray20' | 'gray21' | 'gray22'
export type TDyeColorBright = `${ TDyeColor }-bright`

export type TDyeColorAll = TDyeColor | TDyeColorBright | TDyeGrayscale

export type TDyeBgColor = `bg-${ TDyeColorAll }`

export type TDyeModifier = 'bold' | 'dim' | 'italic' | 'underscore' | 'inverse' | 'hidden' | 'crossed'

export type TRGBHEX = `#${ string }`
export type TRGBHEXBG = `bg#${ string }`
export type TRGBHEXTypes = TRGBHEX | TRGBHEXBG
export type TRGB = `${ number },${ number },${ number }`
export type TBgRGB = `bg${ number },${ number },${ number }`
export type TRGB256 = `*${ number },${ number },${ number }`
export type TBgRGB256 = `bg*${ number },${ number },${ number }`

export type TRGBTypes = TRGB | TBgRGB | TRGB256 | TBgRGB256

export interface TDyeStylist {
    (text: string | number): string;
    open: string;
    close: string;
    prefix: (v: string | (() => string)) => TDyeStylist
    suffix: (v: string | (() => string)) => TDyeStylist
    attachConsole: (...args: [] | [TConsoleMethodName] | [TConsoleMethodName, TConsoleInterface] | [((...args: TConsoleArgument) => void)]) => TDyeStylistConsole
}

export interface TDyeStylistConsole {
    (...args: TConsoleArgument): void;
    enable: (v?: boolean) => void
    disable: () => void
}

export type TConsoleMethodName = 'info' | 'log' | 'warn' | 'error' | 'debug'
export type TConsoleArgument = (string | number | Error | Record<string, unknown> | unknown)[]
export interface TConsoleInterface {
    log: (...args: TConsoleArgument) => void
    info: (...args: TConsoleArgument) => void
    debug: (...args: TConsoleArgument) => void
    warn: (...args: TConsoleArgument) => void
    error: (...args: TConsoleArgument) => void
}

// consts
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

const BG_OFFSET = 10

const modify = (n: Modifiers) => `\x1b[${ n }m`
const plain = (n: PlainColors, bg = false) => `\x1b[${ 30 + Number(bg) * BG_OFFSET + n }m`
const gray = (n: Grayscale, bg = false) => `\x1b[${ 38 + Number(bg) * BG_OFFSET };5;${ 232 + n }m`
const rgb256 = (r: number6, g: number6, b: number6, bg = false) => `\x1b[${ 38 + Number(bg) * BG_OFFSET };5;${ 16 + r * 36 + g * 6 + b }m`
const tcRGB = (r: number256, g: number256, b: number256, bg = false) => `\x1b[${ 38 + Number(bg) * BG_OFFSET };2;${ r };${ g };${ b }m`

const colors: Record<TDyeColorAll, string> = {
    black:      plain(PlainColors.BLACK),
    red:        plain(PlainColors.RED),
    green:      plain(PlainColors.GREEN),
    yellow:     plain(PlainColors.YELLOW),
    blue:       plain(PlainColors.BLUE),
    magenta:    plain(PlainColors.MAGENTA),
    cyan:       plain(PlainColors.CYAN),
    white:      plain(PlainColors.WHITE),

    'black-bright':      plain(PlainColors.BLACK_BRIGHT),
    'red-bright':        plain(PlainColors.RED_BRIGHT),
    'green-bright':      plain(PlainColors.GREEN_BRIGHT),
    'yellow-bright':     plain(PlainColors.YELLOW_BRIGHT),
    'blue-bright':       plain(PlainColors.BLUE_BRIGHT),
    'magenta-bright':    plain(PlainColors.MAGENTA_BRIGHT),
    'cyan-bright':       plain(PlainColors.CYAN_BRIGHT),
    'white-bright':      plain(PlainColors.WHITE_BRIGHT),
    
    gray01:     gray(Grayscale.GRAY01),
    gray02:     gray(Grayscale.GRAY02),
    gray03:     gray(Grayscale.GRAY03),
    gray04:     gray(Grayscale.GRAY04),
    gray05:     gray(Grayscale.GRAY05),
    gray06:     gray(Grayscale.GRAY06),
    gray07:     gray(Grayscale.GRAY07),
    gray08:     gray(Grayscale.GRAY08),
    gray09:     gray(Grayscale.GRAY09),
    gray10:     gray(Grayscale.GRAY10),
    gray11:     gray(Grayscale.GRAY11),
    gray12:     gray(Grayscale.GRAY12),
    gray13:     gray(Grayscale.GRAY13),
    gray14:     gray(Grayscale.GRAY14),
    gray15:     gray(Grayscale.GRAY15),
    gray16:     gray(Grayscale.GRAY16),
    gray17:     gray(Grayscale.GRAY17),
    gray18:     gray(Grayscale.GRAY18),
    gray19:     gray(Grayscale.GRAY19),
    gray20:     gray(Grayscale.GRAY20),
    gray21:     gray(Grayscale.GRAY21),
    gray22:     gray(Grayscale.GRAY22),
}

const bgColors: Record<TDyeBgColor, string> = {
    'bg-black':      plain(PlainColors.BLACK, true),
    'bg-red':        plain(PlainColors.RED, true),
    'bg-green':      plain(PlainColors.GREEN, true),
    'bg-yellow':     plain(PlainColors.YELLOW, true),
    'bg-blue':       plain(PlainColors.BLUE, true),
    'bg-magenta':    plain(PlainColors.MAGENTA, true),
    'bg-cyan':       plain(PlainColors.CYAN, true),
    'bg-white':      plain(PlainColors.WHITE, true),

    'bg-black-bright':      plain(PlainColors.BLACK_BRIGHT, true),
    'bg-red-bright':        plain(PlainColors.RED_BRIGHT, true),
    'bg-green-bright':      plain(PlainColors.GREEN_BRIGHT, true),
    'bg-yellow-bright':     plain(PlainColors.YELLOW_BRIGHT, true),
    'bg-blue-bright':       plain(PlainColors.BLUE_BRIGHT, true),
    'bg-magenta-bright':    plain(PlainColors.MAGENTA_BRIGHT, true),
    'bg-cyan-bright':       plain(PlainColors.CYAN_BRIGHT, true),
    'bg-white-bright':      plain(PlainColors.WHITE_BRIGHT, true),
    
    'bg-gray01':     gray(Grayscale.GRAY01, true),
    'bg-gray02':     gray(Grayscale.GRAY02, true),
    'bg-gray03':     gray(Grayscale.GRAY03, true),
    'bg-gray04':     gray(Grayscale.GRAY04, true),
    'bg-gray05':     gray(Grayscale.GRAY05, true),
    'bg-gray06':     gray(Grayscale.GRAY06, true),
    'bg-gray07':     gray(Grayscale.GRAY07, true),
    'bg-gray08':     gray(Grayscale.GRAY08, true),
    'bg-gray09':     gray(Grayscale.GRAY09, true),
    'bg-gray10':     gray(Grayscale.GRAY10, true),
    'bg-gray11':     gray(Grayscale.GRAY11, true),
    'bg-gray12':     gray(Grayscale.GRAY12, true),
    'bg-gray13':     gray(Grayscale.GRAY13, true),
    'bg-gray14':     gray(Grayscale.GRAY14, true),
    'bg-gray15':     gray(Grayscale.GRAY15, true),
    'bg-gray16':     gray(Grayscale.GRAY16, true),
    'bg-gray17':     gray(Grayscale.GRAY17, true),
    'bg-gray18':     gray(Grayscale.GRAY18, true),
    'bg-gray19':     gray(Grayscale.GRAY19, true),
    'bg-gray20':     gray(Grayscale.GRAY20, true),
    'bg-gray21':     gray(Grayscale.GRAY21, true),
    'bg-gray22':     gray(Grayscale.GRAY22, true),
}

const modifiers: Record<TDyeModifier, string> = {
    bold: modify(Modifiers.BOLD),
    dim: modify(Modifiers.DIM),
    italic: modify(Modifiers.ITALIC),
    underscore: modify(Modifiers.UNDERSCORE),
    inverse: modify(Modifiers.INVERSE),
    hidden: modify(Modifiers.HIDDEN),
    crossed: modify(Modifiers.CROSSED),
}

const modifiersClose: Record<TDyeModifier | 'color' | 'bg-color', string> = {
    color: plain(PlainColors.RESET),
    'bg-color': plain(PlainColors.RESET, true),
    bold: modify(Modifiers.BOLD_OFF),
    dim: modify(Modifiers.DIM_OFF),
    italic: modify(Modifiers.ITALIC_OFF),
    underscore: modify(Modifiers.UNDERSCORE_OFF),
    inverse: modify(Modifiers.INVERSE_OFF),
    hidden: modify(Modifiers.REVEAL),
    crossed: modify(Modifiers.CROSSED_OFF),
}

// implementation
export function dye(...args: (TDyeColorAll | TDyeBgColor | TDyeModifier | TRGBTypes | TRGBHEXTypes)[]): TDyeStylist {
    let open = ''
    let close = ''
    const closeObject: Record<string, string> = {}

    if (args.length) {
        for (let i = 0; i < args.length; i++) {
            const c = args[i]
            if (c.indexOf(',') > 0 || c.indexOf('#') >= 0) {
                let bg = false
                if (c.indexOf('#') >= 0) {
                    if (c.startsWith('bg')) {
                        bg = true
                    }
                    let hex = c.split('#').pop() as string
                    if (!/^([0-9a-f]{3}|[0-9a-f]{6})$/i.test(hex)) throw new Error(`[Dye] Wrong hex "#${ hex }".`)
                    if (hex.length === 3) hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2]
                    const r = parseInt(hex.slice(0, 2), 16)
                    const g = parseInt(hex.slice(2, 4), 16)
                    const b = parseInt(hex.slice(4, 6), 16)
                    open += tcRGB(r, g, b, bg)
                } else {
                    let mode256 = false
                    let [r, g, b]: (string | number)[] = c.split(',')
                    if (r.startsWith('bg')) {
                        bg = true
                        r = r.slice(2)
                    }
                    if (r.startsWith('*')) {
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
                }
                if (bg) {
                    closeObject['bg-color'] = modifiersClose['bg-color']
                } else {
                    closeObject.color = modifiersClose.color
                }
            } else if (colors[c as TDyeColor]) {
                open += colors[c as TDyeColor]
                closeObject.color = modifiersClose.color
            } else if (bgColors[c as TDyeBgColor]) {
                open += bgColors[c as TDyeBgColor]
                closeObject['bg-color'] = modifiersClose['bg-color']
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
    return getStylist(open, close, '', '')
}

dye.strip = (coloredText: string): string => {
    return coloredText.replace(/\x1b\[[^m]+m/g, '')
}

function getStylist(open: TDyeStylist['open'], close: TDyeStylist['close'], prefix: string | (() => string), suffix: string | (() => string)): TDyeStylist {
    const getPrefixAndOpen = (p: string) => p ? p + open : ''
    let staticPrefix = ''
    if (typeof prefix ==='string') {
        staticPrefix = getPrefixAndOpen(prefix)
    }
    const getPrefix = typeof prefix ==='string' ? () => staticPrefix : () => getPrefixAndOpen(prefix())
    const getSuffix = typeof suffix === 'string' ? () => suffix : suffix
    
    const stylist: TDyeStylist = (text: string | number) => {
        const p = getPrefix() || ''
        const s = getSuffix() || ''
        return `${ open }${ p }${ text }${ s }${ close }`
    }
    stylist.open = open 
    stylist.close = close
    stylist.prefix = (v: string | (() => string)) => getStylist(open, close, v, suffix)
    stylist.suffix = (v: string | (() => string)) => getStylist(open, close, prefix, v)
    stylist.attachConsole = (...args: [] | [TConsoleMethodName] | [TConsoleMethodName, TConsoleInterface] | [((...args: TConsoleArgument) => void)]) => {
        const consoleInterface = args[1] || console
        let consoleMethod: (...args: TConsoleArgument) => void
        if (typeof args[0] === 'string' || typeof args[0] === 'undefined') {
            consoleMethod = consoleInterface[args[0] as TConsoleMethodName || 'log']
        } else if (typeof args[0] === 'function') {
            consoleMethod = (args[0] as (...args: TConsoleArgument) => void)
        }
        let enabled = true
        const dyeConsole: TDyeStylistConsole = (...consoleArgs: TConsoleArgument) => {
            if (enabled) {
                const newArgs = consoleArgs.map(a => ([a, open])).flat()
                consoleMethod(open + getPrefix(), ...newArgs, getSuffix() + close)
            }
        }
        dyeConsole.enable = (v = true) => enabled = v
        dyeConsole.disable = () => enabled = false
        return dyeConsole
    }

    return stylist
}

function checkRGBNumber(n: number | string, component: 'r' | 'g' | 'b', limit = 255): number {
    const _n = Number(n)
    if (Number.isNaN(_n)) throw new Error(`[Dye] Color component "${ component }" must be a number. Received "${ n }".`)
    if (_n > limit) throw new Error(`[Dye] Color component "${ component }" must be less than ${ limit + 1 }. Received "${ n }".`)
    return _n
}
