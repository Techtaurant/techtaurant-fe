'use client';

import { useSyncExternalStore } from 'react';

import { LOCALE_COOKIE_KEY, LOCALES, type LocaleValue } from '@/shared/config/locale';
import { getCookie, setCookie } from '@/shared/lib/cookie';

const listeners = new Set<() => void>();

const subscribe = (onStoreChange: () => void) => {
  listeners.add(onStoreChange);
  return () => {
    listeners.delete(onStoreChange);
  };
};

const isValidLocale = (value: string | null): value is LocaleValue => {
  return LOCALES.some((locale) => locale === value);
};

const handleStoreChange = () => {
  const localeCookieValue = getCookie(LOCALE_COOKIE_KEY);
  return isValidLocale(localeCookieValue) ? localeCookieValue : null;
};

const getServerSnapshot = () => {
  return null;
};

export const useLocalePreference = () => {
  const locale = useSyncExternalStore(subscribe, handleStoreChange, getServerSnapshot);

  const setLocale = (locale: LocaleValue) => {
    setCookie(LOCALE_COOKIE_KEY, locale);
    listeners.forEach((listener) => listener());
  };

  return { locale, setLocale };
};
