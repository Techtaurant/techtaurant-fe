'use client';

import { Search, X } from 'lucide-react';
import type { ChangeEvent, InputHTMLAttributes, KeyboardEvent } from 'react';

import { cn } from '@/shared/lib/cn';

type Props = Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> & {
  hasClearButton?: boolean;
  inputClassName?: string;
  onEnter?: () => void;
  onValueChange: (value: string) => void;
  value: string;
};

export function SearchInput({
  className,
  hasClearButton = true,
  inputClassName,
  onEnter,
  onKeyDown,
  onValueChange,
  type = 'text',
  value,
  ...props
}: Props) {
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    onValueChange(event.target.value);
  };

  const handleClearButtonClick = () => {
    onValueChange('');
  };

  const handleInputKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    onKeyDown?.(event);

    if (event.defaultPrevented || event.key !== 'Enter' || !onEnter) return;

    event.preventDefault();
    onEnter();
  };
  const hasValue = value.trim().length > 0;
  const shouldShowClearButton = hasClearButton && value.length > 0;

  return (
    <label
      className={cn(
        'bg-muted flex h-9 items-center rounded-lg px-2.5 transition-colors',
        hasValue && 'bg-button-neutral-surface-hover',
        className,
      )}
    >
      <Search className="text-muted-foreground mr-2 h-4 w-4 shrink-0" aria-hidden />
      <input
        {...props}
        type={type}
        value={value}
        onChange={handleInputChange}
        onKeyDown={handleInputKeyDown}
        className={cn(
          'placeholder:text-muted-foreground text-foreground min-w-0 flex-1 bg-transparent text-sm outline-none',
          inputClassName,
        )}
      />
      {shouldShowClearButton && (
        <button
          type="button"
          className="text-muted-foreground hover:bg-muted hover:text-foreground ml-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-md transition-colors"
          aria-label="검색어 지우기"
          onClick={handleClearButtonClick}
        >
          <X className="h-3.5 w-3.5" aria-hidden />
        </button>
      )}
    </label>
  );
}
