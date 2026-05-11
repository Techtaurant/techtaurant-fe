import simpleImportSort from 'eslint-plugin-simple-import-sort';

export const importSortConfig = {
  files: ['**/*.{js,jsx,ts,tsx,mjs,mts}'],
  plugins: {
    'simple-import-sort': simpleImportSort,
  },
  rules: {
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
  },
};
