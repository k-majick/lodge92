module.exports = {
  preset: "ts-jest",
  moduleNameMapper: {
    '.+\.svg?.+$': '<rootDir>/assets/gfx/cat_1.svg',
    '^@/(.*)$': '<rootDir>/$1',
    '^~/(.*)$': '<rootDir>/$1',
    '^vue$': 'vue/dist/vue.common.js'
  },
  moduleFileExtensions: ['ts', 'js', 'vue', 'json'],
  transform: {
    '^.+\\.ts$': 'ts-jest',
    '^.+\\.js$': 'babel-jest',
    '^.*\\.(vue)$': 'vue-jest',
    '^.+\\.svg?.+$': 'jest-transform-stub'
  },
  testMatch: [
    "**/*.spec.ts"
  ],
  collectCoverage: false,
  collectCoverageFrom: [
    '<rootDir>/components/**/*.vue',
    '<rootDir>/pages/**/*.vue',
    '<rootDir>/store/**/*.ts'
  ],
}
