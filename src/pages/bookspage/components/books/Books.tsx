import { Link} from 'react-router-dom';
import useBooks from '@/hooks/useBooks';
import BookCard from '@/components/book-card/BookCard';
import ErrorDisplayer from '@/components/error-displayer/ErrorDisplayer';
import LoadingSpinner from '@/components/loading-spinner/LoadingSpinner';
import InfiniteScroll from 'react-infinite-scroll-component';
import classes from './Books.module.css';
import { useLatestBook } from '@/context/LatestBookIdContext';

import React from 'react';


const Books = () => {
   
  const {setLatestBookId } = useLatestBook(); 
  const { books, booksError, loading, totalPages, currentPage, totalDocuments } = useBooks();

  return (
    <>
      {booksError && <ErrorDisplayer error="Unable to load books"/>}
      {!booksError && books.length > 0 &&
      <InfiniteScroll
            className={classes["books-main"]}
            dataLength={books.length}
            next={()=> setLatestBookId(books[books.length - 1]._id)}
            hasMore={currentPage < totalPages}
            loader={<LoadingSpinner isVisible={loading}/>}
            endMessage={<p style={{textAlign: 'center'}}>You have seen all {totalDocuments} books!</p>}>
              
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
