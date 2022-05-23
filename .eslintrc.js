module.exports = {
  root: true,
  env: {
    "vue/setup-compiler-macros": true,
    node: true,
  },
  extends: [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "@vue/typescript/recommended",
  ],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    "vue/multi-word-component-names": "off",
    "vue/script-setup-uses-vars": "error",
    "vue/no-v-html": "off",
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    // "prettier/prettier": [
    //   "error",
    //   {
    //     singleQuote: false,
    //     semi: false,
    //     useTabs: false,
    //     trailingComma: "all",
    //     bracketSpacing: true,
    //     arrowParens: "avoid",
    //     endOfLine: "auto",
    //   },
    // ],
  },
  globals: {
    defineProps: "readonly",
    defineEmits: "readonly",
    defineExpose: "readonly",
  },
}
