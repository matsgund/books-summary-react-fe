import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import classes from "./searchBooks.module.css";
import { BsSearch } from "react-icons/bs";

const SearchBooks = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [querySearch, setQuerySearch] = useState<string>("");
    const [queryFilter, setQueryFilter] = useState<string>("");

    useEffect(() => {
        // Get the search query from the URL
        const params = new URLSearchParams(location.search);
        const searchQuery = params.get('search');
        if (searchQuery) {
            setQuerySearch(searchQuery);
            setQueryFilter(searchQuery);
        }
    }, [location.search]);

    // Function that handles the submit of the search form
    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault();
        const searchInput = (e.target as HTMLFormElement).elements.namedItem("search") as HTMLInputElement;
        setQuerySearch(searchInput.value);

        // Get existing query parameters
        const params = new URLSearchParams(location.search);

        // Update the 'search' query parameter
        params.set('search', searchInput.value);

        // Update the URL while preserving other query parameters
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
