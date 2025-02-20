import eslintPluginNode from 'eslint-plugin-node';
import eslintPluginSecurity from 'eslint-plugin-security';
import eslintConfigPrettier from 'eslint-config-prettier';

export default [
  {
    ignores: ['node_modules', 'build', 'dist'],
  },
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    plugins: {
      node: eslintPluginNode,
      security: eslintPluginSecurity,
    },
    rules: {
      'node/no-unsupported-features/es-syntax': 'off',
      'node/no-missing-import': 'off',
      'security/detect-object-injection': 'warn',
      ...eslintConfigPrettier.rules,
    },
  },
];
