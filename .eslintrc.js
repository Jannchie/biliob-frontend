module.exports = {
  root: true,

  env: {
    node: true
  },

  rules: {
    "no-console": "off",
    "no-debugger": "off",
    "vue/component-name-in-template-casing": "warn"
  },

  parserOptions: {
    parser: "babel-eslint"
  },

  extends: ["plugin:vue/recommended", "@vue/prettier"]
};