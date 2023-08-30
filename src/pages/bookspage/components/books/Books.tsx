import { Link} from 'react-router-dom';
import useBooks from '../../hooks/useBooks';
import BookCard from '@/shared-components/book-card/BookCard';
import ErrorDisplayer from '@/shared-components/error-displayer/ErrorDisplayer';
import { useEffect, useRef, useCallback, useState } from 'react';
import LoadingSpinner from '@/shared-components/loading-spinner/LoadingSpinner';
import InfiniteScroll from 'react-infinite-scroll-component';
import classes from './Books.module.css';

import React from 'react';


const Books = () => {
   
  const [latestBookId, setLatestBookId] = useState<string>('');
  const { books, booksError, loading } = useBooks(latestBookId);

  return (
    <>
      {booksError && <ErrorDisplayer error="Unable to load books"/>}
      {!booksError && books.length > 0 &&
      <InfiniteScroll
            className={classes["books-main"]}
            dataLength={books.length}
            next={()=> setLatestBookId(books[books.length - 1]._id)}
            hasMore={true}
            loader={<LoadingSpinner isVisible={true}/>}
            endMessage={<p style={{textAlign: 'center'}}>No more books to load</p>}>
              
            {books.map((item, i)=> (
                  <Link to={"/books/" + item.slug.current} key={i} id={item._id}>
                      <BookCard
                          key={i} 
                          book={item}
                          />
                  </Link>
              ))}
              
        </InfiniteScroll>
        }
    </>
  );
};


export default React.memo(Books);
