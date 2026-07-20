import type { CommentItem } from '@/entities/comment/model/comment';
import { COMMENT_LIKE_STATUS } from '@/entities/comment/model/comment';
import type {
  CommentContentListResponse,
  CommentMetadataResponse,
  CommentViewerStateResponse,
  UserProfileImageResponse,
} from '@/shared/api/generated';

type Params = {
  contents: CommentContentListResponse[];
  metadatas?: CommentMetadataResponse[];
  profileImages?: UserProfileImageResponse[];
  viewerStates?: CommentViewerStateResponse[];
};

export const mergeCommentItems = ({
  contents,
  metadatas = [],
  profileImages = [],
  viewerStates = [],
}: Params): CommentItem[] => {
  const metadataMap = new Map(metadatas.map((metadata) => [metadata.commentId, metadata]));
  const profileImageMap = new Map(profileImages.map((profileImage) => [profileImage.userId, profileImage]));
  const viewerStateMap = new Map(viewerStates.map((viewerState) => [viewerState.commentId, viewerState]));

  return contents.map((content) => {
    const metadata = metadataMap.get(content.id);
    const profileImage = profileImageMap.get(content.authorId);
    const viewerState = viewerStateMap.get(content.id);

    return {
      author: {
        id: content.authorId,
        name: profileImage?.authorName ?? '',
        profileImageUrl: profileImage?.profileImageUrl ?? '',
      },
      content: content.content,
      createdAt: content.createdAt,
      depth: content.depth,
      id: content.id,
      isBanned: viewerState?.isBanned ?? false,
      isDeleted: metadata?.isDeleted ?? false,
      likeCount: metadata?.likeCount ?? 0,
      likeStatus: viewerState?.likeStatus ?? COMMENT_LIKE_STATUS.NONE,
      parentId: content.parentId,
      postId: content.postId,
      replyCount: metadata?.replyCount ?? 0,
      updatedAt: content.updatedAt,
    };
  });
};
