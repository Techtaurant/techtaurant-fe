export const namedExportOnlyConfig = {
  files: ['src/**/*.{js,jsx,ts,tsx}'],
  ignores: ['src/app/**/*.{js,jsx,ts,tsx}'],
  rules: {
    'import/no-default-export': 'error',
  },
};
