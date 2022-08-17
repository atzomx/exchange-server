/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
// eslint-disable-next-line no-undef
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  moduleNameMapper: {
    "^@core/(.*)$": "<rootDir>/src/core/$1",
    "^@core$": "<rootDir>/src/core",
    "^@entities/(.*)$": "<rootDir>/src/entities/$1",
    "^@entities$": "<rootDir>/src/entities",
  },
  testTimeout: 20000,
};
