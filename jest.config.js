module.exports = {
    testMatch: ["**/?(*.)+(test).ts"],
    transform: {
        "^.+\\.ts$": "ts-jest",
    },
    moduleFileExtensions: ["ts", "js"],
    testEnvironment: "node",
};
