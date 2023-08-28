import { useEffect, useReducer } from 'react';
import client from '@/utils/sanityClient';
import Book from '@/interfaces/bookInterface';

interface State {
  books: Book[];
  error: string | null;
  loading: boolean;
}

type Action =
  | { type: 'FETCH_START' }
  | { type: 'FETCH_SUCCESS'; payload: Book[] }
  | { type: 'FETCH_ERROR'; payload: string };

const initialState: State = {
  books: [],
  error: null,
  loading: false,
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'FETCH_START':
      return { ...state, loading: true, error: null };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, books: action.payload };
    case 'FETCH_ERROR':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

const query = `*[_type == "book"] | order(publishedAt desc)[0..2] {
  title,
  slug,
  mainImage{
    asset->{
      _id,
      url
    }
  }
}`;

const useBooks = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const abortController = new AbortController();
    const options = { signal: abortController.signal };

    const fetchBooks = async () => {
      dispatch({ type: 'FETCH_START' });
      try {
        const booksResult: Book[] = await client.fetch(query, options);
        dispatch({ type: 'FETCH_SUCCESS', payload: booksResult });
      } catch (e) {
        dispatch({ type: 'FETCH_ERROR', payload: 'Unable to load books' });
      }
    };

    fetchBooks();

    return () => {
      abortController.abort();
    };
  }, []);

  return {
    books: state.books,
    booksError: state.error,
    loading: state.loading,
  };
};

export default useBooks;
