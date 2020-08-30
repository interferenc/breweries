module.exports = {
  preset: "@vue/cli-plugin-unit-jest/presets/typescript",
  roots: ["./src"],
  testMatch: ["**/*.spec.ts"],
  transform: {
    "\\.ts$": ["ts-jest"]
  },
  moduleFileExtensions: ["ts", "js"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1"
  },
  transformIgnorePatterns: ["<rootDir>/node_modules/"]
};
