import {useState, useRef, createContext, useContext} from 'react';
import classes from './BooksPage.module.css';
import BookCard from '@/shared-components/book-card/BookCard';
import FilterItem from './components/filter-item/FilterItem';
import ErrorDisplayer from '@/shared-components/error-displayer/ErrorDisplayer';
import { Link } from 'react-router-dom';
import useBooks from './hooks/useBooks';
import SearchBooks from './components/searchbooks/searchBooks';
import Categories from './components/categories/categories';
import useChangeQueryItems from './hooks/useChangeQueryItems';


interface ChangeQueryItemsProps {
    target: {
      value: string;
      checked: boolean;
    },
  }

  interface QueryItems {
    items: string[];
  }

  interface changeQueryItemsContextProps {
    changeQueryItems: (e: React.ChangeEvent<HTMLInputElement>) => void;
    refArray: React.MutableRefObject<HTMLInputElement[]>;

}

 interface children {
     children: React.ReactNode;
 }
  
export const changeQueryItemsContext = createContext<changeQueryItemsContextProps | null>(null);
//export const useChangeQueryItems = () => useContext(changeQueryItemsContext);



const BooksPage = () => {

    const refArray = useRef<HTMLInputElement[]>([]);
    const [querySearch, setQuerySearch] = useState("");
    const [queryFilter, setQueryFilter] = useState("");
    const [queryItems, setQueryItems] = useState<QueryItems>({items:[]});
    const {books, booksError} = useBooks({queryItems, querySearch});
    const {changeQueryItems} = useChangeQueryItems({queryItems, setQueryItems, refArray});
  

    // move to separate file
    // function that empties the queryItems array and sets search querySearch to empty string.
    const clearQueryItems = () => {
        setQueryItems({
            items: [],
        })
        
        // set all checkboxes to false
        refArray.current.forEach(element => {
            element.checked = false;
        });

    }

    return (
        <div className={classes["books-grid-container"]}>
            <div className={classes["books-aside-left"]}>
                <changeQueryItemsContext.Provider value={ {changeQueryItems, refArray} }>
                    <Categories/>
                </changeQueryItemsContext.Provider>
            </div>
            <div className={classes["books-hero-container"]}>
                <div className={classes["books-hero"]}>
                    <h1>The Summary Hub</h1>
                    <p>Here you can find all the books we have in our library.</p>
                </div>
            </div>
            {/* Filter container */}
            <div className={classes["books-filter-container"]}>
                 {/* the SearchBooks component */}
                <SearchBooks
                    queryFilter={queryFilter}
                    setQueryFilter={setQueryFilter}
                    setQuerySearch={setQuerySearch}
                />
                {/* if queryItems is not empty, map over queryItems and return a FilterItem component for each item. */}
                <div className={classes["books-filter-elements-container"]}>
                    {queryItems.items.length > 0 ?
                        [
                            ...queryItems.items.map((item, i) => (
                            <FilterItem key={i} item={item} func={changeQueryItems} />
                            )),
                            <FilterItem key={"remove"} item="Remove all filters" func={clearQueryItems} />
                        ] :
                        null
                    }                  
                </div>
            </div>
            <div className={classes["books-main"]}>
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