'use client';

import { type ChangeEvent, useId } from 'react';

import { cn } from '@/shared/lib/cn';

type Props = {
  value: string;
  maxLength: number;
  disabled?: boolean;
  onValueChange: (value: string) => void;
};

export function ProfileNameField({ value, maxLength, disabled, onValueChange }: Props) {
  const inputId = useId();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onValueChange(e.target.value);
  };

  return (
    <div>
      <label htmlFor={inputId} className="mb-2 block text-sm font-semibold">
        닉네임
      </label>
      <input
        id={inputId}
        type="text"
        value={value}
        maxLength={maxLength}
        disabled={disabled}
        placeholder="닉네임을 입력해주세요."
        onChange={handleChange}
        className={cn(
          'border-border bg-background text-foreground h-12 w-full rounded-2xl border px-4 text-base transition-colors outline-none',
          'placeholder:text-muted-foreground focus:border-foreground disabled:opacity-60',
        )}
      />
      <div className="text-muted-foreground mt-2 flex items-center justify-end text-xs font-medium">
        {value.length}/{maxLength}
      </div>
    </div>
  );
}
