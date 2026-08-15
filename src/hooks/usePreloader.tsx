import React, { createContext, useContext, useState } from 'react';

interface PreloaderContextType {
  isPreloaderComplete: boolean;
  setPreloaderComplete: (val: boolean) => void;
}

const PreloaderContext = createContext<PreloaderContextType>({
  isPreloaderComplete: false,
  setPreloaderComplete: () => {},
});

export const PreloaderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isPreloaderComplete, setPreloaderComplete] = useState(false);
  
  return (
    <PreloaderContext.Provider value={{ isPreloaderComplete, setPreloaderComplete }}>
      {children}
    </PreloaderContext.Provider>
  );
};

export const usePreloader = () => useContext(PreloaderContext);
