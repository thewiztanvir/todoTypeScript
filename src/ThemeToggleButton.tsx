// src/ThemeToggle.jsx
import React, { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import { ThemeContext } from './ThemeContext';

function ThemeToggleButton() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <button onClick={toggleTheme} className="theme-toggle">
      <FontAwesomeIcon icon={theme === 'light' ? faMoon : faSun} />
    </button>
  );
}

export default ThemeToggleButton;
