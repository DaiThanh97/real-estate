module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  roots: ["src", "__tests__"],
  coverageDirectory: "reports/coverage",
  collectCoverageFrom: ["src/**/*.{ts,js}"],
  coveragePathIgnorePatterns: ["node_modules"],
};
