import {useState, useRef, createContext} from 'react';
import classes from './BooksPage.module.css';
import SearchBooks from './components/searchbooks/searchBooks';
import Categories from './components/categories/categories';
import useChangeQueryItems from './hooks/useChangeQueryItems';
import useClearQueryItems from './hooks/useClearQueryItems';
import  Filters from './components/filters/Filters';
import Books from './components/books/Books';
import { QueryItems,CategoryContextProps,  SearchContextProps, FilterContextProps, BooksContextProps  } from './BooksPageInterface';


export const CategoryContext = createContext<CategoryContextProps | null>(null);
export const SearchContext = createContext<SearchContextProps | null>(null);
export const FiltersContext = createContext<FilterContextProps | null>(null);
export const BooksContext = createContext<BooksContextProps | null>(null);


const BooksPage = () => {

  
    return (
        <div className={classes["books-grid-container"]}>
            <div className={classes["books-aside-left"]}>  
                <Categories/>
            </div>
            <div className={classes["books-hero-container"]}>
                <div className={classes["books-hero"]}>
                    <h1>The Summary Hub</h1>
                    <p>Here you can find all the books we have in our library.</p>
                </div>
            </div>
            {/* <div className={classes["books-filter-container"]}>
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
                <BooksContext.Provider value={{queryItems, querySearch}}>
                    <Books/>
                </BooksContext.Provider>
            </div>
            <div className={classes["books-aside-right"]}></div> */}
        </div> 
    )  

}

export default BooksPage;