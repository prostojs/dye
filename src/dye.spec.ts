import { dye, TDyeBgColor, TDyeColorAll, TDyeModifier } from './index'
describe('dye', () => {
    it('must work plain colors', () => {
        const tests: (TDyeColorAll | TDyeBgColor)[] = [
            'BLACK', 'BG_BLACK', 'BLACK_BRIGHT', 'BG_BLACK_BRIGHT',
            'RED', 'BG_RED', 'RED_BRIGHT', 'BG_RED_BRIGHT',
            'GREEN', 'BG_GREEN', 'GREEN_BRIGHT', 'BG_GREEN_BRIGHT',
            'YELLOW', 'BG_YELLOW', 'YELLOW_BRIGHT', 'BG_YELLOW_BRIGHT',
            'BLUE', 'BG_BLUE', 'BLUE_BRIGHT', 'BG_BLUE_BRIGHT',
            'MAGENTA', 'BG_MAGENTA', 'MAGENTA_BRIGHT', 'BG_MAGENTA_BRIGHT',
            'CYAN', 'BG_CYAN', 'CYAN_BRIGHT', 'BG_CYAN_BRIGHT',
            'WHITE', 'BG_WHITE', 'WHITE_BRIGHT', 'BG_WHITE_BRIGHT',
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
            'GRAY01', 'BG_GRAY01',
            'GRAY02', 'BG_GRAY02',
            'GRAY03', 'BG_GRAY03',
            'GRAY04', 'BG_GRAY04',
            'GRAY05', 'BG_GRAY05',
            'GRAY06', 'BG_GRAY06',
            'GRAY07', 'BG_GRAY07',
            'GRAY08', 'BG_GRAY08',
            'GRAY09', 'BG_GRAY09',
            'GRAY10', 'BG_GRAY10',
            'GRAY11', 'BG_GRAY11',
            'GRAY12', 'BG_GRAY12',
            'GRAY13', 'BG_GRAY13',
            'GRAY14', 'BG_GRAY14',
            'GRAY15', 'BG_GRAY15',
            'GRAY16', 'BG_GRAY16',
            'GRAY17', 'BG_GRAY17',
            'GRAY18', 'BG_GRAY18',
            'GRAY19', 'BG_GRAY19',
            'GRAY20', 'BG_GRAY20',
            'GRAY21', 'BG_GRAY21',
            'GRAY22', 'BG_GRAY22',
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
            'BOLD', 
            'DIM', 
            'ITALIC', 
            'UNDERSCORE', 
            'INVERSE', 
            'HIDDEN', 
            'CROSSED', 
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
        const result = dye('DIM', 'RED')('TEXT')
        expect(dye.strip(result)).toEqual('TEXT')
    })

})
