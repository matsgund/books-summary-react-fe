import { Link} from 'react-router-dom';
import useBooks from '../../hooks/useBooks';
import BookCard from '@/shared-components/book-card/BookCard';
import ErrorDisplayer from '@/shared-components/error-displayer/ErrorDisplayer';
import { useEffect, useRef, useCallback, useState } from 'react';
import LoadingSpinner from '@/shared-components/loading-spinner/LoadingSpinner';

import React from 'react';


const Books = () => {
   
  const [latestBookId, setLatestBookId] = useState<string>('');
  const { books, booksError, loading } = useBooks(latestBookId);
  const observer = useRef<IntersectionObserver>();

  const lastBookElementRef = useCallback((node: any) => {

      if(booksError) return;
      if(observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver(entries => {
          if(entries[0].isIntersecting) {
              setLatestBookId(entries[0].target.id);
          }    
      });

      if(node) observer.current.observe(node);

  }, [latestBookId]);

  return (
    <>
     
      {booksError && <ErrorDisplayer error="Unable to load books"/>}
      {!booksError && books.length > 0 && 
          books.map((item, i)=> {              
              if(books.length === i +1) {
                  return (
                      <Link to={"/books/" + item.slug.current} key={i} ref={lastBookElementRef} id={item._id}>
                          <BookCard
                              key={i} 
                              book={item}
                              />
                      </Link>
                  )
              } else {
                  return (
                      <Link to={"/books/" + item.slug.current} key={i}>
                          <BookCard
                              key={i} 
                              book={item}
                              />
                      </Link>
                  )
              }                        
          })
        }
        {loading && !booksError && <LoadingSpinner isVisible={loading}/>}
    </>
  );
};


export default React.memo(Books);
