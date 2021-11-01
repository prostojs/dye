// types
type number256 = number
type number6 = number

export type TDyeColor = 'black' | 'red' | 'green' | 'yellow' | 'blue' | 'magenta' | 'cyan' | 'white'
export type TDyeGrayscale = 'gray01' | 'gray02' | 'gray03' | 'gray04' | 'gray05' | 'gray06' | 'gray07' | 'gray08' |
                     'gray09' | 'gray10' | 'gray11' | 'gray12' | 'gray13' | 'gray14' | 'gray15' | 'gray16' |
                     'gray17' | 'gray18' | 'gray19' | 'gray20' | 'gray21' | 'gray22'
export type TDyeColorBright = `${ TDyeColor }-bright`

export type TDyeColorAll = TDyeColor | TDyeColorBright

export type TDyeBgColor = `bg-${ TDyeColorAll }`
export type TDyeBgGrayscale = `bg-${ TDyeGrayscale }`

export type TDyeModifier = 'bold' | 'dim' | 'italic' | 'underscore' | 'inverse' | 'hidden' | 'crossed'

export type TRGBHEX = `#${ string }`
export type TRGBHEXBG = `bg#${ string }`
export type TRGBHEXTypes = TRGBHEX | TRGBHEXBG
export type TRGB = `${ number },${ number },${ number }`
export type TBgRGB = `bg${ number },${ number },${ number }`
export type TRGB256 = `*${ number },${ number },${ number }`
export type TBgRGB256 = `bg*${ number },${ number },${ number }`

export type TRGBTypes = TRGB | TBgRGB | TRGB256 | TBgRGB256

export type TDyeAll = TDyeColorAll | TDyeBgColor | TDyeModifier | TRGBTypes | TRGBHEXTypes | TDyeGrayscale | TDyeBgGrayscale

export interface TDyeStylist<Format extends unknown[] = TConsoleArgument> {
    (...texts: Format): string
    open: string
    close: string
    format: (cb: ((...texts: Format) => string)) => TDyeStylist<Format>
    prefix: (v: string | ((...texts: Format) => string)) => TDyeStylist<Format>
    suffix: (v: string | ((...texts: Format) => string)) => TDyeStylist<Format>
    attachConsole: (...args: [] | [TConsoleMethodName] | [TConsoleMethodName, TConsoleInterface] | [((...args: Format) => void)]) => TDyeStylistConsole<Format>
}

