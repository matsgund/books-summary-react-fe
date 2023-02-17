import {useState, useRef, createContext} from 'react';
import classes from './BooksPage.module.css';
import BookCard from '@/shared-components/book-card/BookCard';
import ErrorDisplayer from '@/shared-components/error-displayer/ErrorDisplayer';
import { Link } from 'react-router-dom';
import useBooks from './hooks/useBooks';
import SearchBooks from './components/searchbooks/searchBooks';
import Categories from './components/categories/categories';
import useChangeQueryItems from './hooks/useChangeQueryItems';
import useClearQueryItems from './hooks/useClearQueryItems';
import  Filters from './components/filters/Filters';


interface QueryItems {
    items: string[];
}

interface changeQueryItemsContextProps {
    changeQueryItems: (e: React.ChangeEvent<HTMLInputElement>) => void;
    refArray: React.MutableRefObject<HTMLInputElement[]>;
}

interface changeQuerySearchContextProps {
    setQuerySearch: React.Dispatch<React.SetStateAction<string>>;
    setQueryFilter: React.Dispatch<React.SetStateAction<string>>;
    queryFilter: string;
}

interface filterContextProps {
    queryItems: {
        items: string[];
    },
    changeQueryItems: (e: React.ChangeEvent<HTMLInputElement>) => void;
    clearQueryItems: () => void;
}

export const CategoryContext = createContext<changeQueryItemsContextProps | null>(null);
export const SearchContext = createContext<changeQuerySearchContextProps | null>(null);
export const FiltersContext = createContext<filterContextProps | null>(null);


const BooksPage = () => {

    const refArray = useRef<HTMLInputElement[]>([]);
    const [querySearch, setQuerySearch] = useState<string>("");
    const [queryFilter, setQueryFilter] = useState<string>("");
    const [queryItems, setQueryItems] = useState<QueryItems>({items:[]});
    const {books, booksError} = useBooks({queryItems, querySearch});
    const {changeQueryItems} = useChangeQueryItems({queryItems, setQueryItems, refArray});
    const {clearQueryItems} = useClearQueryItems({setQueryItems, refArray});
  
    return (
        <div className={classes["books-grid-container"]}>
            <div className={classes["books-aside-left"]}>
                <CategoryContext.Provider value={ {changeQueryItems, refArray} }>
                    <Categories/>
                </CategoryContext.Provider>
            </div>
            <div className={classes["books-hero-container"]}>
                <div className={classes["books-hero"]}>
                    <h1>The Summary Hub</h1>
                    <p>Here you can find all the books we have in our library.</p>
                </div>
            </div>
            <div className={classes["books-filter-container"]}>
                <SearchContext.Provider value={ {setQuerySearch, setQueryFilter, queryFilter} }>
                    <SearchBooks/>
                </SearchContext.Provider>
                <div className={classes["books-filter-elements-container"]}>
                    <FiltersContext.Provider value={{queryItems, changeQueryItems, clearQueryItems}}>
                        <Filters/>
                    </FiltersContext.Provider>
                </div>
            </div>
            <div className={classes["books-main"]}>
                {/*  make as a new component that uses useContext */  }
                {!booksError ?
                    books.map((item, i)=> (
                        <Link to={"/books/" + item.slug.current} key={i}>
                            <BookCard 
                                key={i} 
                                book={item}
                                displayMetadata={true}
                                />
                        </Link>
                    )) :
                    <ErrorDisplayer error={booksError} />
                }
            </div>
            <div className={classes["books-aside-right"]}></div>
        </div> 
    )  

}

export default BooksPage;