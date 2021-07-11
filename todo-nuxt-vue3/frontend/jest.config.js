module.exports = {
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1",
    "^~/(.*)$": "<rootDir>/$1",
    "^vue$": "vue/dist/vue.common.js"
  },
  moduleFileExtensions: [
    "ts",
    "js",
    "vue",
    "json"
  ],
  transform: {
    "^.+\\.ts$": "ts-jest",
    "^.+\\.js$": "babel-jest",
    ".*\\.(vue)$": "vue-jest"
  },
  collectCoverage: true,
  testPathIgnorePatterns: [
    "/node_modules/"
  ],
  coveragePathIgnorePatterns: [
    "/node_modules/",
    "shared/"
  ],
  testEnvironment: "jsdom"
}
