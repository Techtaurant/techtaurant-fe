import type { PostListSortFilter } from '@/entities/post-list';
import { GetPostContentsApiSort } from '@/shared/api/generated';

export const POST_SORT_OPTIONS = [
  { label: '최신순', value: GetPostContentsApiSort.LATEST },
  { label: '조회순', value: GetPostContentsApiSort.VIEW },
  { label: '추천순', value: GetPostContentsApiSort.LIKE },
  { label: '댓글순', value: GetPostContentsApiSort.COMMENT },
] satisfies { label: string; value: PostListSortFilter }[];
