'use client';

import type { RefObject } from 'react';
import { useEffect } from 'react';

export type FloatingAlign = 'center' | 'start' | 'end';

type Params = {
  enabled: boolean;
  anchorRef: RefObject<HTMLElement | null> | null;
  floatingRef: RefObject<HTMLElement | null> | null;
  options?: {
    align?: FloatingAlign;
    offsetX?: number;
    offsetY?: number;
  };
};

const getLeft = (
  align: FloatingAlign,
  anchorWidth: number,
  anchorLeft: number,
  offsetX: number,
  floatingWidth: number,
) => {
  if (align === 'start') return `${anchorLeft + offsetX}px`;
  if (align === 'center') return `${anchorLeft + anchorWidth / 2 + offsetX}px`;
  return `${anchorLeft + anchorWidth - floatingWidth + offsetX}px`;
};

const getTransform = (align: FloatingAlign) => {
  if (align === 'center') return 'translateX(-50%)';
  return 'none';
};

export const useFloatingPosition = ({ enabled, anchorRef, floatingRef, options }: Params) => {
  const { offsetX = 0, offsetY = 0, align = 'center' } = options ?? {};

  useEffect(() => {
    let rafId: number | null = null;

    const updatePosition = () => {
      if (!anchorRef?.current || !floatingRef?.current) return;

      const { width, left, bottom } = anchorRef.current.getBoundingClientRect();
      const floatingWidth = floatingRef.current.offsetWidth;

      rafId = requestAnimationFrame(() => {
        if (!floatingRef.current) return;

        floatingRef.current.style.left = getLeft(align, width, left, offsetX, floatingWidth);
        floatingRef.current.style.top = `${bottom + offsetY}px`;
        floatingRef.current.style.transform = getTransform(align);
      });
    };

    if (enabled) {
      updatePosition();
      window.addEventListener('scroll', updatePosition, true);
      window.addEventListener('resize', updatePosition);
    }

    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId);

      window.removeEventListener('scroll', updatePosition, true);
      window.removeEventListener('resize', updatePosition);
    };
  }, [align, anchorRef, enabled, floatingRef, offsetX, offsetY]);
};
