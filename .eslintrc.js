module.exports = {
  root: true,

  env: {
    node: true
  },

  rules: {
    "no-console": "off",
    "no-debugger": "off",
    "vue/component-name-in-template-casing": [
      "warn",
      "PascalCase",
      {
        registeredComponentsOnly: false,
        ignores: []
      }
    ]
  },

  parserOptions: {
    parser: "babel-eslint"
  },

  extends: ["plugin:vue/recommended"]
};
