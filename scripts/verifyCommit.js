import { readFileSync } from 'fs'

// Invoked on the commit-msg git hook by yorkie.
const msgPath = process.env.GIT_PARAMS
const msg = readFileSync(msgPath, 'utf8').trim()

const commitRE =
  /^(revert: )?(build|chore|ci|docs|dx|feat|fix|perf|refactor|release|style|test|types|wip|workflow)(\(.+\))?: .{1,50}/u

if (!commitRE.test(msg)) {
  console.log()
  console.error(
    `  ERROR  invalid commit message format.\n\n` +
      `  Proper commit message format is required for automated changelog generation. Examples:\n\n` +
      `    feat(compiler): add 'comments' option\n` +
      `    fix(v-model): handle events on blur (close #28)\n\n` +
      `  See .github/commit-convention.md for more details.\n`
  )
  process.exit(1)
}
