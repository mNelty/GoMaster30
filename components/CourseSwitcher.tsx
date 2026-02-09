import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { ArrowRightLeft } from 'lucide-react';

export const CourseSwitcher: React.FC = () => {
  const { course, setCourse, t } = useLanguage();
  const isGo = course === 'go';

  const handleToggle = () => {
    setCourse(isGo ? 'python' : 'go');
  };

  return (
    <button
      onClick={handleToggle}
      className="inline-flex items-center gap-2 rounded-full border border-border bg-bg-secondary/90 px-4 py-2 text-sm font-semibold text-text-secondary shadow-sm transition-all duration-200 hover:bg-bg-hover hover:text-text-primary hover:shadow-md focus:outline-none focus:ring-2 focus:ring-accent"
    >
      <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-bg-tertiary text-text-primary">
        <ArrowRightLeft className="h-4 w-4" />
      </span>
      {isGo ? t('switchToPython') : t('switchToGo')}
    </button>
  );
};
