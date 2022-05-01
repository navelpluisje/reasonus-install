const OFF = 0;
const WARN = 1;
const ERROR = 2;

module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:import/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/recommended',
    'plugin:import/electron',
    'plugin:import/typescript',
  ],
  parser: '@typescript-eslint/parser',
  plugins: [
    'sort-keys-fix',
    'simple-import-sort',
    'import',
  ],
  rules: {
    // '@typescript/no-unused-vars': [ERROR, { args: 'after-used', caughtErrors: 'none', ignoreRestSiblings: true }],
    'arrow-parens': ERROR,
    'arrow-spacing': ERROR,
    'block-spacing': ERROR,
    'brace-style': [ERROR, '1tbs', { allowSingleLine: true }],
    'camelcase': [ERROR, { ignoreDestructuring: true }],
    'comma-dangle': [ERROR, 'always-multiline'],
    'comma-spacing': ERROR,
    'complexity': [ERROR, 10],
    'curly': ERROR,
    'default-case': ERROR,
    'default-case-last': ERROR,
    'dot-notation': ERROR,
    'eqeqeq': ERROR,
    'func-call-spacing': [ERROR, 'never'],
    'function-paren-newline': [ERROR, { minItems: 4 }],
    'implicit-arrow-linebreak': [ERROR, 'beside'],
    'indent': [ERROR, 2, { SwitchCase: 1 }],
    'keyword-spacing': ERROR,
    'no-confusing-arrow': ERROR,
    'no-constant-condition': ERROR,
    'no-useless-rename': ERROR,
    'object-shorthand': ['error', 'consistent-as-needed'],
    'quote-props': ['error', 'consistent-as-needed'],
    'quotes': [ERROR, 'single', { avoidEscape: true }],
    'require-await': ERROR,
    'semi': [ERROR, 'always'],
    'simple-import-sort/imports': ERROR,
    'sort-keys-fix/sort-keys-fix': ERROR,
    'sort-vars': ['error', { ignoreCase: true }],
    'space-before-blocks': ERROR,
    'space-infix-ops': ERROR,
    'switch-colon-spacing': ERROR,
  },
  settings: {
    'import/resolver': {
      node: {
        paths: ['src', 'utils'],
      },
      typescript: {
        alwaysTryTypes: true,
        paths: './tsconfig.json',
      },
    },
  },
};
