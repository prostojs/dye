import { dye, TDyeBgColor, TDyeColorAll, TDyeModifier } from './index'
describe('dye', () => {
    it('must work plain colors', () => {
        const tests: (TDyeColorAll | TDyeBgColor)[] = [
            'black', 'bg-black', 'black-bright', 'bg-black-bright',
            'red', 'bg-red', 'red-bright', 'bg-red-bright',
            'green', 'bg-green', 'green-bright', 'bg-green-bright',
            'yellow', 'bg-yellow', 'yellow-bright', 'bg-yellow-bright',
            'blue', 'bg-blue', 'blue-bright', 'bg-blue-bright',
            'magenta', 'bg-magenta', 'magenta-bright', 'bg-magenta-bright',
            'cyan', 'bg-cyan', 'cyan-bright', 'bg-cyan-bright',
            'white', 'bg-white', 'white-bright', 'bg-white-bright',
        ]
        tests.forEach(test => {
            const style = dye(test)
            const result = style('TEXT')
            expect(result).toBeDefined()
            expect(/^\x1b\[\d\d\d?mTEXT/.test(result)).toBeTruthy()
            expect(/TEXT\x1b\[[34]9m$/.test(result)).toBeTruthy()
            expect(result.indexOf(style.open)).toEqual(0)
            expect(result.indexOf(style.close)).toBeGreaterThan(6)
        })
    })

    it('must work with grayscale', () => {
        const tests: (TDyeColorAll | TDyeBgColor)[] = [
            'gray01', 'bg-gray01',
            'gray02', 'bg-gray02',
            'gray03', 'bg-gray03',
            'gray04', 'bg-gray04',
            'gray05', 'bg-gray05',
            'gray06', 'bg-gray06',
            'gray07', 'bg-gray07',
            'gray08', 'bg-gray08',
            'gray09', 'bg-gray09',
            'gray10', 'bg-gray10',
            'gray11', 'bg-gray11',
            'gray12', 'bg-gray12',
            'gray13', 'bg-gray13',
            'gray14', 'bg-gray14',
            'gray15', 'bg-gray15',
            'gray16', 'bg-gray16',
            'gray17', 'bg-gray17',
            'gray18', 'bg-gray18',
            'gray19', 'bg-gray19',
            'gray20', 'bg-gray20',
            'gray21', 'bg-gray21',
            'gray22', 'bg-gray22',
        ]
        tests.forEach(test => {
            const style = dye(test)
            const result = style('TEXT')
            expect(result).toBeDefined()
            expect(/^\x1b\[\d\d;5;\d\d\dmTEXT/.test(result)).toBeTruthy()
            expect(/TEXT\x1b\[[34]9m$/.test(result)).toBeTruthy()
            expect(result.indexOf(style.open)).toEqual(0)
            expect(result.indexOf(style.close)).toBeGreaterThan(6)
        })
    })
    it('must work with modifiers', () => {
        const tests: (TDyeModifier)[] = [
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
            expect(/^\x1b\[\dmTEXT/.test(result)).toBeTruthy()
            expect(/TEXT\x1b\[[2]\dm$/.test(result)).toBeTruthy()
            expect(result.indexOf(style.open)).toEqual(0)
            expect(result.indexOf(style.close)).toBeGreaterThan(6)
        })
    })

    it('must strip styles', () => {
        const result = dye('dim', 'red')('TEXT')
        expect(dye.strip(result)).toEqual('TEXT')
    })

    it('must add prefix', () => {
        const style = dye('cyan').prefix('[prefix]')
        expect(style('TEXT').startsWith('\x1b[36m[prefix]\x1b[36m')).toBeTruthy()
    })

    it('must add suffix', () => {
        const style = dye('cyan').suffix('[suffix]')
        expect(style('TEXT').endsWith('[suffix]\x1b[39m')).toBeTruthy()
    })

    it('must add dynamic prefix', () => {
        let n = 0
        const style = dye('cyan').prefix(() => String(n++))
        expect(style('TEXT').startsWith('\x1b[36m0\x1b[36m')).toBeTruthy()
        expect(style('TEXT').startsWith('\x1b[36m1\x1b[36m')).toBeTruthy()
        expect(style('TEXT').startsWith('\x1b[36m2\x1b[36m')).toBeTruthy()
    })

    it('must add dynamic suffix', () => {
        let n = 0
        const style = dye('cyan').suffix(() => String(n++))
        expect(style('TEXT').endsWith('0\x1b[39m')).toBeTruthy()
        expect(style('TEXT').endsWith('1\x1b[39m')).toBeTruthy()
        expect(style('TEXT').endsWith('2\x1b[39m')).toBeTruthy()
    })

    it('must attach console', () => {
        const c = {
            log: jest.fn(),
            info: jest.fn(),
            debug: jest.fn(),
            warn: jest.fn(),
            error: jest.fn(),
        }
        const style = dye('cyan')
        const log = style.attachConsole('log', c)
        const info = style.attachConsole('info', c)
        const debug = style.attachConsole('debug', c)
        const warn = style.attachConsole('warn', c)
        const error = style.attachConsole('error', c)
        const spy = jest.spyOn(console, 'log')
        const realconsole = style.attachConsole()
        const callFunc = jest.fn()
        const func = style.attachConsole(callFunc)
        log('log test')
        info('info test')
        debug('debug test')
        warn('warn test')
        error('error test')
        realconsole('real console test')
        func('func test')
        expect(c.log).toBeCalledWith(style.open, 'log test', style.open, style.close)
        expect(c.info).toBeCalledWith(style.open, 'info test', style.open, style.close)
        expect(c.debug).toBeCalledWith(style.open, 'debug test', style.open, style.close)
        expect(c.warn).toBeCalledWith(style.open, 'warn test', style.open, style.close)
        expect(c.error).toBeCalledWith(style.open, 'error test', style.open, style.close)
        expect(spy).toBeCalledWith(style.open, expect.stringMatching(/real\sconsole\stest/), expect.stringContaining(style.open), expect.stringContaining(style.close))
        expect(callFunc).toBeCalledWith(style.open, 'func test', style.open, style.close)
    })

    it('must enable/disable console', () => {
        const style = dye('cyan')
        const c = {
            log: jest.fn(),
            info: jest.fn(),
            debug: jest.fn(),
            warn: jest.fn(),
            error: jest.fn(),
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
        expect(st('test')).toEqual('\x1b[36mtest\x1b[39m')
    })

    it('must throw error on wrong value', () => {
        expect(() => { dye('BOLD' as 'bold') }).toThrowError()
        expect(() => { dye('260,200,200') }).toThrowError()
        expect(() => { dye('*5,6,1') }).toThrowError()
        expect(() => { dye('#f') }).toThrowError()
        expect(() => { dye('#ffff') }).toThrowError()
        expect(() => { dye('#ffffa') }).toThrowError()
        expect(() => { dye('#ffffaaa') }).toThrowError()
        expect(() => { dye('#rtt') }).toThrowError()
        expect(() => { dye('20,22q,13' as 'bold') }).toThrowError()
    })

    it('must process true color', () => {
        const style = dye('255,100,50')
        expect(style('test')).toEqual(expect.stringMatching(/^\x1b\[38;2;255;100;50mtest\x1b\[39m$/))
    })

    it('must process true color BG', () => {
        const style = dye('bg255,100,50')
        expect(style('test')).toEqual(expect.stringMatching(/^\x1b\[48;2;255;100;50mtest\x1b\[49m$/))
    })

    it('must process true color (HEX)', () => {
        const style = dye('#FF6432')
        expect(style('test')).toEqual(expect.stringMatching(/^\x1b\[38;2;255;100;50mtest\x1b\[39m$/))
    })

    it('must process true color BG (HEX)', () => {
        const style = dye('bg#FF6432')
        expect(style('test')).toEqual(expect.stringMatching(/^\x1b\[48;2;255;100;50mtest\x1b\[49m$/))
    })

    it('must process true color (HEX3)', () => {
        const style = dye('#FA2')
        expect(style('test')).toEqual(expect.stringMatching(/^\x1b\[38;2;255;170;34mtest\x1b\[39m$/))
    })

    it('must process true color BG (HEX3)', () => {
        const style = dye('bg#fff')
        expect(style('test')).toEqual(expect.stringMatching(/^\x1b\[48;2;255;255;255mtest\x1b\[49m$/))
    })

    it('must process 256 color', () => {
        const style = dye('*5,2,0')
        expect(style('test')).toEqual(expect.stringMatching(/^\x1b\[38;5;208mtest\x1b\[39m$/))
    })

    it('must process 256 color BG', () => {
        const style = dye('bg*5,2,0')
        expect(style('test')).toEqual(expect.stringMatching(/^\x1b\[48;5;208mtest\x1b\[49m$/))
    })
})
