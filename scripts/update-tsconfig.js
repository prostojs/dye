import fs from 'fs'
import path from 'path'

// Helper to resolve paths
const resolvePath = relativePath => path.resolve(process.cwd(), relativePath)

async function updateTsconfig() {
  try {
    // Resolve the path to the tsconfig.json in the consuming project
    const tsconfigPath = resolvePath('tsconfig.json')

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
    console.error('Failed to update tsconfig.json:', error)
  }
}

// Run the function
updateTsconfig()
