import React, { createContext, useState, useEffect, useContext, useMemo } from 'react';
import en from '../locales/en.json';
import tr from '../locales/tr.json';
import { CourseData } from '../types';

type Language = 'en' | 'tr';

interface Translations {
  ui: { [key: string]: string };
  COURSE_CONTENT: CourseData;
}

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: string, ...args: (string | number)[]) => string;
  courseContent: CourseData;
}

const translations: { [key in Language]: Translations } = { en, tr };

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const getNestedTranslation = (obj: any, key: string): string | undefined => {
  return key.split('.').reduce((o, i) => (o ? o[i] : undefined), obj);
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLang] = useState<Language>(() => {
    const savedLang = localStorage.getItem('language') as Language;
    return ['en', 'tr'].includes(savedLang) ? savedLang : 'en'; // Default to 'en'
  });

  useEffect(() => {
    localStorage.setItem('language', lang);
    document.documentElement.lang = lang;
  }, [lang]);

  const t = (key: string, ...args: (string | number)[]): string => {
    const translation = getNestedTranslation(translations[lang].ui, key) || key;
    
    if (args.length === 0) {
      return translation;
    }
    
    return translation.replace(/{(\d+)}/g, (match, number) => {
      const index = parseInt(number, 10);
      return typeof args[index] !== 'undefined' ? String(args[index]) : match;
    });
  };
  
  const courseContent = translations[lang].COURSE_CONTENT;

  const value = useMemo(() => ({ lang, setLang, t, courseContent }), [lang, t, courseContent]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};