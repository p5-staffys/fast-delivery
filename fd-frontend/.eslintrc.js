module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "tsconfig.json",
    tsconfigRootDir: __dirname,
    sourceType: "module",
  },
  plugins: ["@typescript-eslint/eslint-plugin"],
  extends: ["plugin:@typescript-eslint/recommended", "plugin:prettier/recommended", "prettier"],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  rules: {
    "@typescript-eslint/interface-name-prefix": "off",
    "@typescript-eslint/explicit-function-return-type": "error",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-explicit-any": "error",
    "@typescript-eslint/array-type": "warn",
    "@typescript-eslint/ban-types": "error",
    "no-console": ["error", { allow: ["info"] }],
    "@typescript-eslint/no-implicit-any-catch": "warn",
    "@typescript-eslint/promise-function-async": "warn",
    "@typescript-eslint/no-empty-function": "off",
  },
};
