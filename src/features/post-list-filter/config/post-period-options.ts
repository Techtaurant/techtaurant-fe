import type { PostListPeriodFilter } from '@/entities/post-list';

export const POST_PERIOD_OPTIONS: Array<{ label: string; value: PostListPeriodFilter }> = [
  { label: '7일', value: 'WEEK' },
  { label: '30일', value: 'MONTH' },
  { label: '365일', value: 'YEAR' },
  { label: '전체', value: 'ALL' },
];
