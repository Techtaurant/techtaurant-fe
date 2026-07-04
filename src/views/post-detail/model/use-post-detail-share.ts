import { IS_SERVER } from '@/shared/config';
import type { PostDetailActionSnackbarState } from '@/views/post-detail/model/use-post-detail-action-snackbar';

type Params = {
  showActionSnackbar: (nextActionSnackbar: PostDetailActionSnackbarState) => void;
};

const SHARE_LINK_COPIED_MESSAGE = '링크가 복사되었습니다!';
const SHARE_LINK_COPY_FAILED_MESSAGE = '링크 복사에 실패했습니다.';

// TODO: 토스트 기반 공유 피드백 로직은 추후 별도 PR에서 변경합니다.
export const usePostDetailShare = ({ showActionSnackbar }: Params) => {
  const sharePostDetail = async () => {
    if (IS_SERVER) return;

    try {
      await navigator.clipboard.writeText(window.location.href);
      showActionSnackbar({
        message: SHARE_LINK_COPIED_MESSAGE,
        variant: 'success',
      });
    } catch {
      showActionSnackbar({
        message: SHARE_LINK_COPY_FAILED_MESSAGE,
        variant: 'error',
      });
    }
  };

  return {
    sharePostDetail,
  };
};
