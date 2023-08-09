import { Link } from 'react-router-dom';
import useBooks from '../../hooks/useBooks';
import BookCard from '@/shared-components/book-card/BookCard';
import ErrorDisplayer from '@/shared-components/error-displayer/ErrorDisplayer';
import { useContext, useRef, useCallback, useState } from 'react';
import { BooksContext } from '../../BooksPage';
import { BooksContextProps } from './BooksInterface';



const Books = () => {


    const {queryItems, querySearch} = useContext(BooksContext) as BooksContextProps;
    const [latestBookId, setLatestBookId] = useState<string>("");
    const {books, booksError} = useBooks({queryItems, querySearch, latestBookId});
   
    const observer = useRef<IntersectionObserver>();
    const lastBookElementRef = useCallback((node: any) => {

        if(booksError) return;
        if(observer.current) observer.current.disconnect();

        observer.current = new IntersectionObserver(entries => {
            if(entries[0].isIntersecting) {
                setLatestBookId(entries[0].target.id);
            }    
        });

        if(node) observer.current.observe(node);

    }, [latestBookId]);


    return (
        <>
          {!booksError ?
                    books.map((item, i)=> {              
                        if(books.length === i +1) {
                            return (
                                <Link to={"/books/" + item.slug.current} key={i} ref={lastBookElementRef} id={item._id}>
                                    <BookCard
                                        key={i} 
                                        book={item}
                                        />
                                </Link>
                            )
                        } else {
                            return (
                                <Link to={"/books/" + item.slug.current} key={i}>
                                    <BookCard
                                        key={i} 
                                        book={item}
                                        />
                                </Link>
                            )
                        }                        
                    }) :
                    <ErrorDisplayer error={booksError} />
            }
        </>
    );
};

export default Books;

