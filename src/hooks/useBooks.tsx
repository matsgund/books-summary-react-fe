import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import client from '@/utils/sanityClient';
import Book from '@/interfaces/bookInterface';
import { useLatestBook } from '@/context/LatestBookIdContext';
import { useBooksContext } from '@/context/BooksContext';


const useBooks = () => {

  const { state, dispatch } = useBooksContext();
  const location = useLocation();
  const { latestBookId, prevLatestBookId, setPrevLatestBookId  } = useLatestBook(); 
  const bookLimit = 25;
  
  const booksQueryConstructor = (append: boolean): string => {
    const params = new URLSearchParams(location.search);
    const queryItems = params.get('categories')?.split(',') || [];
    const querySearch = params.get('search') || '';
    setPrevLatestBookId(latestBookId);
  
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
  
      // append books when user scrools
      if (append) {
        dispatch({ type: 'APPEND_BOOKS', payload: booksResult });
      // start a new fetch if the user starts filtering
      } else {
        dispatch({ type: 'SET_BOOKS', payload: booksResult });
      }
  
      dispatch({ type: 'SET_TOTAL_DOCUMENTS', payload: totalDocuments });
      dispatch({ type: 'SET_TOTAL_PAGES', payload: totalPages });
  
      const newPage = append ? state.currentPage + 1 : 1;
      dispatch({ type: 'SET_CURRENT_PAGE', payload: newPage });
  
    } catch (e) {
      dispatch({ type: 'SET_ERROR', payload: 'Something went wrong while fetching books' });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };
  
  // only fetch books when we already has some books in the state
  // and the latestBookId is not the same as the previous one
  useEffect(() => {
    console.log('useEffect latestBookId');
    console.log(latestBookId);
    console.log(prevLatestBookId);
    if (latestBookId.length > 0 && state.books.length > 0 && latestBookId !== prevLatestBookId) {
          fetchBooks(true);
        }
  }, [latestBookId]);

  // start fetching boooks from the start if the user starts filtering.
  useEffect(() => {
  if (state.books.length === 0 || location.search !== '')
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
