
const execa = require('execa')
const { prompt } = require('enquirer')
const version = require('../package.json').version
const semver = require('semver')
const chalk = require('chalk')
const run = (bin, args, opts = {}) =>
  execa(bin, args, { stdio: 'inherit', ...opts })
const step = msg => console.log(chalk.cyan(msg))

const branch = execa.sync('git', ['branch', '--show-current']).stdout
const inc = i => {
    if (['prerelease', 'premajor'].includes(i.split(' ')[0])) {
        const [action, pre] = i.split(' ')
        return semver.inc(version, action, pre)
    } else {
        return semver.inc(version, i)
    }
}

const isDryRun = args.dry
const skipTests = args.skipTests
const skipBuild = args.skipBuild

const commitMessage = execa.sync('git', ['log', '-1', '--pretty=%B']).stdout

const gitStatus = execa.sync('git', ['status']).stdout
if (gitStatus.indexOf('nothing to commit, working tree clean') < 0) {
    console.error(chalk.redBright('Please commit all the changes first.'))
    process.exit(1)
}

main()

async function main() {
    let targetVersion = version
    if (branch === 'main') {
        // for main proposing typeof version increase
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
    
        const { release } = await prompt({
            type: 'select',
            name: 'release',
            message: 'Select release type',
            choices: versionIncrements.map(i => `${i} (${inc(i)})`)
        })
      

        targetVersion = release.match(/\((.*)\)/)[1]

        if (!semver.valid(targetVersion)) {
            throw new Error(`invalid target version: ${targetVersion}`)
        }

        const { yes } = await prompt({
            type: 'confirm',
            name: 'yes',
            message: `Releasing v${targetVersion}. Confirm?`
        })
    
        if (!yes) {
            return
        }

        // run tests before release
        step('\nRunning tests...')
        if (!skipTests && !isDryRun) {
            await run(bin('jest'), ['--clearCache'])
            await run('npm', ['test', '--', '--bail'])
        } else {
            console.log(`(skipped)`)
        }

        // build all packages with types
        step('\nBuilding package...')
        if (!skipBuild && !isDryRun) {
            await run('npm', ['run', 'build', '--', '--release'])
        } else {
            console.log(`(skipped)`)
        }

        const npmAction = release.split(' ')[0]
        const pre = release.split(' ')[1]
        const preAction = [
                'prerelease',
                'preminor',
                'premajor',
            ].includes(npmAction) ? ['--preid', pre] : []

        step('\nCreating a new version ' + targetVersion + ' ...')
        execa.sync('npm', ['version', npmAction, ...preAction, '-m', commitMessage])

        // included in "version" script
        // updateChangeLog(targetVersion)

    } else {
        console.error('Branch "main" expected')
    }

    step('\nPushing changes ...')
    execa.sync('git', ['push'])

    step('\nPushing tags ...')
    execa.sync('git', ['push', '--tags'])

    step('\nPublishing ...')
    execa.sync('npm', ['publish'])
    
    console.log(chalk.green('✓ All done!'))
}

