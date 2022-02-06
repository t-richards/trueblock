module.exports = {
  root: true,
  env: {
    webextensions: true
  },
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
  ],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'preact'
  ],
  settings: {
    jest: {
      version: 'latest'
    }
  }
}
