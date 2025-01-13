import fs from 'fs'
import path from 'path'

// Helper to resolve paths
const resolvePath = relativePath => path.resolve(process.cwd(), relativePath)

async function updateTsconfig() {
  try {
    // Resolve the path to the tsconfig.json in the consuming project
    const tsconfigPath = resolvePath('tsconfig.json')

    console.log(`[@prostojs/dye] Updating tsconfig.json in ${tsconfigPath}`)

    // Check if tsconfig.json exists
    if (!fs.existsSync(tsconfigPath)) {
      console.log('[@prostojs/dye] No tsconfig.json found. Skipping update.')
      return
    }

    // Read the existing tsconfig.json
    const tsconfigContent = await fs.promises.readFile(tsconfigPath, 'utf8')
    const tsconfig = JSON.parse(tsconfigContent)

    // Add or update the extends field
    const extendsPath = './node_modules/@prostojs/dye/tsconfig.dye.json'
    if (tsconfig.extends === extendsPath) {
      console.log('[@prostojs/dye] tsconfig.json already extends the required configuration.')
    } else {
      tsconfig.extends = extendsPath

      // Write the updated tsconfig.json back to disk
      await fs.promises.writeFile(tsconfigPath, JSON.stringify(tsconfig, null, 2), 'utf8')
      console.log(`[@prostojs/dye] Updated tsconfig.json to extend ${extendsPath}`)
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
    const oxlintrc = JSON.parse(oxlintrcContent)

    // Ensure globals field exists
    oxlintrc.globals = oxlintrc.globals || {}

    // Add required globals
    const requiredGlobals = {
      Buffer: 'readonly',
      process: 'readonly',
    }

    let updated = false
    for (const [key, value] of Object.entries(requiredGlobals)) {
      if (oxlintrc.globals[key] !== value) {
        oxlintrc.globals[key] = value
        updated = true
      }
    }

    if (updated) {
      await fs.promises.writeFile(oxlintrcPath, JSON.stringify(oxlintrc, null, 2), 'utf8')
      console.log(
        `[@prostojs/dye] Updated .oxlintrc.json with required globals: ${Object.keys(
          requiredGlobals
        ).join(', ')}`
      )
    } else {
      console.log('[@prostojs/dye] .oxlintrc.json already contains the required globals.')
    }
  } catch (error) {
    console.error('[@prostojs/dye] Failed to update .oxlintrc.json:', error)
  }
}

// Run both functions
;(async () => {
  await updateTsconfig()
  await updateOxlintConfig()
})()
