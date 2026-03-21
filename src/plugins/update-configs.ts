import fs from 'fs'
import path from 'path'

import { createDyeReplacements } from './common'

const rootDir = process.env.INIT_CWD || process.cwd()
const resolvePath = (relativePath: string) => path.resolve(rootDir, relativePath)

async function updateTsconfig() {
  try {
    const tsconfigPath = resolvePath('tsconfig.json')

    console.log(`[@prostojs/dye] Updating tsconfig.json in ${tsconfigPath}`)

    if (!fs.existsSync(tsconfigPath)) {
      console.log('[@prostojs/dye] No tsconfig.json found. Creating one.')
      await fs.promises.writeFile(
        tsconfigPath,
        JSON.stringify(
          {
            compilerOptions: {
              types: ['@prostojs/dye/global'],
            },
          },
          null,
          2
        ),
        'utf8'
      )
      return
    }

    const tsconfigContent = await fs.promises.readFile(tsconfigPath, 'utf8')
    const tsconfig = JSON.parse(tsconfigContent) as { compilerOptions?: { types?: string[] } }

    tsconfig.compilerOptions = tsconfig.compilerOptions || {}
    tsconfig.compilerOptions.types = tsconfig.compilerOptions.types || []
    if (!tsconfig.compilerOptions.types.includes('@prostojs/dye/global')) {
      tsconfig.compilerOptions.types.push('@prostojs/dye/global')
      await fs.promises.writeFile(tsconfigPath, JSON.stringify(tsconfig, null, 2), 'utf8')
    }
  } catch (error) {
    console.error('[@prostojs/dye] Failed to update tsconfig.json:', error)
  }
}

async function updateOxlintConfig() {
  try {
    const oxlintrcPath = resolvePath('.oxlintrc.json')
    console.log(`[@prostojs/dye] Updating .oxlintrc.json in ${oxlintrcPath}`)
    if (!fs.existsSync(oxlintrcPath)) {
      console.log('[@prostojs/dye] No .oxlintrc.json found. Skipping oxlint config update.')
      return
    }

    const oxlintrcContent = await fs.promises.readFile(oxlintrcPath, 'utf8')
    const oxlintrc = JSON.parse(oxlintrcContent) as { globals?: Record<string, 'readonly'> }

    const globals = oxlintrc.globals || {}
    oxlintrc.globals = globals

    let changed = false
    for (const key of Object.keys(createDyeReplacements())) {
      if (globals[key] !== 'readonly') {
        globals[key] = 'readonly'
        changed = true
      }
    }

    if (changed) {
      await fs.promises.writeFile(oxlintrcPath, JSON.stringify(oxlintrc, null, 2), 'utf8')
      console.log(`[@prostojs/dye] Updated .oxlintrc.json with DYE globals`)
    }
  } catch (error) {
    console.error('[@prostojs/dye] Failed to update .oxlintrc.json:', error)
  }
}

;(async () => Promise.all([updateTsconfig(), updateOxlintConfig()]))()
