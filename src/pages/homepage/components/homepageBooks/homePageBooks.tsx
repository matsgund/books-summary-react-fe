import useBooks from '../../hooks/useBooks';
import { Link } from 'react-router-dom';
import BookCard from '@/shared-components/book-card/BookCard';
import ErrorDisplayer from '@/shared-components/error-displayer/ErrorDisplayer';
import classes from './homePageBooks.module.css';

const HomePageBooks = () => {

    // get the books to be displayed on the homepage
    const { books, booksError } = useBooks();
   
    return (
        <>
            <h2 className={classes["home-grid-container"]}>Recently added:</h2>
            {!booksError && books.length > 0 ? books.map((book, i) => (
                <Link to={`/books/${book.slug.current}`} key={i}>
                   {i==2 && <div className={classes["home-book-image"]}> 
                        <img src="src/assets/images/Emne2.png" alt="girl reading" />
                    </div>}
                    <BookCard key={i} book={book} />
                </Link>
            )):
            <ErrorDisplayer error="Unable to load books"/>}
         </>
    );
    };

export default HomePageBooks;
