import { useReducer, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import client from '@/utils/sanityClient';
import { BooksResult } from './hooksInterfaces';
import Book from '@/interfaces/bookInterface';

interface State {
  books: Book[];
  error: string;
}

type Action =
  | { type: 'SET_BOOKS'; payload: Book[] }
  | { type: 'APPEND_BOOKS'; payload: Book[] }
  | { type: 'SET_ERROR'; payload: string };

const initialState: State = {
  books: [],
  error: '',
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_BOOKS':
      return { ...state, books: action.payload };
    case 'APPEND_BOOKS':
      return { ...state, books: [...state.books, ...action.payload] };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

const useBooks = (latestBookId: string): BooksResult => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const location = useLocation();
  const bookLimit = 100;

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const queryItems = params.get('categories')?.split(',') || [];
    const querySearch = params.get('search') || '';

    const booksQueryConstructor = (reset: boolean): string => {
        const booksQuery: string = `*[_type == "book" 
        && (${querySearch ? `title match "${querySearch}" || author->name match "${querySearch}"` : `true`})
        && (${queryItems.length ? `category->slug.current in [${queryItems.map(item => `'${item}'`)}]` : `true`})
          
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
        }`;

        return booksQuery;
    };

    const fetchBooks = async (reset: boolean) => {
      try {
        const query = booksQueryConstructor(reset);
        const booksResult: Book[] = await client.fetch(query);
        if (reset) {
          dispatch({ type: 'SET_BOOKS', payload: booksResult });
        } else {
          dispatch({ type: 'APPEND_BOOKS', payload: booksResult });
        }
      } catch (e) {
        dispatch({ type: 'SET_ERROR', payload: 'Something went wrong while fetching books' });
      }
    };


    let shouldFetchBooks = (!latestBookId || queryItems.length || querySearch.length);
    fetchBooks(shouldFetchBooks);
  }, [latestBookId, location.search]);

  return { books: state.books, booksError: state.error };
};

export default useBooks;
