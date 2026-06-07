'use client';

import { SETTING_TABS, type SettingTab } from '@/features/setting/config/setting-tabs';
import { cn } from '@/shared/lib/cn';

type Props = {
  activeTab: SettingTab;
  onTabChange: (tab: SettingTab) => void;
};

export function SettingTabNav({ activeTab, onTabChange }: Props) {
  return (
    <aside className="border-border border-r p-4">
      <nav className="flex flex-col gap-2">
        {SETTING_TABS.map(({ value, label }) => (
          <button
            key={value}
            onClick={() => onTabChange(value)}
            className={cn(
              'h-10 rounded-lg px-3 text-left text-sm font-semibold transition-colors',
              activeTab === value
                ? 'bg-muted text-foreground'
                : 'text-muted-foreground hover:bg-muted hover:text-foreground',
            )}
          >
            {label}
          </button>
        ))}
      </nav>
    </aside>
  );
}
