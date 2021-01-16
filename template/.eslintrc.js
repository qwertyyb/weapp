module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2020: true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {
    'no-param-reassign': 0,
    'no-console': 0,
    camelcase: 0,
    'consistent-return': 0,
    'no-async-promise-executor': 0,
    'global-require': 0,
  },
  globals: {
    wx: 'readonly',
    App: 'readonly',
    Page: 'readonly',
    Component: 'readonly',
    getCurrentPages: 'readonly',
    getApp: 'readonly',
    Behavior: 'readonly',
  },
};
