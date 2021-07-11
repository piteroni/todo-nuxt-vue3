module.exports = {
  extends: [
    "@nuxtjs/eslint-config-typescript"
  ],
  rules: {
    quotes: ["error", "double"],
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    "@typescript-eslint/no-explicit-any": "off",
    "import/prefer-default-export": "off",
    "max-classes-per-file": "off",
    "max-len": "off",
    "class-methods-use-this": "off",
    "comma-dangle": "off",
    "arrow-parens": "off",
    "no-plusplus": "off",
    "quote-props": "off",
    "object-curly-newline": "off",
    "space-before-function-paren": "off"
  },
}