export interface TDyeStylistConsole<Format extends unknown[] = TConsoleArgument> {
    (...args: Format): void;
    enable: (v?: boolean) => void
    disable: () => void
    asStylist: () => TDyeStylist<Format>
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
const enum Codes {
    RESET,
    BOLD,
    DIM,
    ITALIC,
    UNDERSCORE,

    INVERSE = 7,
    HIDDEN,
    CROSSED,

    BOLD_OFF = 22,
    DIM_OFF = 22,
    ITALIC_OFF,
    UNDERSCORE_OFF,
    BLINK_SLOW_OFF,
    BLINK_RAPID_OFF,
    INVERSE_OFF,
    REVEAL,
    CROSSED_OFF,
    
    BLACK,     // 30–37
    RED,
    GREEN,
    YELLOW,
    BLUE,
    MAGENTA,
    CYAN,
    WHITE,
    
    COLORS,     // ESC [ 38 ; N m
    COLOR_OFF,  
    
    BG_BLACK,   
    BG_RED,
    BG_GREEN,
    BG_YELLOW,
    BG_BLUE,
    BG_MAGENTA,
    BG_CYAN,
    BG_WHITE,
    
    BG_COLORS,      // ESC [ 48 ; N m
    BG_COLOR_OFF,   
    
    GRAY01 = 233,   // ESC [ 38 ; N m   -   grayscale
    GRAY02,         // ESC [ 48 ; N m   -   bg grayscale
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

    BLACK_BRIGHT = 90,
    RED_BRIGHT,
    GREEN_BRIGHT,
    YELLOW_BRIGHT,
    BLUE_BRIGHT,
    MAGENTA_BRIGHT,
    CYAN_BRIGHT,
    WHITE_BRIGHT,    
    
    BG_BLACK_BRIGHT = 100,
    BG_RED_BRIGHT,
    BG_GREEN_BRIGHT,
    BG_YELLOW_BRIGHT,
    BG_BLUE_BRIGHT,
    BG_MAGENTA_BRIGHT,
    BG_CYAN_BRIGHT,
    BG_WHITE_BRIGHT,
}

const BG_OFFSET = 10

const plain     = (...n: Codes[]) => `\x1b[${ n.join(';') }m`
const gray      = (n: Codes) => `\x1b[38;5;${ n }m`
const bgGray    = (n: Codes) => `\x1b[48;5;${ n }m`
const rgb256    = (r: number6, g: number6, b: number6, bg = false) => `\x1b[${ 38 + Number(bg) * BG_OFFSET };5;${ 16 + r * 36 + g * 6 + b }m`
const tcRGB     = (r: number256, g: number256, b: number256, bg = false) => `\x1b[${ 38 + Number(bg) * BG_OFFSET };2;${ r };${ g };${ b }m`

const colors: Record<TDyeColorAll, Codes> = {
    black:      Codes.BLACK,
    red:        Codes.RED,
    green:      Codes.GREEN,
    yellow:     Codes.YELLOW,
    blue:       Codes.BLUE,
    magenta:    Codes.MAGENTA,
    cyan:       Codes.CYAN,
    white:      Codes.WHITE,

    'black-bright':      Codes.BLACK_BRIGHT,
    'red-bright':        Codes.RED_BRIGHT,
    'green-bright':      Codes.GREEN_BRIGHT,
    'yellow-bright':     Codes.YELLOW_BRIGHT,
    'blue-bright':       Codes.BLUE_BRIGHT,
    'magenta-bright':    Codes.MAGENTA_BRIGHT,
    'cyan-bright':       Codes.CYAN_BRIGHT,
    'white-bright':      Codes.WHITE_BRIGHT,
}

const grayColors: Record<TDyeGrayscale, number> = {
    gray01:     Codes.GRAY01,
    gray02:     Codes.GRAY02,
    gray03:     Codes.GRAY03,
    gray04:     Codes.GRAY04,
    gray05:     Codes.GRAY05,
    gray06:     Codes.GRAY06,
    gray07:     Codes.GRAY07,
    gray08:     Codes.GRAY08,
    gray09:     Codes.GRAY09,
    gray10:     Codes.GRAY10,
    gray11:     Codes.GRAY11,
    gray12:     Codes.GRAY12,
    gray13:     Codes.GRAY13,
    gray14:     Codes.GRAY14,
    gray15:     Codes.GRAY15,
    gray16:     Codes.GRAY16,
    gray17:     Codes.GRAY17,
    gray18:     Codes.GRAY18,
    gray19:     Codes.GRAY19,
    gray20:     Codes.GRAY20,
    gray21:     Codes.GRAY21,
    gray22:     Codes.GRAY22,
}

const bgGrayColors: Record<TDyeBgGrayscale, number> = {
    'bg-gray01':     Codes.GRAY01,
    'bg-gray02':     Codes.GRAY02,
    'bg-gray03':     Codes.GRAY03,
    'bg-gray04':     Codes.GRAY04,
    'bg-gray05':     Codes.GRAY05,
    'bg-gray06':     Codes.GRAY06,
    'bg-gray07':     Codes.GRAY07,
    'bg-gray08':     Codes.GRAY08,
    'bg-gray09':     Codes.GRAY09,
    'bg-gray10':     Codes.GRAY10,
    'bg-gray11':     Codes.GRAY11,
    'bg-gray12':     Codes.GRAY12,
    'bg-gray13':     Codes.GRAY13,
    'bg-gray14':     Codes.GRAY14,
    'bg-gray15':     Codes.GRAY15,
    'bg-gray16':     Codes.GRAY16,
    'bg-gray17':     Codes.GRAY17,
    'bg-gray18':     Codes.GRAY18,
    'bg-gray19':     Codes.GRAY19,
    'bg-gray20':     Codes.GRAY20,
    'bg-gray21':     Codes.GRAY21,
    'bg-gray22':     Codes.GRAY22,
}

const bgColors: Record<TDyeBgColor, number> = {
    'bg-black':      Codes.BG_BLACK,
    'bg-red':        Codes.BG_RED,
    'bg-green':      Codes.BG_GREEN,
    'bg-yellow':     Codes.BG_YELLOW,
    'bg-blue':       Codes.BG_BLUE,
    'bg-magenta':    Codes.BG_MAGENTA,
    'bg-cyan':       Codes.BG_CYAN,
    'bg-white':      Codes.BG_WHITE,

    'bg-black-bright':      Codes.BG_BLACK_BRIGHT,
    'bg-red-bright':        Codes.BG_RED_BRIGHT,
    'bg-green-bright':      Codes.BG_GREEN_BRIGHT,
    'bg-yellow-bright':     Codes.BG_YELLOW_BRIGHT,
    'bg-blue-bright':       Codes.BG_BLUE_BRIGHT,
    'bg-magenta-bright':    Codes.BG_MAGENTA_BRIGHT,
    'bg-cyan-bright':       Codes.BG_CYAN_BRIGHT,
    'bg-white-bright':      Codes.BG_WHITE_BRIGHT,
}

const modifiers: Record<TDyeModifier, number> = {
    bold: Codes.BOLD,
    dim: Codes.DIM,
    italic: Codes.ITALIC,
    underscore: Codes.UNDERSCORE,
    inverse: Codes.INVERSE,
    hidden: Codes.HIDDEN,
    crossed: Codes.CROSSED,
}

const modifiersClose: Record<TDyeModifier | 'color' | 'bg-color', number> = {
    color: Codes.COLOR_OFF,
    'bg-color': Codes.BG_COLOR_OFF,
    bold: Codes.BOLD_OFF,
    dim: Codes.DIM_OFF,
    italic: Codes.ITALIC_OFF,
    underscore: Codes.UNDERSCORE_OFF,
    inverse: Codes.INVERSE_OFF,
    hidden: Codes.REVEAL,
    crossed: Codes.CROSSED_OFF,
}

// implementation
export function dye<Format extends unknown[] = TConsoleArgument>(...args: TDyeAll[]): TDyeStylist<Format> {   
    const openStack:  (string | number)[] = []
    const openColorsStack:  (string | number)[] = []
    const openBgColorsStack:  (string | number)[] = []
    const openModifiersStack:  (string | number)[] = []
    const closeModifiers: Record<number, boolean> = {}

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
                    openStack.push(tcRGB(r, g, b, bg))
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
                        openStack.push(rgb256(r, g, b, bg))
                    } else {
                        r = checkRGBNumber(r.trim(), 'r', 255)
                        g = checkRGBNumber(g, 'g', 255)
                        b = checkRGBNumber(b, 'b', 255)
                        openStack.push(tcRGB(r, g, b, bg))
                    }
                }
                if (bg) {
                    closeModifiers[Codes.BG_COLOR_OFF] = true
                    openBgColorsStack.push(openStack[openStack.length - 1])
                } else {
                    closeModifiers[Codes.COLOR_OFF] = true
                    openColorsStack.push(openStack[openStack.length - 1])
                }
            } else if (colors[c as TDyeColor]) {
                openStack.push(colors[c as TDyeColor])
                closeModifiers[Codes.COLOR_OFF] = true
                openColorsStack.push(openStack[openStack.length - 1])
            } else if (bgColors[c as TDyeBgColor]) {
                openStack.push(bgColors[c as TDyeBgColor])
                closeModifiers[Codes.BG_COLOR_OFF] = true
                openBgColorsStack.push(openStack[openStack.length - 1])
            } else if (modifiers[c as TDyeModifier]) {
                openStack.push(modifiers[c as TDyeModifier])
                closeModifiers[modifiersClose[c as TDyeModifier]] = true
                openModifiersStack.push(openStack[openStack.length - 1])
            } else if (grayColors[c as TDyeGrayscale]) {
                openStack.push(gray(grayColors[c as TDyeGrayscale]))
                closeModifiers[Codes.COLOR_OFF] = true
                openColorsStack.push(openStack[openStack.length - 1])
            } else if (bgGrayColors[c as TDyeBgGrayscale]) {
                openStack.push(bgGray(bgGrayColors[c as TDyeBgGrayscale]))
                closeModifiers[Codes.BG_COLOR_OFF] = true
                openBgColorsStack.push(openStack[openStack.length - 1])
            } else {
                throw new Error(`[Dye] Color or modifier "${ c }" is not supported.`)
            }
        }
    }
    function collapseStack(stack: (number | string)[]): string {
        let modStack = []
        let result = ''
        for (let i = 0; i < stack.length; i++) {
            const modifier = stack[i]
            if (typeof modifier === 'number') {
                modStack.push(modifier)
            } else {
                if (modStack.length) {
                    result += plain(...modStack)
                    modStack = []
                }
                result += modifier
            }
        }
        if (modStack.length) {
            result += plain(...modStack)
            modStack = []
        }
        return result
    }

    const open = collapseStack(openStack)
    const openColors = collapseStack(openColorsStack)
    const openBgColors = collapseStack(openBgColorsStack)
    const openModifiers = collapseStack(openModifiersStack)

    const closingCodes: Codes[] = Object.keys(closeModifiers) as unknown as Codes[]
    const close = closingCodes.length ? plain(...closingCodes) : ''
    return getStylist<Format>(open, close, '', '', {
        openColors,
        openBgColors,
        openModifiers,
    })
}

