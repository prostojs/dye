export type TDyeColor = 'black' | 'red' | 'green' | 'yellow' | 'blue' | 'magenta' | 'cyan' | 'white';
export type TDyeGrayscale = 'gray01' | 'gray02' | 'gray03' | 'gray04' | 'gray05' | 'gray06' | 'gray07' | 'gray08' | 'gray09' | 'gray10' | 'gray11' | 'gray12' | 'gray13' | 'gray14' | 'gray15' | 'gray16' | 'gray17' | 'gray18' | 'gray19' | 'gray20' | 'gray21' | 'gray22';
export type TDyeColorBright = `${TDyeColor}-bright`;
export type TDyeColorAll = TDyeColor | TDyeColorBright;
export type TDyeBgColor = `bg-${TDyeColorAll}`;
export type TDyeBgGrayscale = `bg-${TDyeGrayscale}`;
export type TDyeModifier = 'bold' | 'dim' | 'italic' | 'underscore' | 'inverse' | 'hidden' | 'crossed';
export type TRGBHEX = `#${string}`;
export type TRGBHEXBG = `bg#${string}`;
export type TRGBHEXTypes = TRGBHEX | TRGBHEXBG;
export type TRGB = `${number},${number},${number}`;
export type TBgRGB = `bg${number},${number},${number}`;
export type TRGB256 = `*${number},${number},${number}`;
export type TBgRGB256 = `bg*${number},${number},${number}`;
export type TRGBTypes = TRGB | TBgRGB | TRGB256 | TBgRGB256;
export type TDyeAll = TDyeColorAll | TDyeBgColor | TDyeModifier | TRGBTypes | TRGBHEXTypes | TDyeGrayscale | TDyeBgGrayscale;
export interface TDyeStylist<Format extends unknown[] = TConsoleArgument> {
    (...texts: Format): string;
    open: string;
    close: string;
    format: (cb: (...texts: Format) => string) => TDyeStylist<Format>;
    prefix: (v: string | ((...texts: Format) => string)) => TDyeStylist<Format>;
    suffix: (v: string | ((...texts: Format) => string)) => TDyeStylist<Format>;
    attachConsole: (...args: [] | [TConsoleMethodName] | [TConsoleMethodName, TConsoleInterface] | [(...args: Format) => void]) => TDyeStylistConsole<Format>;
}
export interface TDyeStylistConsole<Format extends unknown[] = TConsoleArgument> {
    (...args: Format): void;
    enable: (v?: boolean) => void;
    disable: () => void;
    asStylist: () => TDyeStylist<Format>;
}
export type TConsoleMethodName = 'info' | 'log' | 'warn' | 'error' | 'debug';
export type TConsoleArgument = Array<string | number | Error | Record<string, unknown> | unknown>;
export interface TConsoleInterface {
    log: (...args: TConsoleArgument) => void;
    info: (...args: TConsoleArgument) => void;
    debug: (...args: TConsoleArgument) => void;
    warn: (...args: TConsoleArgument) => void;
    error: (...args: TConsoleArgument) => void;
}
type DyeFunction<Format extends unknown[] = TConsoleArgument> = (<F extends unknown[] = Format>(...args: TDyeAll[]) => TDyeStylist<F>) & {
    strip: (coloredText: string) => string;
    reset: string;
    bold_off: string;
    dim_off: string;
    italic_off: string;
    underscore_off: string;
    blink_slow_off: string;
    blink_rapid_off: string;
    inverse_off: string;
    reveal: string;
    crossed_off: string;
};
export declare const dye: DyeFunction;
export {};
