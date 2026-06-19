"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { en, type Messages } from "./en";
import { es } from "./es";

type Locale = 'en' | 'es';

const messages: Record<Locale, Messages> = { en, es };

interface LocaleContextType {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: (key: keyof Messages) => string;
}

const LocaleContext = createContext<LocaleContextType>({
  locale: 'en',
  setLocale: () => {},
  t: (key) => en[key],
});

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('en');

  useEffect(() => {
    try {
      const isDispatchRoute = typeof window !== 'undefined' && 
        (window.location.pathname.startsWith('/live') || 
         window.location.pathname.startsWith('/schedule') ||
         window.location.pathname.startsWith('/calendar') ||
         window.location.pathname.startsWith('/intel') ||
         window.location.pathname.startsWith('/hr') ||
         window.location.pathname.startsWith('/team') ||
         window.location.pathname.startsWith('/billing') ||
         window.location.pathname.startsWith('/compliance') ||
         window.location.pathname.startsWith('/weekly-schedule'));

      const key = isDispatchRoute ? 'aptLocale_dispatch' : 'aptLocale_tech';
      const saved = localStorage.getItem(key) as Locale | null;
      
      if (isDispatchRoute) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setLocaleState('en'); // Enforce English default for dispatch
      } else if (saved === 'en' || saved === 'es') {
         
        setLocaleState(saved);
      }
    } catch {
      // localStorage unavailable — default 'en'
    }
  }, []);

  function setLocale(l: Locale) {
    setLocaleState(l);
    try {
      const isDispatchRoute = typeof window !== 'undefined' && 
        (window.location.pathname.startsWith('/live') || 
         window.location.pathname.startsWith('/schedule'));
      const key = isDispatchRoute ? 'aptLocale_dispatch' : 'aptLocale_tech';
      localStorage.setItem(key, l);
    } catch {
      // localStorage unavailable
    }
  }

  const t = (key: keyof Messages): string => messages[locale][key];

  return (
    <LocaleContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useTranslation() {
  return useContext(LocaleContext);
}
