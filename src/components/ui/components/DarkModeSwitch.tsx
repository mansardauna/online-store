import React from 'react';
import { FiSun, FiMoon } from 'react-icons/fi'; // You can use any icon from React Icons
import { useDarkMode } from './DarkMode'; // Import the useDarkMode hook or context as needed

const DarkModeSwitch:React.FC = () => {
  const { isDarkMode, toggleDarkMode } = useDarkMode(); // Get dark mode state and toggle function

  return (
    <button
      className="dark-mode-switch"
      onClick={toggleDarkMode}
      aria-label={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
    >
      {isDarkMode ? <FiSun /> : <FiMoon />}
    </button>
  );
};

export default DarkModeSwitch;
