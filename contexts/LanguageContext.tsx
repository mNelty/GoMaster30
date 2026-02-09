import React, { createContext, useState, useEffect, useContext, useMemo } from 'react';
import en from '../locales/en.json';
import tr from '../locales/tr.json';
import { CourseCollection, CourseData, CourseKey } from '../types';

type Language = 'en' | 'tr';

interface Translations {
  ui: { [key: string]: string };
  COURSES: CourseCollection;
}

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  course: CourseKey;
  setCourse: (course: CourseKey) => void;
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

  const [course, setCourse] = useState<CourseKey>(() => {
    const savedCourse = localStorage.getItem('course') as CourseKey;
    return ['go', 'python'].includes(savedCourse) ? savedCourse : 'go';
  });

  useEffect(() => {
    localStorage.setItem('language', lang);
    document.documentElement.lang = lang;
  }, [lang]);

  useEffect(() => {
    localStorage.setItem('course', course);
  }, [course]);

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
  
  const courseContent = translations[lang].COURSES[course];

  const value = useMemo(
    () => ({ lang, setLang, course, setCourse, t, courseContent }),
    [lang, course, t, courseContent]
  );

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
