import React, { createContext, useContext, useState, useEffect } from 'react';

const SafeModeContext = createContext();

export const useSafeMode = () => {
  const context = useContext(SafeModeContext);
  if (!context) {
    throw new Error('useSafeMode must be used within a SafeModeProvider');
  }
  return context;
};

export const SafeModeProvider = ({ children }) => {
  const [safeMode, setSafeModeState] = useState(() => {
    const saved = localStorage.getItem('safeMode');
    return saved !== null ? JSON.parse(saved) : true;
  });

  useEffect(() => {
    localStorage.setItem('safeMode', JSON.stringify(safeMode));
  }, [safeMode]);

  const setSafeMode = (value) => {
    setSafeModeState(value);
  };

  const getCurrentPort = () => {
    return safeMode ? '3000' : '5000';
  };

  const isSafeMode = () => {
    return safeMode;
  };

  const value = {
    safeMode,
    setSafeMode,
    getCurrentPort,
    isSafeMode
  };

  return (
    <SafeModeContext.Provider value={value}>
      {children}
    </SafeModeContext.Provider>
  );
};
