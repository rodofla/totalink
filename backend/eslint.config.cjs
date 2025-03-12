// eslint.config.cjs
module.exports = [
  {
    // Aplica esta configuración a archivos TypeScript (y TSX si fuera necesario)
    files: ['src/**/*.{ts,tsx}'],
    languageOptions: {
      // Utiliza el parser de TypeScript
      parser: require('@typescript-eslint/parser'),
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: __dirname,
        sourceType: 'module',
      },
    },
    plugins: {
      '@typescript-eslint': require('@typescript-eslint/eslint-plugin'),
    },
    // Puedes extender la configuración recomendada de typescript-eslint
    // (en la configuración plana se aplican las reglas directamente)
    rules: {
      // Ejemplo de reglas recomendadas
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_' },
      ],
    },
    ignores: ['node_modules/', 'dist/', 'coverage/', 'tmp/', '.eslintcache'],
    settings: {
        'import/resolver': {
          typescript: {
            project: './tsconfig.json'
          }
        }
      },
  },
  {
    files: ['**/*.js'],
    languageOptions: {
      sourceType: 'module',
    },
    rules: {

    },
  },
];
