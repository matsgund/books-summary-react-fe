import classes from './BookCard.module.css';
import Book from '@/interfaces/bookInterface';

  // create an interface for book
  interface props {
        book: Book,   
    }

  
const BookCard = ({book}: props) => {

    return (
        <div className={classes["book-card-container"]}>
            <div className={classes["book-card"]}>
                <img src={book?.mainImage?.asset?.url} alt="book image"/>
            </div>
        </div>
    )
}

export default BookCard;

