'use client';

import { Search } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { type ChangeEvent, type SyntheticEvent, useState } from 'react';

import { cn } from '@/shared/lib/cn';

export function GlobalSearchForm() {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const router = useRouter();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleFormSubmit = (event: SyntheticEvent<HTMLFormElement, SubmitEvent>) => {
    event.preventDefault();
    const query = searchQuery.trim();

    if (!query) return;
    router.push(`/search?query=${encodeURIComponent(query)}`);
  };

  return (
    <form onSubmit={handleFormSubmit} className={cn('mx-8 hidden w-full max-w-150', 'md:flex')}>
      <label className="bg-muted flex h-9 w-full items-center rounded-xl border border-none px-3 transition-colors">
        <Search className="mr-3 h-4.5 w-4.5 shrink-0" />
        <input
          value={searchQuery}
          onChange={handleInputChange}
          placeholder="검색"
          className={cn(
            'text-foreground min-w-0 flex-1 bg-transparent text-sm outline-none',
            'autofill:bg-transparent',
          )}
        />
      </label>
    </form>
  );
}
