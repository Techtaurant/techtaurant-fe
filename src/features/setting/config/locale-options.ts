import type { LocaleValue } from '@/shared/config/locale';

export const LOCALE_OPTIONS = [
  { value: 'ko', label: '한국어' },
  { value: 'en', label: 'English' },
  { value: 'ja', label: '日本語' },
  { value: 'zh', label: '中文' },
] satisfies { value: LocaleValue; label: string }[];
