'use client';

import { useLayoutEffect, useRef } from 'react';

const TAG_POSITION_TRANSITION_DURATION_MS = 340;
const TAG_POSITION_TRANSITION_EASING = 'cubic-bezier(0.2, 0, 0, 1)';

export const useTagPositionTransition = (visibleTagOrderKey: string) => {
  const tagElementsRef = useRef(new Map<string, HTMLLabelElement>());
  const previousTagOffsetsRef = useRef(new Map<string, number>());

  useLayoutEffect(() => {
    const nextTagOffsets = new Map<string, number>();
    const visibleTagIds = visibleTagOrderKey ? visibleTagOrderKey.split('|') : [];
    const shouldReduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    visibleTagIds.forEach((tagId) => {
      const element = tagElementsRef.current.get(tagId);

      if (!element) return;

      const nextOffsetTop = element.offsetTop;
      const previousOffsetTop = previousTagOffsetsRef.current.get(tagId);
      nextTagOffsets.set(tagId, nextOffsetTop);

      if (previousOffsetTop === undefined || shouldReduceMotion) return;

      const movedY = previousOffsetTop - nextOffsetTop;

      if (movedY === 0) return;

      element.style.transition = 'none';
      element.style.transform = `translateY(${movedY}px)`;
      element.style.willChange = 'transform';

      requestAnimationFrame(() => {
        element.style.transition = `transform ${TAG_POSITION_TRANSITION_DURATION_MS}ms ${TAG_POSITION_TRANSITION_EASING}`;
        element.style.transform = '';
      });

      const clearAnimationStyle = () => {
        element.style.transition = '';
        element.style.willChange = '';
        element.removeEventListener('transitionend', clearAnimationStyle);
      };

      element.addEventListener('transitionend', clearAnimationStyle);
    });

    previousTagOffsetsRef.current = nextTagOffsets;
  }, [visibleTagOrderKey]);

  const setTagElement = (tagId: string, element: HTMLLabelElement | null) => {
    if (!element) {
      tagElementsRef.current.delete(tagId);
      return;
    }

    tagElementsRef.current.set(tagId, element);
  };

  return { setTagElement };
};
