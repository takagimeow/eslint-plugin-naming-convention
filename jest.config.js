module.exports = {
  moduleFileExtensions: [
    "ts",
    "mts",
    "cjs",
    "js",
    "jsx",
    "mjs",
    "mjsx",
    "json",
    "node",
  ],
  testRegex: [
    "./src/__tests__/.+\\.test\\.ts$",
    "./src/__tests__/.+\\.spec\\.ts$",
  ],
  transform: {
    "^.+\\.(t|j)sx?$": [
      "@swc/jest",
      {
        jsc: {
          target: "es2019",
          transform: {
            react: {
              runtime: "automatic",
            },
          },
        },
      },
    ],
  },
};
