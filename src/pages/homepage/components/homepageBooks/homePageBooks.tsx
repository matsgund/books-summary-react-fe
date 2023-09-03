import useBooks from '@/hooks/useBooksHomepage';
import { Link } from 'react-router-dom';
import BookCard from '@/components/book-card/BookCard';
import ErrorDisplayer from '@/components/error-displayer/ErrorDisplayer';
import LoadingSpinner from '@/components/loading-spinner/LoadingSpinner';
import classes from './homePageBooks.module.css';
import image from '@/assets/images/Emne5.png';

const HomePageBooks = () => {
    const { books, booksError, loading } = useBooks();
   
    return (
        <>
            <h2 className={classes["home-grid-container"]}>Recently added:</h2>
            { loading && !booksError && <LoadingSpinner isVisible={loading}  />}
            { booksError && <ErrorDisplayer error="Unable to load books" />}
            { !booksError && books.length > 0 && books.map((book, i) => (
                <Link to={`/books/${book.slug.current}`} key={i} className='home-link-container'>
                    {i === 2 && <div className={classes["home-book-image"]}> 
                        <img src={image} alt="Illustration of a girl reading a book" />
                    </div>}
                    <BookCard key={i} book={book} />
                </Link>
            ))}
         </>
    );
};


export default HomePageBooks;
