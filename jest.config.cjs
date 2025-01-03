/* eslint-disable no-undef */
module.exports = {
    preset: '@vue/cli-plugin-unit-jest',
  transform: {
      "^.+\\.vue$": "@vue/vue3-jest",
      "^.+\\js$": "babel-jest",
      "\\.yml$": "jest-transform-yaml",
  },
  snapshotSerializers: ['jest-serializer-vue'],
  transformIgnorePatterns: [
    "node_modules/(?!(axios)/)"
  ],
  moduleNameMapper: {
    '^@intlify/unplugin-vue-i18n/messages$': '<rootDir>/src/main.js'
  },
}