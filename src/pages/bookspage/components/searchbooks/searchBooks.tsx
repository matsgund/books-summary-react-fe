import classes from "./searchBooks.module.css";
import { BsSearch } from "react-icons/bs";


interface SearchBooksProps {
    queryFilter: string;
    handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
    setQueryFilter: (value: string) => void;
}

const SearchBooks = ({queryFilter,handleSubmit, setQueryFilter} : SearchBooksProps) => {

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