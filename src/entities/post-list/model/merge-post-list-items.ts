import type {
  PostContentListItemResponse,
  PostListItemResponse,
  PostMetadataResponse,
  PostViewerStateResponse,
  UserProfileImageResponse,
} from '@/shared/api/generated';
import { PostListItemResponseStatus } from '@/shared/api/generated';

type Params = {
  metadatas?: PostMetadataResponse[];
  posts: PostContentListItemResponse[];
  profileImages?: UserProfileImageResponse[];
  viewerStates?: PostViewerStateResponse[];
};

type PostListItem = PostListItemResponse & {
  isBanned: boolean;
};

export const mergePostListItems = ({
  metadatas = [],
  posts,
  profileImages = [],
  viewerStates = [],
}: Params): PostListItem[] => {
  const metadataMap = new Map(metadatas.map((metadata) => [metadata.postId, metadata]));
  const profileImageMap = new Map(profileImages.map((profileImage) => [profileImage.userId, profileImage]));
  const viewerStateMap = new Map(viewerStates.map((viewerState) => [viewerState.postId, viewerState]));

  return posts.map((post) => {
    const metadata = metadataMap.get(post.id);
    const profileImage = profileImageMap.get(post.authorId);
    const viewerState = viewerStateMap.get(post.id);

    return {
      ...post,
      category: post.category ? { ...post.category, postCount: 0 } : undefined,
      authorName: profileImage?.authorName ?? '',
      authorProfileImageUrl: profileImage?.profileImageUrl ?? '',
      thumbnailUrl: metadata?.thumbnailUrl ?? '',
      isBanned: viewerState?.isBanned ?? false,
      isRead: viewerState?.isRead ?? false,
      viewCount: metadata?.viewCount ?? 0,
      likeCount: metadata?.likeCount ?? 0,
      commentCount: metadata?.commentCount ?? 0,
      status: metadata?.status ?? PostListItemResponseStatus.PUBLISHED,
    };
  });
};
