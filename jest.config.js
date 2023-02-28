// https://stackoverflow.com/questions/35756479/does-jest-support-es6-import-export
export default {
  testEnvironment: 'jest-environment-node',
  coverageDirectory: 'coverage',
  coverageProvider: 'babel',
  clearMocks: true,
  collectCoverage: true,
  testMatch: ['**/*.spec.js'],
  transform: {},
  roots: ['<rootDir>/__tests__'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  }
}
