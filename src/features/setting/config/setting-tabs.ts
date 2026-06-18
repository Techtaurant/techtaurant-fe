export type SettingTab = 'general' | 'management';

export const SETTING_TABS = [
  { value: 'general', label: '일반' },
  { value: 'management', label: '관리' },
] satisfies { value: SettingTab; label: string }[];
