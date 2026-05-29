import type { PostListSortFilter } from '@/entities/post-list';

export const POST_SORT_OPTIONS: Array<{ label: string; value: PostListSortFilter }> = [
  { label: '최신순', value: 'LATEST' },
  { label: '조회순', value: 'VIEW' },
  { label: '추천순', value: 'LIKE' },
  { label: '댓글순', value: 'COMMENT' },
];
