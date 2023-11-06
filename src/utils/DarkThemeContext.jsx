import React, { createContext, useContext, useState, useCallback } from "react";

// Create the context
const DarkThemeContext = createContext();

export const useDarkTheme = () => {
  return useContext(DarkThemeContext);
};

export const DarkThemeProvider = ({ children }) => {
  const [isDarkTheme, setDarkTheme] = useState(false);

  const toggleDarkTheme = useCallback(() => {
    setDarkTheme((prevTheme) => !prevTheme);
  }, []);

  return (
    <DarkThemeContext.Provider value={{ isDarkTheme, toggleDarkTheme }}>
      {children}
    </DarkThemeContext.Provider>
  );
};
