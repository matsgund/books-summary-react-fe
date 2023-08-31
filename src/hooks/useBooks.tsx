import { useReducer, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import client from '@/utils/sanityClient';
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
  | { type: 'SET_ERROR'; payload: string }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_TOTAL_DOCUMENTS'; payload: number }
  | { type: 'SET_TOTAL_PAGES'; payload: number }
  | { type: 'SET_CURRENT_PAGE'; payload: number };

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

const useBooks = (latestBookId: string) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const location = useLocation();
  const bookLimit = 30;
  
  const booksQueryConstructor = (append: boolean): string => {
    const params = new URLSearchParams(location.search);
    const queryItems = params.get('categories')?.split(',') || [];
    const querySearch = params.get('search') || '';
  
    const booksQuery: string = `{
      "books": *[_type == "book" 
        && (${querySearch ? `title match "${querySearch}" || author->name match "${querySearch}"` : `true`})
        && (${queryItems.length ? `category->slug.current in [${queryItems.map(item => `'${item}'`)}]` : `true`})
        && (${latestBookId.length > 0 && append ? `_id > "${latestBookId}"` : `true`})
      ]
      | order(_id) [0...${bookLimit}]
      {
        _id,
        title,
        slug,
        author->{name},
        category->{title,slug},
        mainImage{
          asset->{
            _id,
            url
          }
        }
      },
      "totalDocuments": count(*[_type == "book"])
    }`;
  
  
    return booksQuery;
  };
  
  const fetchBooks = async (append: boolean) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const query = booksQueryConstructor(append);
      const result = await client.fetch(query);
      const booksResult: Book[] = result.books;
      const totalDocuments: number = result.totalDocuments;
      const totalPages = Math.ceil(totalDocuments / bookLimit);
  
      if (append) {
        dispatch({ type: 'APPEND_BOOKS', payload: booksResult });
      } else {
        dispatch({ type: 'SET_BOOKS', payload: booksResult });
      }
  
      dispatch({ type: 'SET_TOTAL_DOCUMENTS', payload: totalDocuments });
      dispatch({ type: 'SET_TOTAL_PAGES', payload: totalPages });
  
      const newPage = append ? state.currentPage + 1 : 1;
      dispatch({ type: 'SET_CURRENT_PAGE', payload: newPage });
  
    } catch (e) {
      dispatch({ type: 'SET_ERROR', payload: 'Something went wrong while fetching books' });
    }
  };
  
  useEffect(() => {
    fetchBooks(true);
  }, [latestBookId]);

  useEffect(() => {
    fetchBooks(false);
  }, [location.search]);

  return { 
    books: state.books, 
    booksError: state.error, 
    loading: state.loading,
    totalDocuments: state.totalDocuments,
    totalPages: state.totalPages,
    currentPage: state.currentPage
  };
};

export default useBooks;
