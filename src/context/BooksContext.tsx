import React, { createContext, useContext, useState, ReactNode } from 'react';
import Book from '@/interfaces/bookInterface';

interface BooksContextType {
  books: Book[];
  setBooks: React.Dispatch<React.SetStateAction<Book[]>>;
}

const initialState: BooksContextType = {
  books: [],
  setBooks: () => {},
};

export const BooksContext = createContext(initialState);

interface BooksProviderProps {
  children: ReactNode;
}

export const BooksProvider: React.FC<BooksProviderProps> = ({ children }) => {
  const [books, setBooks] = useState<Book[]>([]);

  return (
    <BooksContext.Provider value={{ books, setBooks }}>
      {children}
    </BooksContext.Provider>
  );
};

export const useBooksContext = (): BooksContextType => {
  return useContext(BooksContext);
};
