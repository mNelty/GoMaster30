import React from 'react';
import { useTheme, Theme } from '../contexts/ThemeContext';
import { Sun, Moon, Zap } from 'lucide-react';

const themeOptions: { name: Theme; icon: React.ElementType, title: string }[] = [
  { name: 'light', icon: Sun, title: 'Light Theme' },
  { name: 'dark-blue', icon: Moon, title: 'Dark Blue Theme' },
  { name: 'dark-yellow', icon: Zap, title: 'Dark Yellow Theme' },
];

export const ThemeSwitcher: React.FC = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div className="p-4 border-t border-border">
        <div className="flex justify-around items-center bg-bg-inset p-1 rounded-full border border-border">
        {themeOptions.map((option) => (
            <button
            key={option.name}
            onClick={() => setTheme(option.name)}
            className={`p-2 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-accent ${
                theme === option.name
                ? 'bg-accent text-accent-text shadow-md'
                : 'text-text-muted hover:text-text-primary hover:bg-bg-hover'
            }`}
            aria-label={option.title}
            title={option.title}
            >
            <option.icon className="w-5 h-5" />
            </button>
        ))}
        </div>
    </div>
  );
};
