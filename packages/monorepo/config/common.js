module.exports = function createPackage () {
  return {
    scripts: {
      clean: 'rimraf lib',
      build: 'babel src -d lib --ignore \'**/__tests__\'',
      lint: 'standard --fix',
      test: 'jest',
      posttest: 'npm run lint -s',
      ci: 'jest --coverage',
      postci: 'standard'
    },
    npminclude: ['lib'],
    gitignore: ['lib', 'tmp'],
    jest: {
      testEnvironment: 'node',
      clearMocks: true,
      collectCoverageFrom: [
        'src/**/*.js'
      ]
    },
    babel: {
      presets: [
        ['@babel/preset-env', {
          targets: {
            node: '6'
          },
          shippedProposals: true
        }]
      ]
    },
    standard: {
      env: {
        jest: true
      }
    }
  }
}
