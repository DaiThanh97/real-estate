module.exports = {
    globals: {
        "ts-jest": {
            tsConfig: "tsconfig.json"
        }
    },
    moduleFileExtensions: [
        "ts",
        "js"
    ],
    transform: {
        "^.+\\.(ts|tsx)$": "ts-jest"
    },
    testMatch: [
        "**/tests/**/*.test.(ts|js)"
    ],
    testEnvironment: "node",
    coverageReporters: ["json", "lcov", "text", "clover"],
    coverageDirectory: "./",
    testFailureExitCode: 0
};
