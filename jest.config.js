/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
// eslint-disable-next-line no-undef
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  moduleNameMapper: {
    "^@core/(.*)$": "<rootDir>/src/core/$1",
    "^@entities/(.*)$": "<rootDir>/src/entities/$1",
    "^@server/(.*)$": "<rootDir>/src/server/$1",
    "^@database/(.*)$": "<rootDir>/src/database/$1",
  },
};
