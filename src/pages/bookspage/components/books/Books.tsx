import { Link, useNavigate, useLocation } from 'react-router-dom';
import useBooks from '../../hooks/useBooks';
import BookCard from '@/shared-components/book-card/BookCard';
import ErrorDisplayer from '@/shared-components/error-displayer/ErrorDisplayer';
import { useEffect, useRef, useCallback, useState } from 'react';
import React from 'react';


const Books = () => {
   
    const [latestBookId, setLatestBookId] = useState<string>('');
    const { books, booksError } = useBooks(latestBookId);
  
  const observer = useRef<IntersectionObserver>();

  const lastBookElementRef = useCallback(
    (node: HTMLElement | null) => {
      if (booksError) return;
      if (observer.current) observer.current.disconnect();
  
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          const newLatestBookId = entries[0].target.id;
          if (newLatestBookId !== latestBookId) {
            console.log(newLatestBookId);
            setLatestBookId(newLatestBookId);
            // Unobserve the current element to prevent multiple triggers
            if (observer.current) {
              observer.current.unobserve(entries[0].target);
            }
          }
        }
      });
  
      if (node) observer.current.observe(node);
    },
    [latestBookId, booksError]  // Add latestBookId and booksError as dependencies
  );
  useEffect(() => {
    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, []);

  return (
    <>
      {!booksError ? (
        books.map((item, i) => {
          const isLastBook = books.length === i + 1;
          return (
            <Link
              to={`/books/${item.slug.current}`}
              key={item._id}
              ref={isLastBook ? lastBookElementRef : null}
              id={item._id}
            >
              <BookCard book={item} />
            </Link>
          );
        })
      ) : (
        <ErrorDisplayer error={booksError} />
      )}
    </>
  );
};


export default React.memo(Books);
