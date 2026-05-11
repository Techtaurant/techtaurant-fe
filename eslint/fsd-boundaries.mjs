export const fsdImportBoundaryConfig = {
  files: ['**/*.{js,jsx,ts,tsx,mjs,mts}'],
  settings: {
    'import/resolver': {
      typescript: {
        project: './tsconfig.json',
      },
    },
  },
  rules: {
    'import/no-restricted-paths': [
      'error',
      {
        basePath: process.cwd(),
        zones: [
          {
            target: './src/views',
            from: './src/app',
            message: 'views 레이어는 app 레이어를 import할 수 없습니다.',
          },
          {
            target: './src/widgets',
            from: ['./src/app', './src/views'],
            message: 'widgets 레이어는 상위 레이어(app, views)를 import할 수 없습니다.',
          },
          {
            target: './src/features',
            from: ['./src/app', './src/views', './src/widgets'],
            message: 'features 레이어는 상위 레이어(app, views, widgets)를 import할 수 없습니다.',
          },
          {
            target: './src/entities',
            from: ['./src/app', './src/views', './src/widgets', './src/features'],
            message: 'entities 레이어는 상위 레이어(app, views, widgets, features)를 import할 수 없습니다.',
          },
          {
            target: './src/shared',
            from: ['./src/app', './src/views', './src/widgets', './src/features', './src/entities'],
            message: 'shared 레이어는 상위 레이어(app, views, widgets, features, entities)를 import할 수 없습니다.',
          },
        ],
      },
    ],
  },
};