dye.strip = (coloredText: string): string => {
    return coloredText.replace(/\x1b\[[^m]+m/g, '')
}

dye.reset = plain(Codes.RESET)
dye.bold_off = plain(Codes.BOLD_OFF)
dye.dim_off = plain(Codes.DIM_OFF)
dye.italic_off = plain(Codes.ITALIC_OFF)
dye.underscore_off = plain(Codes.UNDERSCORE_OFF)
dye.blink_slow_off = plain(Codes.BLINK_SLOW_OFF)
dye.blink_rapid_off = plain(Codes.BLINK_RAPID_OFF)
dye.inverse_off = plain(Codes.INVERSE_OFF)
dye.reveal = plain(Codes.REVEAL)
dye.crossed_off = plain(Codes.CROSSED_OFF)

interface OpenParts {
    openColors: string
    openBgColors: string
    openModifiers: string
}

function getStylist<Format extends unknown[] = TConsoleArgument>(
    open: TDyeStylist['open'],
    close: TDyeStylist['close'],
    prefix: string | ((...texts: Format) => string),
    suffix: string | ((...texts: Format) => string),
    parts: OpenParts,
    format?: ((...texts: Format) => string),
): TDyeStylist<Format> {
    const resetOpen = dye.reset + open

    const getPrefix = (...texts: Format) => {
        const v = typeof prefix === 'string' ? prefix : prefix(...texts)
        return v ? open + v : ''
    }
    const getSuffix = (...texts: Format) => {
        const v = typeof suffix === 'string' ? suffix : suffix(...texts)
        return (v ? open + v : '') + close
    }
    
    const formatDefault = (...texts: Format): string => texts.map(t => String(t)).join(' ')

    const stylist: TDyeStylist<Format> = (...texts: Format) => {
        const p = getPrefix(...texts) || ''
        const s = getSuffix(...texts) || ''
        const text = format ? format(...texts) : formatDefault(...texts)
        return `${ p }${ open }${ sanitizeString(text, parts) }${ s }`
    }
    stylist.open = open 
    stylist.close = close
    stylist.format = (cb: ((...texts: Format) => string)) => getStylist<Format>(open, close, prefix, suffix, parts, cb)
    stylist.prefix = (v: string | (() => string)) => getStylist<Format>(open, close, v, suffix, parts, format)
    stylist.suffix = (v: string | (() => string)) => getStylist<Format>(open, close, prefix, v, parts, format)
    stylist.attachConsole = (...args: [] | [TConsoleMethodName] | [TConsoleMethodName, TConsoleInterface] | [((...args: Format) => void)]) => {
        const consoleInterface = args[1] || console
        let consoleMethod: (...args: TConsoleArgument) => void
        if (typeof args[0] === 'string' || typeof args[0] === 'undefined') {
            consoleMethod = consoleInterface[args[0] as TConsoleMethodName || 'log']
        } else if (typeof args[0] === 'function') {
            consoleMethod = (args[0] as (...args: TConsoleArgument) => void)
        }
        let enabled = true
        const dyeConsole: TDyeStylistConsole<Format> = (...consoleArgs: Format) => {
            if (enabled) {
                const p = getPrefix(...consoleArgs)
                const s = getSuffix(...consoleArgs)
                const start = p ? dye.reset + p : ''
                const end = s === close ? dye.reset : dye.reset + s
                if (format) {
                    consoleMethod(start + resetOpen + format(...consoleArgs) + end)
                }  else {
                    let first = ''
                    if (typeof consoleArgs[0] === 'string' || typeof consoleArgs[0] === 'number') {
                        first = resetOpen + sanitizeString(String(consoleArgs.shift()), parts)
                    }
                    let last = ''
                    if (typeof consoleArgs[consoleArgs.length - 1] === 'string') {
                        last = resetOpen + sanitizeString((consoleArgs.pop() as string), parts)
                    }
                    const newArgs = consoleArgs.map(a => {
                        if (typeof a === 'string') {
                            return resetOpen + sanitizeString(a, parts)
                        } else if (typeof a === 'number') {
                            return resetOpen + a.toString()
                        } else {
                            return [dye.reset, a]
                        }
                    }).flat()
                    if (newArgs.length) {
                        consoleMethod(...[start + first, ...newArgs, last + end].filter(e => typeof e !== 'string' || !!e))
                    } else {
                        consoleMethod(start + first + last + end)
                    }
                }
            }
        }
        dyeConsole.enable = (v = true) => enabled = v
        dyeConsole.disable = () => enabled = false
        dyeConsole.asStylist = () => stylist
        return dyeConsole
    }

    return stylist
}

function sanitizeString(source: string, parts: OpenParts): string {
    let result = source
    if (parts.openColors) {
        result = result.replace(/(\x1b\[[\d;]*39[\d;]*m)/g, '$1' + parts.openColors)
    }
    if (parts.openBgColors) {
        result = result.replace(/(\x1b\[[\d;]*49[\d;]*m)/g, '$1' + parts.openBgColors)
    }
    if (parts.openModifiers) {
        result = result.replace(/(\x1b\[(?:22|23|24)m)/g, '$1' + parts.openModifiers)
    }
    return result
}

function checkRGBNumber(n: number | string, component: 'r' | 'g' | 'b', limit = 255): number {
    const _n = Number(n)
    if (Number.isNaN(_n)) throw new Error(`[Dye] Color component "${ component }" must be a number. Received "${ n }".`)
    if (_n > limit) throw new Error(`[Dye] Color component "${ component }" must be less than ${ limit + 1 }. Received "${ n }".`)
    return _n
}
