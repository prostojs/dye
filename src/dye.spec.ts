
import { dye } from './index'
describe('dye', () => {
    const bold = dye('BOLD')
    console.log(bold('Text In Bold'))

    it('must', () => {
        expect(bold).toBeDefined()
    })
})
