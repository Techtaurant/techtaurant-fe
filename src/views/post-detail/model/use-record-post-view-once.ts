'use client';

import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useRef } from 'react';

import { getPostDetailMetadataQueryKey, useRecordPostView } from '@/entities/post-detail';
import { getPostListQueryKey } from '@/entities/post-list';

type Params = {
  enabled: boolean;
  postId: string;
};

export const useRecordPostViewOnce = ({ enabled, postId }: Params) => {
  const didRecordRef = useRef(false);
  const queryClient = useQueryClient();
  const { mutateAsync } = useRecordPostView();

  useEffect(() => {
    if (!enabled || didRecordRef.current) return;

    didRecordRef.current = true;

    void mutateAsync({ postId })
      .then(async () => {
        await Promise.all([
          queryClient.invalidateQueries({ queryKey: getPostDetailMetadataQueryKey(postId) }),
          queryClient.invalidateQueries({ queryKey: getPostListQueryKey() }),
        ]);
      })
      .catch(() => {
        didRecordRef.current = false;
      });
  }, [enabled, mutateAsync, postId, queryClient]);
};
