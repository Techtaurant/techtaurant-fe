'use client';

import { motion } from 'motion/react';
import { useState } from 'react';

import type { TagResponse } from '@/entities/tag';
import { MAX_COLLAPSED_TAG_FILTER_ITEMS } from '@/features/post-list-filter/config/constants';
import { cn } from '@/shared/lib/cn';

const TAG_POSITION_TRANSITION_DURATION_SECONDS = 0.34;
const TAG_POSITION_TRANSITION_EASE: [number, number, number, number] = [0.2, 0, 0, 1];

type Props = {
  onToggleTag: (tagId: string) => void;
  selectedTagIds: string[];
  shouldShowEmptyMessage: boolean;
  tags: TagResponse[];
};

export function TagFilterList({ onToggleTag, selectedTagIds, shouldShowEmptyMessage, tags }: Props) {
  const [isExpanded, setIsExpanded] = useState(false);
  const selectedTagIdSet = new Set(selectedTagIds);
  const tagMap = new Map(tags.map((tag) => [tag.id, tag]));
  const selectedTags = selectedTagIds.flatMap((tagId) => {
    const tag = tagMap.get(tagId);
    return tag ? [tag] : [];
  });
  const orderedTags = [...selectedTags, ...tags.filter((tag) => !selectedTagIdSet.has(tag.id))];
  const visibleTags = isExpanded ? orderedTags : orderedTags.slice(0, MAX_COLLAPSED_TAG_FILTER_ITEMS);

  const handleToggleExpanded = () => {
    setIsExpanded((prev) => !prev);
  };

  if (orderedTags.length <= 0) {
    return shouldShowEmptyMessage ? (
      <p className="text-muted-foreground px-2 py-3 text-sm">검색된 태그가 없습니다.</p>
    ) : null;
  }

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
            'hover:bg-muted flex cursor-pointer items-center gap-2.5 rounded-lg px-2 py-1.5 transition-colors',
            selectedTagIdSet.has(tag.id) && 'bg-muted',
          )}
        >
          <input
            type="checkbox"
            checked={selectedTagIdSet.has(tag.id)}
            onChange={() => onToggleTag(tag.id)}
            className="border-border h-4 w-4 rounded"
          />
          <span className="text-foreground min-w-0 flex-1 truncate text-sm">#{tag.name}</span>
          <span className="text-muted-foreground text-xs">{tag.postCount}</span>
        </motion.label>
      ))}
      {orderedTags.length > MAX_COLLAPSED_TAG_FILTER_ITEMS && (
        <button
          type="button"
          className="text-muted-foreground hover:bg-muted mt-1 rounded-lg px-2 py-1.5 text-left text-sm transition-colors"
          onClick={handleToggleExpanded}
        >
          {isExpanded ? '접기' : `${orderedTags.length - MAX_COLLAPSED_TAG_FILTER_ITEMS}개 더보기`}
        </button>
      )}
    </div>
  );
}
