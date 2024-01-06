module.exports = {
  root: true,
  extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: ["./tsconfig.json"],
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: ["@typescript-eslint", "local-rules"],
  env: {
    es2019: true,
  },
  rules: {
    "no-undef": ["off"],
  },
  ignorePatterns: [".eslintrc.js", "eslint-local-rules.js"],
};
