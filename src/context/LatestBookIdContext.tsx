import React, { createContext, useState, useContext, useEffect } from "react";

interface LatestBookContextProps {
  latestBookId: string;
  setLatestBookId: React.Dispatch<React.SetStateAction<string>>;
  prevLatestBookId: string;
  setPrevLatestBookId: React.Dispatch<React.SetStateAction<string>>;
}

interface LatestBookProviderProps {
  children: React.ReactNode;
}

const LatestBookContext = createContext<LatestBookContextProps | undefined>(undefined);

export const useLatestBook = () => {
  const context = useContext(LatestBookContext);
  if (!context) {
    throw new Error('useLatestBook must be used within a LatestBookProvider');
  }
  return context;
};

export const LatestBookProvider = ({ children }: LatestBookProviderProps) => {
  const [latestBookId, setLatestBookId] = useState<string>("");
  const [prevLatestBookId, setPrevLatestBookId] = useState<string>("");

  return (
    <LatestBookContext.Provider value={{ latestBookId, setLatestBookId, prevLatestBookId, setPrevLatestBookId }}>
      {children}
    </LatestBookContext.Provider>
  );
};
