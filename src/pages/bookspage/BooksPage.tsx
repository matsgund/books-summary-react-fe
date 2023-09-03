import classes from './BooksPage.module.css';
import SearchBooks from './components/searchbooks/SearchBooks';
import Categories from './components/categories/categories';
import Filters from './components/filters/Filters';
import Books from './components/books/Books';

const BooksPage = () => {

  return (
    <div className={classes["books-grid-container"]}>
      <div className={classes["books-aside-left"]}>
        <Categories />
      </div>
      <div className={classes["books-hero-container"]}>
        <div className={classes["books-hero"]}>
          <h1>The Summary Hub</h1>
          <p>Here you can find all the books we have in our library.</p>
        </div>
      </div>
      <div className={classes["books-filter-container"]}>
        <SearchBooks />
        <div className={classes["books-filter-elements-container"]}>
          <Filters />
        </div>
      </div>
      <div className={classes["books-main"]}>
        <Books />
      </div>
      <div className={classes["books-aside-right"]}></div>
    </div>
  );
};

export default BooksPage;
