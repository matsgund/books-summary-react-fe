import useBooks from '../../hooks/useBooks';
import { Link } from 'react-router-dom';
import BookCard from '@/shared-components/book-card/BookCard';
import ErrorDisplayer from '@/shared-components/error-displayer/ErrorDisplayer';
import LoadingSpinner from '@/shared-components/loading-spinner/LoadingSpinner';
import classes from './homePageBooks.module.css';
import image from '@/assets/images/Emne5.png';

const HomePageBooks = () => {

    // get the books to be displayed on the homepage
    const { books, booksError, loading } = useBooks();
   
    return (
        <>
            <h2 className={classes["home-grid-container"]}>Recently added:</h2>
           { booksError || books.length == 0 && <ErrorDisplayer error="Unable to load books"/>}
           { loading && !booksError && <LoadingSpinner isVisible={loading}  />}
           { !booksError && books.length > 0 && books.map((book, i) => (
                <Link to={`/books/${book.slug.current}`} key={i} className='home-link-container'>
                   {i==2 && <div className={classes["home-book-image"]}> 
                        <img src={image} alt="girl reading" />
                    </div>}
                    <BookCard key={i} book={book} />
                </Link>
            ))}
         </>
    );
    };

export default HomePageBooks;
