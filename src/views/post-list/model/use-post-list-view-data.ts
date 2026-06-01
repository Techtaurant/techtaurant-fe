'use client';

import { useSearchParams } from 'next/navigation';

import {
  getPostListAuthorIdGroups,
  getPostListPostIdGroups,
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
  const postContents = data?.posts ?? [];
  const postContentPages = data?.pages ?? [];
  const postIdGroups = getPostListPostIdGroups(postContentPages);
  const authorIdGroups = getPostListAuthorIdGroups(postContentPages);
  const { data: metadatas } = useGetPostListMetadatas({ postIdGroups });
  const { data: profileImages } = useGetPostListProfileImages({ authorIdGroups });
  const { data: viewerStates } = useGetPostListViewerStates({
    enabled: Boolean(me),
    postIdGroups,
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
