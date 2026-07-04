'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

import { usePostDetailReadGuide } from '@/features/post-detail-interactions/model/use-post-detail-read-guide';

const MARK_READ_TOAST_MESSAGE = '👏 읽음 표시했어요';
const MARK_UNREAD_TOAST_MESSAGE = '미읽음으로 표시했어요';
const READ_TOGGLE_PRESS_RESET_MS = 320;
const READ_TOGGLE_TOAST_DURATION_MS = 1100;

type Params = {
  isLoggedIn: boolean;
  isRead: boolean;
  onMarkReadAnimationStart: () => void;
  onToggleRead: () => void;
};

export const usePostDetailReadToggleFeedback = ({
  isLoggedIn,
  isRead,
  onMarkReadAnimationStart,
  onToggleRead,
}: Params) => {
  const [isPressingReadToggle, setIsPressingReadToggle] = useState(false);
  const [readToggleToastMessage, setReadToggleToastMessage] = useState<string | null>(null);
  const pressTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const toastTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { dismissReadGuide, isReadGuideVisible } = usePostDetailReadGuide({ isLoggedIn });

  const showReadToggleToast = useCallback((nextReadState: boolean) => {
    if (nextReadState) {
      setReadToggleToastMessage(MARK_READ_TOAST_MESSAGE);
    } else {
      setReadToggleToastMessage(MARK_UNREAD_TOAST_MESSAGE);
    }

    if (toastTimerRef.current) {
      clearTimeout(toastTimerRef.current);
    }

    toastTimerRef.current = setTimeout(() => {
      setReadToggleToastMessage(null);
      toastTimerRef.current = null;
    }, READ_TOGGLE_TOAST_DURATION_MS);
  }, []);

  const resetPressStateLater = useCallback(() => {
    if (pressTimerRef.current) {
      clearTimeout(pressTimerRef.current);
    }

    pressTimerRef.current = setTimeout(() => {
      setIsPressingReadToggle(false);
    }, READ_TOGGLE_PRESS_RESET_MS);
  }, []);

  const handleToggleRead = useCallback(() => {
    if (!isLoggedIn) {
      onToggleRead();
      return;
    }

    const nextReadState = !isRead;

    if (nextReadState) {
      onMarkReadAnimationStart();
    }

    dismissReadGuide();
    showReadToggleToast(nextReadState);
    setIsPressingReadToggle(true);
    resetPressStateLater();
    onToggleRead();
  }, [
    dismissReadGuide,
    isLoggedIn,
    isRead,
    onMarkReadAnimationStart,
    onToggleRead,
    resetPressStateLater,
    showReadToggleToast,
  ]);

  const handleReadPointerDown = useCallback(() => {
    if (!isLoggedIn) return;

    setIsPressingReadToggle(true);
  }, [isLoggedIn]);

  const handleReadPointerUp = useCallback(() => {
    if (!isLoggedIn) return;

    resetPressStateLater();
  }, [isLoggedIn, resetPressStateLater]);

  useEffect(() => {
    return () => {
      if (pressTimerRef.current) {
        clearTimeout(pressTimerRef.current);
      }

      if (toastTimerRef.current) {
        clearTimeout(toastTimerRef.current);
      }
    };
  }, []);

  return {
    handleReadPointerDown,
    handleReadPointerUp,
    handleToggleRead,
    isPressingReadToggle,
    isReadGuideVisible,
    readToggleToastMessage,
  };
};
