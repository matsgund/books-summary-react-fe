import classes from'./BookPage.module.css';
import useBook from '../../hooks/useBook';
import ErrorDisplayer from '@/components/error-displayer/ErrorDisplayer';
import LoadingSpinner from '@/components/loading-spinner/LoadingSpinner';
import {useParams} from "react-router-dom";
import DefaultProfileImage from '@/assets/images/facebook-default-no-profile-pic.jpeg';
import DefaultBookImage from '@/assets/images/default-book-image.jpeg';
import RichTextComponent from '@/components/richtext/RichText';



const BookPage = () => {

    const {slug} = useParams();
    const {book, error, loading} = useBook(slug);
   
    return (
        <>
        <h1>{loading}</h1>
            { error && <ErrorDisplayer error="Unable to load books"/>}
            { loading && !error && <LoadingSpinner isVisible={loading}/>}
            { !error && book &&
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
            }
        </>
    );

}


export default BookPage;


