import type { PostDetailActionSnackbarState } from '@/views/post-detail/model/use-post-detail-action-snackbar';

type AuthorFollowResult = 'followed' | 'unfollowed';

type Params = {
  authorName: string;
  isFollowingAuthor: boolean;
  showActionSnackbar: (nextActionSnackbar: PostDetailActionSnackbarState) => void;
  toggleAuthorFollow: () => Promise<AuthorFollowResult | undefined>;
};

const FOLLOW_AUTHOR_FAILED_MESSAGE = '팔로우 처리에 실패했습니다.';
const UNFOLLOW_AUTHOR_FAILED_MESSAGE = '팔로우 취소에 실패했습니다.';

export const usePostDetailAuthorFollowFeedback = ({
  authorName,
  isFollowingAuthor,
  showActionSnackbar,
  toggleAuthorFollow,
}: Params) => {
  const toggleAuthorFollowWithFeedback = async () => {
    try {
      const authorFollowResult = await toggleAuthorFollow();

      if (!authorFollowResult) return;

      if (authorFollowResult === 'followed') {
        showActionSnackbar({
          message: getFollowAuthorSuccessMessage(authorName),
          variant: 'followed',
        });
        return;
      }

      showActionSnackbar({
        message: getUnfollowAuthorSuccessMessage(authorName),
        variant: 'unfollowed',
      });
    } catch {
      showActionSnackbar({
        message: isFollowingAuthor ? UNFOLLOW_AUTHOR_FAILED_MESSAGE : FOLLOW_AUTHOR_FAILED_MESSAGE,
        variant: 'error',
      });
    }
  };

  return {
    toggleAuthorFollowWithFeedback,
  };
};

const getFollowAuthorSuccessMessage = (authorName: string) => {
  return `${authorName}님을 팔로우했습니다`;
};

const getUnfollowAuthorSuccessMessage = (authorName: string) => {
  return `${authorName}님 팔로우를 해제했어요`;
};
