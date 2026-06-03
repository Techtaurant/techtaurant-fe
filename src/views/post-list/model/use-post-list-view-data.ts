'use client';

import { useSearchParams } from 'next/navigation';

import {
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
  const filters = parsePostListFilters(searchParams);

  const { data: me } = useGetMe();
  const { isFetchingNextPage, data, fetchNextPage } = useGetPostList({
    params: toPostListApiParams(filters),
  });

  const postContents = data ?? [];
  const postIds = postContents.map((post) => post.id);
  const authorIds = Array.from(new Set(postContents.map((post) => post.authorId)));

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
