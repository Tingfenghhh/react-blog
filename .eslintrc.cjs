module.exports = {
  root: true,
  env: { browser: true, es2020: true, node: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'plugin:prettier/recommended', // 避免与 prettier 冲突
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    parser: '@babel/eslint-parser', // 指定 eslint 可以解析 JSX 语法。
    sourceType: 'module',
    ecmaVersion: 'latest',
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ['react-refresh', '@typescript-eslint', 'react'],
  rules: {
    semi: 'off', // 不强制在语句末尾使用分号。
    'arrow-body-style': 'off', // 不强制在箭头函数体周围使用大括号。
    'no-console': 'off', // 关闭使用 console 报错。
    'no-undef': 'warn', // 使用 undefined 时警告。
    'no-shadow': 'off', // 允许变量覆盖声明。
    'react/jsx-uses-react': 'off', // 无须在组件中显式 import React。
    'react/react-in-jsx-scope': 'off', // 确保已经正确引入了 React 库。
    '@typescript-eslint/no-explicit-any': ['off'], // 允许使用 any 类型。
    'no-unused-expressions': [
      'error',
      {
        allowShortCircuit: true,
        allowTernary: true,
      },
    ], // 允许使用短路、三目运算。
    'no-param-reassign': [
      'error',
      {
        props: false,
      },
    ], // 函数形参可修改。
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    // react/no-array-index-key
    'react/no-array-index-key': 'warn',
  },
  settings: {
    //自动检测React的版本，从而进行规范代码。
    react: {
      pragma: 'React',
      version: 'detect',
    },
  },
};
