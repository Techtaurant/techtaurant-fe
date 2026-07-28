import { useGetCommentMetadatas } from '@/entities/comment/api/use-get-comment-metadatas';
import { useGetCommentProfileImages } from '@/entities/comment/api/use-get-comment-profile-images';
import { useGetCommentViewerStates } from '@/entities/comment/api/use-get-comment-viewer-states';
import { mergeCommentItems } from '@/entities/comment/model/merge-comment-items';
import type { CommentContentListResponse } from '@/shared/api/generated';

type Params = {
  contents: CommentContentListResponse[];
  isViewerStateEnabled: boolean;
};

export const useMergedComments = ({ contents, isViewerStateEnabled }: Params) => {
  const commentIds = [...new Set(contents.map((comment) => comment.id))].sort();
  const authorIds = [...new Set(contents.map((comment) => comment.authorId))].sort();
  const { data: metadatas, isPending: isMetadatasPending } = useGetCommentMetadatas({ commentIds });
  const { data: profileImages } = useGetCommentProfileImages({ authorIds });
  const { data: viewerStates, isPending: isViewerStatesPending } = useGetCommentViewerStates({
    commentIds,
    enabled: isViewerStateEnabled,
  });

  return {
    data: mergeCommentItems({
      contents,
      metadatas,
      profileImages,
      viewerStates,
    }),
    isPending: isMetadatasPending || isViewerStatesPending,
  };
};
