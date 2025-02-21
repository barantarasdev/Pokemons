const eslintPluginNode = require('eslint-plugin-node');
const eslintConfigPrettier = require('eslint-config-prettier');

module.exports = [
  {
    ignores: ['node_modules', 'build', 'dist'],
  },
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'commonjs',
      globals: {
        require: 'readonly',
        process: 'readonly',
        console: 'readonly',
      },
    },
    plugins: {
      node: eslintPluginNode,
    },
    rules: {
      'node/no-unsupported-features/es-syntax': 'off',
      'no-undef': 'error',
      ...eslintConfigPrettier.rules,
    },
  },
];
