export const LOCALES = ['ko', 'en', 'ja', 'zh'] as const;

export type LocaleValue = (typeof LOCALES)[number];

export const LOCALE_COOKIE_KEY = 'locale';

export const DEFAULT_LOCALE: LocaleValue = 'ko';
