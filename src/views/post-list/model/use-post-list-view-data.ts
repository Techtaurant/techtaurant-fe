'use client';

import { useSearchParams } from 'next/navigation';

import {
  getPostListAuthorIds,
  getPostListPostIds,
  mergePostListItems,
  parsePostListFilters,
  toPostListApiParams,
  useGetPostList,
  useGetPostListMetadatas,
  useGetPostListProfileImages,
  useGetPostListViewerStates,
} from '@/entities/post-list';
import { useGetMe } from '@/entities/user';

export const usePostListViewData = () => {
  const searchParams = useSearchParams();
  const { data: me } = useGetMe();
  const filters = parsePostListFilters(searchParams);
  const { isFetchingNextPage, data, fetchNextPage } = useGetPostList({
    params: toPostListApiParams(filters),
  });
  const postContents = data ?? [];
  const postIds = getPostListPostIds(postContents);
  const authorIds = getPostListAuthorIds(postContents);
  const { data: metadatas } = useGetPostListMetadatas({ postIds });
  const { data: profileImages } = useGetPostListProfileImages({ authorIds });
  const { data: viewerStates } = useGetPostListViewerStates({
    enabled: Boolean(me),
    postIds,
  });
  const posts = mergePostListItems({
    metadatas,
    posts: postContents,
    profileImages,
    viewerStates,
  });

  return {
    fetchNextPage,
    isFetchingNextPage,
    posts,
  };
};
