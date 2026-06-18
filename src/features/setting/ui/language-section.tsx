'use client';

import { LOCALE_OPTIONS } from '@/features/setting/config/locale-options';
import { useLocalePreference } from '@/features/setting/model/use-locale-preference';
import { cn } from '@/shared/lib/cn';

export function LanguageSection() {
  const { locale, setLocale } = useLocalePreference();

  return (
    <section className="border-border mt-6 border-t pt-6">
      <h3 className="text-base font-semibold">언어</h3>
      <p className="text-muted-foreground mt-1 text-sm">앱에 표시할 언어를 선택하세요.</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {LOCALE_OPTIONS.map((option) => (
          <button
            key={option.value}
            onClick={() => setLocale(option.value)}
            className={cn(
              'h-9 rounded-lg px-3 text-sm font-semibold transition-colors',
              locale === option.value ? 'bg-muted text-foreground' : 'text-muted-foreground hover:bg-muted',
            )}
          >
            {option.label}
          </button>
        ))}
      </div>
    </section>
  );
}
