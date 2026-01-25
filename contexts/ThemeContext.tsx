import React, { createContext, useState, useEffect, useContext, useMemo } from 'react';

// Define the possible theme names
export type Theme = 'dark-blue' | 'light' | 'dark-yellow';

// Define the shape of the context
interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

// Create the context
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Create the provider component
export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    // Check for saved theme in localStorage, default to 'dark-blue'
    const savedTheme = localStorage.getItem('theme') as Theme;
    // Basic validation to ensure the saved theme is one of the allowed values
    if (['dark-blue', 'light', 'dark-yellow'].includes(savedTheme)) {
      return savedTheme;
    }
    return 'dark-blue';
  });

  // Effect to apply the theme class to the root element and save to localStorage
  useEffect(() => {
    const root = document.documentElement;
    // Remove old theme classes
    root.classList.remove('dark-blue', 'light', 'dark-yellow');
    // Add the new theme class
    root.classList.add(theme);
    // Save the theme choice
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Memoize the context value to prevent unnecessary re-renders
  const value = useMemo(() => ({ theme, setTheme }), [theme]);

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to use the theme context
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
