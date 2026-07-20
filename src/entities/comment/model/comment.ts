import { CommentViewerStateResponseLikeStatus, GetParentCommentContentsApiSort } from '@/shared/api/generated';

export const COMMENT_SORT = GetParentCommentContentsApiSort;
export const COMMENT_LIKE_STATUS = CommentViewerStateResponseLikeStatus;

export type CommentSort = (typeof COMMENT_SORT)[keyof typeof COMMENT_SORT];
export type CommentLikeStatus = (typeof COMMENT_LIKE_STATUS)[keyof typeof COMMENT_LIKE_STATUS];

export type CommentItem = {
  author: {
    id: string;
    name: string;
    profileImageUrl: string;
  };
  content: string;
  createdAt: string;
  depth: number;
  id: string;
  isBanned: boolean;
  isDeleted: boolean;
  likeCount: number;
  likeStatus: CommentLikeStatus;
  parentId?: string;
  postId: string;
  replyCount: number;
  updatedAt: string;
};
