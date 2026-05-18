import { loadEnvConfig } from '@next/env';
import { defineConfig } from 'orval';

loadEnvConfig(process.cwd());

if (!process.env.NEXT_PUBLIC_API_BASE_URL) {
  throw new Error('NEXT_PUBLIC_API_BASE_URL 환경 변수를 확인해주세요.');
}

export default defineConfig({
  techtaurant: {
    input: {
      target: `${process.env.NEXT_PUBLIC_API_BASE_URL}/v3/api-docs`,
    },
    output: {
      mode: 'single',
      target: './src/shared/api/generated/index.ts',
      client: 'fetch',
      clean: true,
      baseUrl: {
        runtime: 'process.env.NEXT_PUBLIC_API_BASE_URL',
      },
      override: {
        useTypeOverInterfaces: true,
        mutator: {
          path: './src/shared/api/custom-fetch.ts',
          name: 'customFetch',
        },
      },
    },
    hooks: {
      afterAllFilesWrite: ['eslint --fix', 'prettier --write'],
    },
  },
});
