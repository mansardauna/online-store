import React, { createContext, useContext, useState, useEffect } from 'react';

// Create a context
interface DarkModeContextType {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const DarkMode = createContext<DarkModeContextType | undefined>(undefined);

// Create a custom hook to use the context
export const useDarkMode = () => {
  const context = useContext(DarkMode);
  if (context === undefined) {
    throw new Error('useDarkMode must be used within a DarkModeProvider');
  }
  return context;
};

// Create a context provider component
interface DarkModeProviderProps {
  children: React.ReactNode;
}

export const DarkModeProvider: React.FC<DarkModeProviderProps> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // JavaScript to toggle dark mode
  const toggleDarkMode = () => {
    const htmlElement = document.querySelector('html');
    if (htmlElement) {
      htmlElement.classList.toggle('dark');
      localStorage.setItem('darkMode', htmlElement.classList.contains('dark'));
    }
  };

  useEffect(() => {
    const userPrefersDarkMode = localStorage.getItem('darkMode') === 'true';
    setIsDarkMode(userPrefersDarkMode);
  }, []);

  useEffect(() => {
    const htmlElement = document.querySelector('html');
    if (htmlElement) {
      if (isDarkMode) {
        htmlElement.classList.add('dark');
      } else {
        htmlElement.classList.remove('dark');
      }
      localStorage.setItem('darkMode', isDarkMode);
    }
  }, [isDarkMode]);

  return (
    <DarkMode.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </DarkMode.Provider>
  );
};
