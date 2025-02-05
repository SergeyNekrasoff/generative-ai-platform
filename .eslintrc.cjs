require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier/skip-formatting'
  ],
  ignorePatterns: ['*.config.js'],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  env: {
    'vue/setup-compiler-macros': true
  }
}
