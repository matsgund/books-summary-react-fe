import { useReducer, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import client from '@/utils/sanityClient';
import Book from '@/interfaces/bookInterface';

interface State {
  books: Book[];
  error: string;
  loading: boolean;  // Add loading state
}

type Action =
  | { type: 'SET_BOOKS'; payload: Book[] }
  | { type: 'APPEND_BOOKS'; payload: Book[] }
  | { type: 'SET_ERROR'; payload: string }
  | { type: 'SET_LOADING'; payload: boolean };  // Add loading action type

const initialState: State = {
  books: [],
  error: '',
  loading: false,  // Initialize loading state
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_BOOKS':
      return { ...state, books: action.payload, loading: false };
    case 'APPEND_BOOKS':
      return { ...state, books: [...state.books, ...action.payload], loading: false };
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    case 'SET_LOADING':  // Handle loading action
      return { ...state, loading: action.payload };
    default:
      return state;
  }
};


const useBooks = (latestBookId: string) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const location = useLocation();
  const bookLimit = 10;

  const booksQueryConstructor = (append: boolean): string => {
    console.log('append', append);
    console.log('latestBookId', latestBookId);
    const params = new URLSearchParams(location.search);
    const queryItems = params.get('categories')?.split(',') || [];
    const querySearch = params.get('search') || '';
  
    const booksQuery: string = `*[_type == "book" 
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
    }`;
  
    return booksQuery;
  };
  
  const fetchBooks = async (append: boolean) => {
    dispatch({ type: 'SET_LOADING', payload: true });  // Set loading to true before fetching
    try {
      const query = booksQueryConstructor(append);
      const booksResult: Book[] = await client.fetch(query);
      if (append) {
        dispatch({ type: 'APPEND_BOOKS', payload: booksResult });
      } else {
        dispatch({ type: 'SET_BOOKS', payload: booksResult });
      }
    } catch (e) {
      dispatch({ type: 'SET_ERROR', payload: 'Something went wrong while fetching books' });
    }
  };
  
  useEffect(() => {
    fetchBooks(true);
  }, [latestBookId]);

  useEffect(() => {
      fetchBooks(false);
  } , [location.search]);

  return { books: state.books, booksError: state.error, loading: state.loading };  
};

export default useBooks;
