module.exports = {
    preset: 'ts-jest',
    moduleFileExtensions: [
      "ts",
      "js"
    ],
    globals: {
      __DEV__: true,
      __TEST__: true,
      __VERSION__: require('./package.json').version,
      __BROWSER__: false,
      __GLOBAL__: false,
      __ESM_BUNDLER__: true,
      __ESM_BROWSER__: false,
      __NODE_JS__: true,
      __SSR__: true,
      __FEATURE_OPTIONS_API__: true,
      __FEATURE_SUSPENSE__: true,
      __FEATURE_PROD_DEVTOOLS__: false,
    },
    rootDir: __dirname,
    testRegex: ".spec.ts$",
    transform: {
      "^.+\\.(t|j)s$": "ts-jest"
    },
    coverageDirectory: 'coverage',
    coverageReporters: ['html', 'lcov', 'text'],
    collectCoverageFrom: [
        'src/**/*.ts',
    ],
    watchPathIgnorePatterns: ['/node_modules/', '/dist/', '/.git/'],
    testEnvironment: "node",
}