import classes from'./BookPage.module.css';
import useBook from './hooks/useBook';
import ErrorDisplayer from '@/shared-components/error-displayer/ErrorDisplayer';
import {useParams} from "react-router-dom";
import DefaultProfileImage from '@/assets/images/facebook-default-no-profile-pic.jpeg';
import DefaultBookImage from '@/assets/images/default-book-image.jpeg';
import RichTextComponent from '@/shared-components/richtext/RichText';


const BookPage = () => {

    const {slug} = useParams();
    const {book, error} = useBook(slug);
   
    return (
        // if book is not null, display book data. else display ErrorDisplayer
        book ? (
            <div className={classes["book-grid-container"]}>
                <div className={classes["book-main"]}>
                    <div className={classes["book-heading"]}>
                        <h1>{book.title}</h1>
                        <div className={classes["book-heading-items"]}>
                            <div>
                                <i><p>{new Date(book.publishedAt).toLocaleDateString()}</p></i>
                                <i><p>{(book.category && book.category.title) || "Unknown"}</p></i>
                            </div>
                            <div className={classes["book-author"]}>
                                    <img src={book.author.image ? book.author.image.asset.url : DefaultProfileImage} alt={book.author.name} />
                                    <p>{book.author.name}</p>
                            </div>
                        </div>
                    </div>
                    <article className={classes["book-body"]}>
                        <div className={classes["book-body-text-container"]}>
                            <RichTextComponent isInline={true} value={book.body} />
                        </div>
                        <a href={book.url}  target="_blank" rel="noopener noreferrer">
                            <div className={classes["book-body-image-container"]}>
                                <img src={book.mainImage.asset.url ? book.mainImage.asset.url : DefaultBookImage} alt={book.title}/>                        
                                <button className="btn btn-action" type="button">Buy the book!</button>
                            </div>
                        </a>
                    </article>
                </div>
            </div>  
        ) : (
            <ErrorDisplayer error={error}/>
        )

    );

}


export default BookPage;


