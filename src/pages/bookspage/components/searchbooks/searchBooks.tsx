import classes from "./searchBooks.module.css";
import { BsSearch } from "react-icons/bs";
import { SearchBooksProps } from "./searchBooksInterface";

const SearchBooks = ({queryFilter, setQueryFilter, setQuerySearch} : SearchBooksProps) => {

     // function that handles the submit of the search form
     const handleSubmit = (e : React.SyntheticEvent) => {
        e.preventDefault();
        const searchInput = (e.target as HTMLFormElement).elements.namedItem("search") as HTMLInputElement;
        setQuerySearch(searchInput.value);
    }

return (
    <form onSubmit={handleSubmit}>
        <div className={classes["books-filter-form-container"]}>
            <div className={classes["books-filter-form-input-container"]}>
                <label hidden htmlFor="search">Search</label>
                <input
                    type="search"
                    name="search"
                    value={queryFilter}
                    onChange={(e) => setQueryFilter(e.target.value)}
                    placeholder="Search..."
                />
            </div>
            <button type="submit">
                <span className={classes["filter-submit-icon"]}>
                <BsSearch/>    
                </span>
            </button>
        </div>
    </form>
)
}

export default SearchBooks;