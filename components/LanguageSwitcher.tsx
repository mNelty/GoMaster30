import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Languages } from 'lucide-react';

export const LanguageSwitcher: React.FC = () => {
  const { lang, setLang } = useLanguage();

  const toggleLanguage = () => {
    setLang(lang === 'en' ? 'tr' : 'en');
  };

  return (
    <div className="px-4 pb-4 border-t border-border">
      <button
        onClick={toggleLanguage}
        className="w-full flex items-center justify-center gap-2 bg-bg-inset border border-border rounded-full px-4 py-2 text-sm text-text-secondary hover:bg-bg-hover hover:text-text-primary transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-accent"
        title="Switch Language"
      >
        <Languages className="w-4 h-4" />
        <span>{lang === 'en' ? 'Türkçe' : 'English'}</span>
      </button>
    </div>
  );
};