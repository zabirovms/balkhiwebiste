import { createContext, useContext } from 'react';
import React from 'react';

interface PoemContextType {
  openPoemModal: (poem: any) => void;
}

// Create context with default values
export const PoemContext = createContext<PoemContextType>({
  openPoemModal: () => {},
});

// Provider component
export const PoemProvider = ({ 
  children, 
  value 
}: { 
  children: React.ReactNode, 
  value: PoemContextType 
}) => {
  return React.createElement(
    PoemContext.Provider,
    { value },
    children
  );
};

// Hook to use the poem context
export const usePoem = () => useContext(PoemContext);