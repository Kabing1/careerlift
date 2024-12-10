import { create } from 'zustand';

type Locale = 'en' | 'fr' | 'es' | 'de';
type Translations = Record<Locale, string>;

interface LocaleState {
  currentLocale: Locale;
  setLocale: (locale: Locale) => void;
}

export const useLocaleStore = create<LocaleState>((set) => ({
  currentLocale: 'en',
  setLocale: (locale) => set({ currentLocale: locale }),
}));

export function useLocale(translations: Translations): string {
  const { currentLocale } = useLocaleStore();
  return translations[currentLocale] || translations.en;
}