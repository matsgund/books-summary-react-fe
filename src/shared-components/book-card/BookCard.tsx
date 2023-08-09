import classes from './BookCard.module.css';
import Book from '@/interfaces/bookInterface';

  // create an interface for book
  interface props {
        book: Book,
        displayMetadata: boolean;
        
    }

  
const BookCard = ({book, displayMetadata}: props) => {

    return (
        <div className={classes["book-card-container"]}>
            <div className={classes["book-card"]}>
                <img src={book.mainImage.asset.url} alt="book image"/>
            </div>
        </div>
    )
}

export default BookCard;

