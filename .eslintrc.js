module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    'plugin:css-modules/recommended',
    'plugin:prettier/recommended',
    'prettier',
    'plugin:vue/essential',
  ],
  // required to lint *.vue files
  plugins: ['prettier', 'css-modules'],
  // add your custom rules here
  rules: {
    'css-modules/no-unused-class': [
      2,
      {
        camelCase: true,
      },
    ],
    'css-modules/no-undef-class': [
      2,
      {
        camelCase: true,
      },
    ],
    'no-console': 'warn',
    'no-debugger': 'off',
    'no-alert': 'warn',
    'no-unused-vars': 'warn',
    'no-await-in-loop': 0,
    'no-empty': 0,
    'no-irregular-whitespace': 0,
    indent: 'off',
    'linebreak-style': 'off',
    'no-underscore-dangle': 'off',
    'no-plusplus': [
      'error',
      {
        allowForLoopAfterthoughts: true,
      },
    ],
    'prefer-const': [
      0,
      {
        destructuring: 'all',
      },
    ],
    'arrow-parens': [2, 'always'],
    'prefer-object-spread': 'off',
    'prefer-spread': 'off',
    'prettier/prettier': [
      'error',
      {
        trailingComma: 'es5',
        tabWidth: 2,
        singleQuote: true,
        jsxSingleQuote: true,
        endOfLine: 'auto',
        printWidth: 200,
      },
    ],
  },
};
