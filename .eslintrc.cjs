module.exports = {
  root: true,
  parserOptions: {
    project: "./tsconfig.json"
  },

  extends: ["plugin:@typescript-eslint/recommended"],
  parser: "@typescript-eslint/parser",
  parserOptions: { project: ["./tsconfig.json"] },
  plugins: ["@typescript-eslint"],
  rules: {
    semi: ["error", "always"],
    "newline-per-chained-call": ["error", { ignoreChainWithDepth: 1 }],
    "comma-dangle": ["error", { arrays: "only-multiline" }],
    "indent": ["error", 2, { "MemberExpression": 1 }]
  }
};
