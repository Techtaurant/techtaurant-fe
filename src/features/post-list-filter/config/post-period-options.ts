import type { PostListPeriodFilter } from '@/entities/post-list';
import { GetPostContentsApiPeriod } from '@/shared/api/generated';

export const POST_PERIOD_OPTIONS = [
  { label: '7일', value: GetPostContentsApiPeriod.WEEK },
  { label: '30일', value: GetPostContentsApiPeriod.MONTH },
  { label: '365일', value: GetPostContentsApiPeriod.YEAR },
  { label: '전체', value: GetPostContentsApiPeriod.ALL },
] satisfies { label: string; value: PostListPeriodFilter }[];
