import minimist from 'minimist'
import path from 'path'
import { fileURLToPath } from 'url'
import { execa, execaSync } from 'execa'
import { prompt } from 'enquirer'
import semver from 'semver'
import { dye } from '../'

// __dirname replacement in ES modules
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Import package.json data (Node 16+ with `"type": "module"` in package.json)
import pkg from '../package.json' assert { type: 'json' }
const version = pkg.version

const args = minimist(process.argv.slice(2))
const isDryRun = args.dry
const skipTests = args.skipTests
const skipBuild = args.skipBuild

const run = (bin, binArgs, opts = {}) => execa(bin, binArgs, { stdio: 'inherit', ...opts })

const bin = name => path.resolve(__dirname, '../node_modules/.bin/', name)

const step = dye('cyan').prefix('\n').attachConsole()
const error = dye('red-bright').attachConsole('error')
const good = dye('green', 'bold').prefix('\n✓ ').attachConsole()
const info = dye('green', 'dim').attachConsole('info')

const branch = execaSync('git', ['branch', '--show-current']).stdout
const commitMessage = execaSync('git', ['log', '-1', '--pretty=%B']).stdout
const gitStatus = execaSync('git', ['status']).stdout

if (!gitStatus.includes('nothing to commit, working tree clean')) {
  error('Please commit all changes first.')
  process.exit(1)
}

main().catch(err => {
  error(err)
  process.exit(1)
})

async function main() {
  let targetVersion = version

  if (branch !== 'main') {
    error('Branch "main" expected')
    return
  }

  // For main, propose version increments
  const versionIncrements = [
    'patch',
    'minor',
    'prerelease alpha',
    'prerelease beta',
    'preminor alpha',
    'preminor beta',
    'premajor alpha',
    'premajor beta',
    'major',
  ]

  const inc = input => {
    const [action, pre] = input.split(' ')
    if (['prerelease', 'premajor'].includes(action)) {
      return semver.inc(version, action, pre)
    }
    return semver.inc(version, input)
  }

  const { release } = await prompt({
    type: 'select',
    name: 'release',
    message: 'Select release type',
    choices: versionIncrements.map(i => `${i} (${inc(i)})`),
  })
  targetVersion = release.match(/\((.*)\)/)[1]

  if (!semver.valid(targetVersion)) {
    throw new Error(`Invalid target version: ${targetVersion}`)
  }

  const { yes } = await prompt({
    type: 'confirm',
    name: 'yes',
    message: `Releasing v${targetVersion}. Confirm?`,
  })
  if (!yes) {
    return
  }

  step('Running tests...')
  if (!skipTests && !isDryRun) {
    await run(bin('jest'), ['--clearCache'])
    await run('npm', ['test', '--', '--bail'])
  } else {
    info('(skipped)')
  }

  step('Running lint...')
  if (!skipTests && !isDryRun) {
    await run('npm', ['run', 'lint'])
  } else {
    info('(skipped)')
  }

  step('Building package...')
  if (!skipBuild && !isDryRun) {
    await run('npm', ['run', 'build', '--', '--release'])
  } else {
    info('(skipped)')
  }

  const [npmAction, pre] = release.split(' ')
  const preAction = ['prerelease', 'preminor', 'premajor'].includes(npmAction)
    ? ['--preid', pre]
    : []

  step(`Creating a new version ${targetVersion} ...`)
  execaSync('npm', ['version', npmAction, ...preAction, '-m', commitMessage])

  step('Pushing changes...')
  execaSync('git', ['push'])

  step('Pushing tags...')
  execaSync('git', ['push', '--tags'])

  step('Publishing...')
  execaSync('npm', ['publish', '--access', 'public'])

  good('All done!')
}
