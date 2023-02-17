import { Link } from 'react-router-dom';
import useBooks from '../../hooks/useBooks';
import BookCard from '@/shared-components/book-card/BookCard';
import ErrorDisplayer from '@/shared-components/error-displayer/ErrorDisplayer';
import { useContext } from 'react';
import { BooksContext } from '../../BooksPage';
import { BooksContextProps } from './BooksInterface';

const Books = () => {
    const {queryItems, querySearch} = useContext(BooksContext) as BooksContextProps;
    const {books, booksError} = useBooks({queryItems, querySearch});
    return (
        <>
          {!booksError ?
                    books.map((item, i)=> (
                        <Link to={"/books/" + item.slug.current} key={i}>
                            <BookCard 
                                key={i} 
                                book={item}
                                displayMetadata={true}
                                />
                        </Link>
                    )) :
                    <ErrorDisplayer error={booksError} />
                }
        </>
    );
};

export default Books;
