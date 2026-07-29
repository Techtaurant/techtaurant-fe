'use client';

import type { CSSProperties, RefObject, SyntheticEvent } from 'react';

import {
  COMMENT_TEXTAREA_COLLAPSED_HEIGHT,
  COMMENT_TEXTAREA_EXPANDED_HEIGHT,
  COMMENT_TEXTAREA_EXPANDED_MAX_HEIGHT,
} from '@/features/post-comments/config/comment-composer';
import { cn } from '@/shared/lib/cn';

type Props = {
  commentTextareaRef: RefObject<HTMLTextAreaElement | null>;
  createCommentErrorMessage: string | null;
  isCommentCreating: boolean;
  isCommentExpanded: boolean;
  value: string;
  onCancelButtonClick: () => void;
  onChange: (value: string) => void;
  onFocus: () => void;
  onInput: (event: SyntheticEvent<HTMLTextAreaElement>) => void;
  onSubmitButtonClick: () => void;
};

const COMMENT_PLACEHOLDER = '의견을 나눠주세요!';
const COMMENT_SUBMIT_LABEL = '댓글';
const COMMENT_CANCEL_LABEL = '취소';

export function PostDetailCommentComposer({
  commentTextareaRef,
  createCommentErrorMessage,
  isCommentCreating,
  isCommentExpanded,
  value,
  onCancelButtonClick,
  onChange,
  onFocus,
  onInput,
  onSubmitButtonClick,
}: Props) {
  const textareaSizeStyle = {
    height: isCommentExpanded ? undefined : COMMENT_TEXTAREA_COLLAPSED_HEIGHT,
    maxHeight: isCommentExpanded ? COMMENT_TEXTAREA_EXPANDED_MAX_HEIGHT : COMMENT_TEXTAREA_COLLAPSED_HEIGHT,
    minHeight: isCommentExpanded ? COMMENT_TEXTAREA_EXPANDED_HEIGHT : COMMENT_TEXTAREA_COLLAPSED_HEIGHT,
  } satisfies CSSProperties;

  return (
    <div className="mb-3">
      <div className="flex-1">
        <div className="relative">
          <textarea
            ref={commentTextareaRef}
            placeholder={isCommentExpanded ? '' : COMMENT_PLACEHOLDER}
            value={value}
            className={cn(
              'border-border bg-background scrollbar-hidden w-full resize-none rounded-xl border px-4 text-base transition-colors duration-200',
              'placeholder:text-base focus:outline-none',
              'hover:bg-comment-input-hover focus:bg-comment-input-hover active:bg-comment-input-hover',
              createCommentErrorMessage
                ? 'border-form-error-border focus:border-form-error-border'
                : 'border-border focus:border-border',
              isCommentExpanded
                ? 'overflow-y-auto pt-3 pb-14 text-left'
                : 'overflow-hidden pt-[10px] pb-[10px] text-left leading-[22px]',
            )}
            rows={1}
            style={textareaSizeStyle}
            onChange={(event) => onChange(event.target.value)}
            onFocus={onFocus}
            onInput={onInput}
          />
          {isCommentExpanded && (
            <div className="absolute right-3 bottom-4 flex items-center gap-2">
              <button
                type="button"
                className={cn(
                  'border-border h-8 rounded-md border px-4 text-sm font-semibold transition-colors duration-200',
                  'text-comment-cancel-button-foreground hover:bg-muted/85 hover:text-foreground',
                )}
                onClick={onCancelButtonClick}
              >
                {COMMENT_CANCEL_LABEL}
              </button>
              <button
                type="button"
                disabled={isCommentCreating}
                className={cn(
                  'bg-comment-submit-button h-8 rounded-md px-4 text-sm font-semibold text-white transition-colors duration-200',
                  'hover:bg-comment-submit-button-hover disabled:cursor-not-allowed disabled:opacity-60',
                )}
                onClick={onSubmitButtonClick}
              >
                {COMMENT_SUBMIT_LABEL}
              </button>
            </div>
          )}
        </div>
        {createCommentErrorMessage && (
          <p className="text-form-error-foreground mt-2 px-2 text-sm font-medium">{createCommentErrorMessage}</p>
        )}
      </div>
    </div>
  );
}
