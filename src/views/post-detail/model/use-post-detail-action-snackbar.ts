import { useEffect, useState } from 'react';

export type PostDetailActionSnackbarVariant = 'blocked' | 'error' | 'followed' | 'success' | 'unfollowed';

export type PostDetailActionSnackbarState = {
  message: string;
  variant: PostDetailActionSnackbarVariant;
};

const ACTION_SNACKBAR_DURATION_MS = 3500;

export const usePostDetailActionSnackbar = () => {
  const [actionSnackbar, setActionSnackbar] = useState<PostDetailActionSnackbarState | null>(null);
  const isActionSnackbarOpen = !!actionSnackbar;
  const actionSnackbarMessage = actionSnackbar?.message ?? '';
  const actionSnackbarVariant = actionSnackbar?.variant ?? 'success';

  const showActionSnackbar = (nextActionSnackbar: PostDetailActionSnackbarState) => {
    setActionSnackbar(nextActionSnackbar);
  };

  useEffect(() => {
    if (!actionSnackbar) return;

    const timeoutId = window.setTimeout(() => {
      setActionSnackbar(null);
    }, ACTION_SNACKBAR_DURATION_MS);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [actionSnackbar]);

  return {
    actionSnackbarMessage,
    actionSnackbarVariant,
    isActionSnackbarOpen,
    showActionSnackbar,
  };
};
