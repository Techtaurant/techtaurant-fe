'use client';

import { motion } from 'motion/react';
import { useLayoutEffect, useRef, useState } from 'react';

import type { TagResponse } from '@/entities/tag';
import { MAX_COLLAPSED_TAG_FILTER_ITEMS } from '@/features/post-list-filter/config/constants';
import { cn } from '@/shared/lib/cn';

const POST_LIST_FILTER_SCROLL_CONTAINER_SELECTOR = '[data-post-list-filter-scroll-container]';
const TAG_POSITION_TRANSITION_DURATION_SECONDS = 0.34;
const TAG_POSITION_TRANSITION_EASE: [number, number, number, number] = [0.2, 0, 0, 1];

type ScrollRestoreSnapshot = {
  scrollContainer: HTMLElement;
  scrollTop: number;
};

type Props = {
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  onFetchNextPage: () => void;
  onToggleTag: (tagId: string) => void;
  selectedTagIds: string[];
  tags: TagResponse[];
};

export function TagFilterList({
  hasNextPage,
  isFetchingNextPage,
  onFetchNextPage,
  onToggleTag,
  selectedTagIds,
  tags,
}: Props) {
  const [isExpanded, setIsExpanded] = useState(false);
  const scrollRestoreRef = useRef<ScrollRestoreSnapshot | null>(null);
  const selectedTagIdSet = new Set(selectedTagIds);
  const tagMap = new Map(tags.map((tag) => [tag.id, tag]));
  const selectedTags = selectedTagIds.flatMap((tagId) => {
    const tag = tagMap.get(tagId);
    if (!tag) return [];
    return [tag];
  });
  const orderedTags = [...selectedTags, ...tags.filter((tag) => !selectedTagIdSet.has(tag.id))];
  const visibleTags = isExpanded ? orderedTags : orderedTags.slice(0, MAX_COLLAPSED_TAG_FILTER_ITEMS);

  const hiddenTagCount = Math.max(orderedTags.length - MAX_COLLAPSED_TAG_FILTER_ITEMS, 0);
  const shouldShowMoreButton = hiddenTagCount > 0 || hasNextPage;

  const handleTagToggle = (tagId: string, checkboxElement: HTMLInputElement) => {
    const scrollContainer = checkboxElement.closest(POST_LIST_FILTER_SCROLL_CONTAINER_SELECTOR);

    if (scrollContainer instanceof HTMLElement) {
      scrollRestoreRef.current = {
        scrollContainer,
        scrollTop: scrollContainer.scrollTop,
      };
    }

    onToggleTag(tagId);
  };

  const handleMoreButtonClick = () => {
    if (!isExpanded && hiddenTagCount > 0) {
      setIsExpanded(true);
      return;
    }

    if (hasNextPage) {
      setIsExpanded(true);
      onFetchNextPage();
      return;
    }

    setIsExpanded(false);
  };

  const getMoreButtonLabel = () => {
    if (isExpanded && !hasNextPage) return '접기';
    return '더보기';
  };

  useLayoutEffect(() => {
    const scrollSnapshot = scrollRestoreRef.current;

    if (!scrollSnapshot) return;

    const { scrollContainer, scrollTop } = scrollSnapshot;

    scrollContainer.scrollTop = scrollTop;

    const animationFrameId = requestAnimationFrame(() => {
      scrollContainer.scrollTop = scrollTop;
      scrollRestoreRef.current = null;
    });

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [selectedTagIds]);

  if (orderedTags.length <= 0) return null;

  return (
    <div className="flex flex-col gap-1.5">
      {visibleTags.map((tag) => (
        <motion.label
          key={tag.id}
          layout
          transition={{
            duration: TAG_POSITION_TRANSITION_DURATION_SECONDS,
            ease: TAG_POSITION_TRANSITION_EASE,
          }}
          className={cn(
            'hover:bg-muted flex w-full cursor-pointer items-center gap-2.5 rounded-lg px-2 py-1.5 transition-colors select-none',
            selectedTagIdSet.has(tag.id) && 'bg-muted',
          )}
        >
          <input
            type="checkbox"
            checked={selectedTagIdSet.has(tag.id)}
            onChange={(event) => handleTagToggle(tag.id, event.currentTarget)}
            className="border-border h-4 w-4 cursor-pointer rounded"
          />
          <span className="text-foreground min-w-0 flex-1 truncate text-sm">#{tag.name}</span>
          <span className="text-muted-foreground text-xs">{tag.postCount}</span>
        </motion.label>
      ))}
      {shouldShowMoreButton && (
        <button
          type="button"
          disabled={isFetchingNextPage}
          className={cn(
            'text-muted-foreground hover:bg-muted mt-1 rounded-lg px-2 py-1.5 text-left text-sm transition-[background-color,opacity] disabled:cursor-not-allowed',
            isFetchingNextPage && 'opacity-60',
          )}
          onClick={handleMoreButtonClick}
        >
          {getMoreButtonLabel()}
        </button>
      )}
    </div>
  );
}
