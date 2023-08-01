import classes from './BookCard.module.css';
import Book from '@/interfaces/bookInterface';

  // create an interface for book
  interface props {
        book: Book,
        displayMetadata: boolean;
        
    }

  
const BookCard = ({book, displayMetadata}: props) => {

    const bookCardClass = displayMetadata ? classes["book-card"] : classes["book-card-small"];

    return (
        <div className={classes["book-card-container"]}>
            <div className={bookCardClass}>
                <img src={book.mainImage.asset.url} alt="book image"/>
                {displayMetadata && (
                    <div className={classes["book-card-items-container"]}>
                        {/* cut the text when it gets too long */} 
                        <h3><b>{book.title}</b></h3>
                        <div className={classes["book-card-items"]}>
                            <span><b>Category</b></span>
                            {book.category && <span>{book.category.title}</span>}
                            {!book.category && <span>Unknown</span>}
                        </div>
                        <div className={classes["book-card-items"]}>
                            <span><b>Author</b></span>
                            {book.author && <span>{book.author.name}</span>}
                            {!book.author && <span>Unknown</span>}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default BookCard;

