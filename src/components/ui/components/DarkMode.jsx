import React, { createContext, useContext, useState, useEffect } from 'react';

// Create a context
const DarkMode = createContext();

// Create a custom hook to use the context
export const useDarkMode = () => {
  return useContext(DarkMode);
};

// Create a context provider component
export const DarkModeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // JavaScript to toggle dark mode
  const toggleDarkMode = () => {
    const htmlElement = document.querySelector('html');
    htmlElement.classList.toggle('dark');
    localStorage.setItem('darkMode', htmlElement.classList.contains('dark'));
  };

  useEffect(() => {
    const userPrefersDarkMode = localStorage.getItem('darkMode') === 'true';
    setIsDarkMode(userPrefersDarkMode);
  }, []);

  useEffect(() => {
    const htmlElement = document.querySelector('html');
    if (isDarkMode) {
      htmlElement.classList.add('dark');
    } else {
      htmlElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', isDarkMode);
  }, [isDarkMode]);

  return (
    <DarkMode.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </DarkMode.Provider>
  );
};
