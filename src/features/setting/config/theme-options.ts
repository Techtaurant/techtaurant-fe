export type ThemeMode = 'light' | 'dark' | 'system';

export const THEME_OPTIONS = [
  { value: 'dark', label: '다크' },
  { value: 'light', label: '라이트' },
  { value: 'system', label: '시스템' },
] satisfies { value: ThemeMode; label: string }[];
