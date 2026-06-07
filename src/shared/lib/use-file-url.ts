'use client';

import { useEffect, useMemo } from 'react';

export const useFileUrl = (file?: File | null) => {
  const fileUrl = useMemo(() => (file ? URL.createObjectURL(file) : null), [file]);

  useEffect(() => {
    if (!fileUrl) return;

    return () => URL.revokeObjectURL(fileUrl);
  }, [fileUrl]);

  return fileUrl;
};
