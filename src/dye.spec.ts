import { describe, expect, it, vi } from 'vitest'

import type { TDyeBgColor, TDyeBgGrayscale, TDyeColorAll, TDyeGrayscale, TDyeModifier } from '.'
import { dye } from '.'

describe('dye', () => {
  it('must apply correct plain modifier', () => {
    expect(dye('red').open.replace(/\x1B/gu, '')).toEqual('[31m')
    expect(dye('bg-red').open.replace(/\x1B/gu, '')).toEqual('[41m')
    expect(dye('bold').open.replace(/\x1B/gu, '')).toEqual('[1m')
  })
  it('must collapse plain modifiers', () => {
    expect(dye('bold', 'white', 'bg-red').open.replace(/\x1B/gu, '')).toEqual('[1;37;41m')
  })
  it('must collapse plain and advanced modifiers', () => {
    expect(dye('bold', 'bg-blue', '255,0,0').open.replace(/\x1B/gu, '')).toEqual(
      '[1;44m[38;2;255;0;0m'
    )
    expect(dye('255,0,0', 'bold', 'bg-blue').open.replace(/\x1B/gu, '')).toEqual(
      '[38;2;255;0;0m[1;44m'
    )
    expect(dye('bold', '255,0,0', 'bg-blue').open.replace(/\x1B/gu, '')).toEqual(
      '[1m[38;2;255;0;0m[44m'
    )
  })
  it('must work plain colors', () => {
    const tests: Array<TDyeColorAll | TDyeBgColor> = [
      'black',
      'bg-black',
      'black-bright',
      'bg-black-bright',
      'red',
      'bg-red',
      'red-bright',
      'bg-red-bright',
      'green',
      'bg-green',
      'green-bright',
      'bg-green-bright',
      'yellow',
      'bg-yellow',
      'yellow-bright',
      'bg-yellow-bright',
      'blue',
      'bg-blue',
      'blue-bright',
      'bg-blue-bright',
      'magenta',
      'bg-magenta',
      'magenta-bright',
      'bg-magenta-bright',
      'cyan',
      'bg-cyan',
      'cyan-bright',
      'bg-cyan-bright',
      'white',
      'bg-white',
      'white-bright',
      'bg-white-bright',
    ]
    tests.forEach(test => {
      const style = dye(test)
      const result = style('TEXT')
      expect(result).toBeDefined()
      expect(result).toEqual(`${style.open}TEXT${style.close}`)
    })
  })

  it('must work with grayscale', () => {
    const tests: Array<TDyeGrayscale | TDyeBgGrayscale> = [
      'gray01',
      'bg-gray01',
      'gray02',
      'bg-gray02',
      'gray03',
      'bg-gray03',
      'gray04',
      'bg-gray04',
      'gray05',
      'bg-gray05',
      'gray06',
      'bg-gray06',
      'gray07',
      'bg-gray07',
      'gray08',
      'bg-gray08',
      'gray09',
      'bg-gray09',
      'gray10',
      'bg-gray10',
      'gray11',
      'bg-gray11',
      'gray12',
      'bg-gray12',
      'gray13',
      'bg-gray13',
      'gray14',
      'bg-gray14',
      'gray15',
      'bg-gray15',
      'gray16',
      'bg-gray16',
      'gray17',
      'bg-gray17',
      'gray18',
      'bg-gray18',
      'gray19',
      'bg-gray19',
      'gray20',
      'bg-gray20',
      'gray21',
      'bg-gray21',
      'gray22',
      'bg-gray22',
    ]
    tests.forEach(test => {
      const style = dye(test)
      const result = style('TEXT')
      expect(result).toBeDefined()
      expect(result).toEqual(`${style.open}TEXT${style.close}`)
    })
  })
  it('must work with modifiers', () => {
    const tests: TDyeModifier[] = [
      'bold',
      'dim',
      'italic',
      'underscore',
      'inverse',
      'hidden',
      'crossed',
    ]
    tests.forEach(test => {
      const style = dye(test)
      const result = style('TEXT')
      expect(result).toBeDefined()
      expect(result).toEqual(`${style.open}TEXT${style.close}`)
    })
  })

  it('must strip styles', () => {
    const result = dye('dim', 'red')('TEXT')
    expect(dye.strip(result)).toEqual('TEXT')
  })

  it('must add prefix', () => {
    const style = dye('cyan').prefix('[prefix]')
    expect(style('TEXT').startsWith('\u001B[36m[prefix]\u001B[36m')).toBeTruthy()
  })

  it('must add suffix', () => {
    const style = dye('cyan').suffix('[suffix]')
    expect(style('TEXT').endsWith('[suffix]\u001B[39m')).toBeTruthy()
  })

  it('must add dynamic prefix', () => {
    let n = 0
    const style = dye('cyan').prefix(() => String(n++))
    expect(style('TEXT').startsWith('\u001B[36m0\u001B[36m')).toBeTruthy()
    expect(style('TEXT').startsWith('\u001B[36m1\u001B[36m')).toBeTruthy()
    expect(style('TEXT').startsWith('\u001B[36m2\u001B[36m')).toBeTruthy()
  })

  it('must add dynamic suffix', () => {
    let n = 0
    const style = dye('cyan').suffix(() => String(n++))
    expect(style('TEXT').endsWith('0\u001B[39m')).toBeTruthy()
    expect(style('TEXT').endsWith('1\u001B[39m')).toBeTruthy()
    expect(style('TEXT').endsWith('2\u001B[39m')).toBeTruthy()
  })

  it('must attach console', () => {
    const c = {
      log: vi.fn(),
      info: vi.fn(),
      debug: vi.fn(),
      warn: vi.fn(),
      error: vi.fn(),
    }
    const style = dye('cyan')
    const log = style.attachConsole('log', c)
    const info = style.attachConsole('info', c)
    const debug = style.attachConsole('debug', c)
    const warn = style.attachConsole('warn', c)
    const error = style.attachConsole('error', c)
    const spy = vi.spyOn(console, 'log')
    const realconsole = style.attachConsole()
    const callFunc = vi.fn()
    const func = style.attachConsole(callFunc)
    log('log test')
    info('info test')
    debug('debug test')
    warn('warn test')
    error('error test')
    realconsole('real console test')
    func('func test')
    const resetOpen = dye.reset + style.open
    expect(c.log).toBeCalledWith(`${resetOpen}log test${dye.reset}`)
    expect(c.info).toBeCalledWith(`${resetOpen}info test${dye.reset}`)
    expect(c.debug).toBeCalledWith(`${resetOpen}debug test${dye.reset}`)
    expect(c.warn).toBeCalledWith(`${resetOpen}warn test${dye.reset}`)
    expect(c.error).toBeCalledWith(`${resetOpen}error test${dye.reset}`)
    expect(spy).toBeCalledWith(`${resetOpen}real console test${dye.reset}`)
    expect(callFunc).toBeCalledWith(`${resetOpen}func test${dye.reset}`)
  })

  it('must handle multiple arguments on console', () => {
    const c = {
      log: vi.fn(),
      info: vi.fn(),
      debug: vi.fn(),
      warn: vi.fn(),
      error: vi.fn(),
    }
    const style = dye('cyan')
    const log = style.attachConsole('log', c)
    const info = style.attachConsole('info', c)
    const debug = style.attachConsole('debug', c)
    const resetOpen = dye.reset + style.open
    log('arg1', 'arg2', 'arg3')
    info('arg1', 1, true, 'arg3')
    debug([1, 2, 3], [3, 4, 5])
    expect(c.log).toBeCalledWith(
      `${resetOpen}arg1`,
      '\u001B[0m\u001B[36marg2',
      `${resetOpen}arg3${dye.reset}`
    )
    expect(c.info).toBeCalledWith(
      `${resetOpen}arg1`,
      `${resetOpen}1`,
      dye.reset,
      true,
      `${resetOpen}arg3${dye.reset}`
    )
    expect(c.debug).toBeCalledWith(dye.reset, [1, 2, 3], dye.reset, [3, 4, 5], dye.reset)
  })

  it('must enable/disable console', () => {
    const style = dye('cyan')
    const c = {
      log: vi.fn(),
      info: vi.fn(),
      debug: vi.fn(),
      warn: vi.fn(),
      error: vi.fn(),
    }
    const log = style.attachConsole('log', c)
    log.disable()
    log('log test')
    expect(c.log).toBeCalledTimes(0)
    log.enable()
    log('log test')
    expect(c.log).toBeCalledTimes(1)
  })

  it('must return stylist', () => {
    const style = dye('cyan')
    const log = style.attachConsole('log')
    const st = log.asStylist()
    expect(st).toBeDefined()
    expect(st('test')).toEqual('\u001B[36mtest\u001B[39m')
  })

  it('must throw error on wrong value', () => {
    expect(() => {
      dye('BOLD' as 'bold')
    }).toThrowError()
    expect(() => {
      dye('260,200,200')
    }).toThrowError()
    expect(() => {
      dye('*5,6,1')
    }).toThrowError()
    expect(() => {
      dye('#f')
    }).toThrowError()
    expect(() => {
      dye('#ffff')
    }).toThrowError()
    expect(() => {
      dye('#ffffa')
    }).toThrowError()
    expect(() => {
      dye('#ffffaaa')
    }).toThrowError()
    expect(() => {
      dye('#rtt')
    }).toThrowError()
    expect(() => {
      dye('20,22q,13' as 'bold')
    }).toThrowError()
  })

  it('must process true color', () => {
    const style = dye('255,100,50')
    expect(style('test')).toEqual(expect.stringMatching(/^\x1B\[38;2;255;100;50mtest\x1B\[39m$/u))
  })

  it('must process true color BG', () => {
    const style = dye('bg255,100,50')
    expect(style('test')).toEqual(expect.stringMatching(/^\x1B\[48;2;255;100;50mtest\x1B\[49m$/u))
  })

  it('must process true color (HEX)', () => {
    const style = dye('#FF6432')
    expect(style('test')).toEqual(expect.stringMatching(/^\x1B\[38;2;255;100;50mtest\x1B\[39m$/u))
  })

  it('must process true color BG (HEX)', () => {
    const style = dye('bg#FF6432')
    expect(style('test')).toEqual(expect.stringMatching(/^\x1B\[48;2;255;100;50mtest\x1B\[49m$/u))
  })

  it('must process true color (HEX3)', () => {
    const style = dye('#FA2')
    expect(style('test')).toEqual(expect.stringMatching(/^\x1B\[38;2;255;170;34mtest\x1B\[39m$/u))
  })

  it('must process true color BG (HEX3)', () => {
    const style = dye('bg#fff')
    expect(style('test')).toEqual(expect.stringMatching(/^\x1B\[48;2;255;255;255mtest\x1B\[49m$/u))
  })

  it('must process 256 color', () => {
    const style = dye('*5,2,0')
    expect(style('test')).toEqual(expect.stringMatching(/^\x1B\[38;5;208mtest\x1B\[39m$/u))
  })

  it('must process 256 color BG', () => {
    const style = dye('bg*5,2,0')
    expect(style('test')).toMatch('\u001B[48;5;208mtest\u001B[49m')
  })

  it('must apply format', () => {
    type Format = [string, number]
    const style = dye<Format>('bg*5,2,0').format((s, n) => s.repeat(n))
    expect(style('test', 5)).toMatch(`\u001B[48;5;208m${'test'.repeat(5)}\u001B[49m`)
  })

  it('must apply format in console', () => {
    type Format = [string, number]
    const style = dye<Format>('bg*5,2,0').format((s, n) => s.repeat(n))
    const c = {
      log: vi.fn(),
      info: vi.fn(),
      debug: vi.fn(),
      warn: vi.fn(),
      error: vi.fn(),
    }
    const log = style.attachConsole('log', c)
    log('log', 2)
    expect(c.log).toHaveBeenCalledWith(`${dye.reset + style.open}loglog${dye.reset}`)
  })

  it('must preserve colors', () => {
    const style = dye('blue', 'bg-white', 'bold')
    const result = style(
      `Test phrase ${dye('red')('with')} ${dye('bold')('more')} colors!`
    ).replace(/\x1B/gu, '')
    expect(result).toEqual('[34;47;1mTest phrase [31mwith[39m[34m [1mmore[22m[1m colors![22;39;49m')
  })
  it('must preserve colors 2', () => {
    const red = dye('red', 'bg-blue')
    const green = dye('green')
    const bold = dye('bold')
    const style = dye('blue', 'bg-black', 'bold')
    const result = style(
      // eslint-disable-next-line sonarjs/no-nested-template-literals
      `Test phrase ${red(`with ${green('123456')}${bold(' more')}`)} colors!`
    ).replace(/\x1B/gu, '')
    expect(result).toEqual(
      '[34;40;1mTest phrase [31;44mwith [32m123456[39m[34m[31m[1m more[22m[1m[39;49m[40m[34m colors![22;39;49m'
    )
  })
  it('must preserve colors in console', () => {
    const style = dye('blue', 'bg-white', 'bold')
    const c = {
      log: vi.fn(),
      info: vi.fn(),
      debug: vi.fn(),
      warn: vi.fn(),
      error: vi.fn(),
    }
    const log = style.attachConsole('log', c)
    log(`Test phrase ${dye('red')('with')} ${dye('bold')('more')} colors!`)
    expect(c.log).toHaveBeenCalledWith(
      `${dye.reset}\u001B[34;47;1mTest phrase \u001B[31mwith\u001B[39m\u001B[34m \u001B[1mmore\u001B[22m\u001B[1m colors!${dye.reset}`
    )
  })
})
