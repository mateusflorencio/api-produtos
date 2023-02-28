export default {
  coverageDirectory: 'coverage',
  coverageProvider: 'babel',
  clearMocks: true,
  collectCoverage: true,
  testMatch: ['**/*.spec.js'],
  transform: {
    '^.+\\.js$': 'babel-jest'
  },
  roots: ['<rootDir>/__tests__']
}
