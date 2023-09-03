import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import classes from "./searchBooks.module.css";
import { BsSearch } from "react-icons/bs";
import { useBooksContext } from "@/context/BooksContext";
import { useLatestBook } from "@/context/LatestBookIdContext";

const SearchBooks = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [querySearch, setQuerySearch] = useState<string>("");
    const [queryFilter, setQueryFilter] = useState<string>("");
    const { state, dispatch } = useBooksContext();
    const { setLatestBookId  } = useLatestBook(); 
    

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const searchQuery = params.get('search');
        if (searchQuery) {
            setQuerySearch(searchQuery);
            setQueryFilter(searchQuery);
        }
    }, [location.search]);

    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault();
        const searchInput = (e.target as HTMLFormElement).elements.namedItem("search") as HTMLInputElement;
        setQuerySearch(searchInput.value);

        const params = new URLSearchParams(location.search);

        if (searchInput.value === '') {
            // Remove 'search' query parameter if the search input is empty
            // clear books state 
            setLatestBookId('');
            dispatch({ type: 'CLEAR_BOOKS' });
            params.delete('search');
        } else {
            params.set('search', searchInput.value);
        }

        navigate(`${location.pathname}?${params.toString()}`);
    };

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
                        <BsSearch />
                    </span>
                </button>
            </div>
        </form>
    );
};

export default SearchBooks;
