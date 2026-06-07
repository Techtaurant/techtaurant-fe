'use client';

import { useTheme } from 'next-themes';

import { THEME_OPTIONS, type ThemeMode } from '@/features/setting/config/theme-options';
import { ThemePreview } from '@/features/setting/ui/theme-preview';
import { cn } from '@/shared/lib/cn';

const getCurrentTheme = (theme?: string): ThemeMode => {
  if (theme === 'light' || theme === 'dark') return theme;
  return 'system';
};

export function ThemeSection() {
  const { theme, setTheme } = useTheme();
  const activeTheme = getCurrentTheme(theme);

  return (
    <section>
      <h3 className="text-base font-semibold">화면 테마</h3>
      <p className="text-muted-foreground mt-1 text-sm">앱에 적용할 밝기 모드를 선택하세요.</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {THEME_OPTIONS.map(({ value, label }) => (
          <button
            key={value}
            onClick={() => setTheme(value)}
            className={cn(
              'inline-flex items-center gap-2 rounded-lg px-1.5 py-1 text-sm transition-colors',
              activeTheme === value ? 'font-bold' : 'hover:bg-muted font-normal',
            )}
          >
            <ThemePreview mode={value} isActive={activeTheme === value} />
            <span>{label}</span>
          </button>
        ))}
      </div>
    </section>
  );
}
