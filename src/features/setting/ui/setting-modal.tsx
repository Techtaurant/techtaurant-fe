'use client';

import { X } from 'lucide-react';
import { useState } from 'react';

import { SETTING_TABS, type SettingTab } from '@/features/setting/config/setting-tabs';
import { LanguageSection } from '@/features/setting/ui/language-section';
import { ManagementPanel } from '@/features/setting/ui/management-panel';
import { SettingTabNav } from '@/features/setting/ui/setting-tab-nav';
import { ThemeSection } from '@/features/setting/ui/theme-section';
import { Button } from '@/shared/ui/button';
import { Modal } from '@/shared/ui/modal';

type Props = {
  overlayId: string;
  isOpen: boolean;
  onClose: () => void;
};

export function SettingModal({ overlayId, isOpen, onClose }: Props) {
  const [activeTab, setActiveTab] = useState<SettingTab>('general');

  const activeTabLabel = SETTING_TABS.find((tab) => tab.value === activeTab)?.label ?? '';

  return (
    <Modal id={overlayId} isOpen={isOpen} onClose={onClose} className="max-w-165">
      <div className="grid h-140 grid-cols-[200px_1fr]">
        <SettingTabNav activeTab={activeTab} onTabChange={setActiveTab} />
        <section className="h-full overflow-y-auto p-5">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-xl font-semibold">{activeTabLabel}</h2>
            <Button variant="icon" size="sm" className="h-9 w-9 rounded-full px-0" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>
          {activeTab === 'general' ? (
            <div>
              <ThemeSection />
              <LanguageSection />
            </div>
          ) : (
            <ManagementPanel />
          )}
        </section>
      </div>
    </Modal>
  );
}
