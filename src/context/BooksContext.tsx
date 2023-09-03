import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import Book from '@/interfaces/bookInterface';

interface State {
  books: Book[];
  error: string;
  loading: boolean;
  totalDocuments: number;
  totalPages: number;
  currentPage: number;
}

type Action =
  | { type: 'SET_BOOKS'; payload: Book[] }
  | { type: 'APPEND_BOOKS'; payload: Book[] }
  | { type: 'CLEAR_BOOKS' }
  | { type: 'SET_ERROR'; payload: string }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_TOTAL_DOCUMENTS'; payload: number }
  | { type: 'SET_TOTAL_PAGES'; payload: number }
  | { type: 'SET_CURRENT_PAGE'; payload: number };

interface BooksContextType {
  state: State;
  dispatch: React.Dispatch<Action>;
}

const initialState: State = {
  books: [],
  error: '',
  loading: false,
  totalDocuments: 0,
  totalPages: 0,
  currentPage: 1,
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_BOOKS':
      return { ...state, books: action.payload, loading: false };
    case 'APPEND_BOOKS':
      return { ...state, books: [...state.books, ...action.payload], loading: false };
    case 'CLEAR_BOOKS':
      return { ...state, books: [], loading: false };  
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_TOTAL_DOCUMENTS':
      return { ...state, totalDocuments: action.payload };
    case 'SET_TOTAL_PAGES':
      return { ...state, totalPages: action.payload };
    case 'SET_CURRENT_PAGE':
      return { ...state, currentPage: action.payload };
    default:
      return state;
  }
};

export const BooksContext = createContext<BooksContextType | undefined>(undefined);

interface BooksProviderProps {
  children: ReactNode;
}

export const BooksProvider: React.FC<BooksProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <BooksContext.Provider value={{ state, dispatch }}>
      {children}
    </BooksContext.Provider>
  );
};

export const useBooksContext = (): BooksContextType => {
  const context = useContext(BooksContext);
  if (!context) {
    throw new Error("useBooksContext must be used within a BooksProvider");
  }
  return context;
};
