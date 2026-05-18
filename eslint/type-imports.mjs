export const typeImportConfig = {
  files: ['**/*.{ts,tsx,mts}'],
  rules: {
    '@typescript-eslint/consistent-type-imports': [
      'error',
      {
        prefer: 'type-imports',
        fixStyle: 'separate-type-imports',
      },
    ],
  },
};
