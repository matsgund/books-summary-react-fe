import { useReducer, useEffect } from 'react';
import client from '@/utils/sanityClient';
import Category from '@/interfaces/categoryInterface';

interface CategoriesResult {
  categories: Category[];
  error: string;
  loading: boolean;
}

type Action =
  | { type: 'FETCH_START' }
  | { type: 'FETCH_SUCCESS'; payload: Category[] }
  | { type: 'FETCH_ERROR'; payload: string };

const initialState: CategoriesResult = {
  categories: [],
  error: '',
  loading: true,
};

const reducer = (state: CategoriesResult, action: Action): CategoriesResult => {
  switch (action.type) {
    case 'FETCH_START':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, categories: action.payload };
    case 'FETCH_ERROR':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

// Custom hook for fetching categories
const useCategories = (): CategoriesResult => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Query for fetching categories. Return title, slug, and bookCount for each category.
  const categoriesQuery: string = `*[_type == "category"] {
    title,
    slug,
    "bookCount": count(*[_type == 'book' && references(^._id)])
  }`;

  useEffect(() => {
    const fetchCategories = async () => {
      dispatch({ type: 'FETCH_START' });
      try {
        const categoriesResult: Category[] = await client.fetch<Category[]>(categoriesQuery);
        dispatch({ type: 'FETCH_SUCCESS', payload: categoriesResult });
      } catch (e) {
        dispatch({ type: 'FETCH_ERROR', payload: 'Something went wrong while fetching categories' });
      }
    };

    fetchCategories();
  }, []);

  return state;
};

export default useCategories;
