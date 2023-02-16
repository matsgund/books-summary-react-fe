import useBooks from '../../hooks/useBooks';
import { Link } from 'react-router-dom';
import BookCard from '@/shared-components/book-card/BookCard';
import ErrorDisplayer from '@/shared-components/error-displayer/ErrorDisplayer';

const HomePageBooks = () => {

    // get the books to be displayed on the homepage
    const { books, booksError } = useBooks();

    return (
        <>
            <h2>Recently added:</h2>
            {!booksError ? books.map((book, i) => (
                 <Link to={`/books/${book.slug.current}`} key={i}>
                     <BookCard key={i} book={book} displayMetadata={false}/>
                 </Link>
            )):
            <ErrorDisplayer error="Unable to load books"/>}
         </>
    );
    };

export default HomePageBooks;
