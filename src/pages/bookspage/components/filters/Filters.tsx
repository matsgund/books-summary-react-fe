import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import FilterItem from '../filter-item/FilterItem';
import { useBooksContext } from '@/context/BooksContext';


interface QueryItems {
    items: string[];
  }
  
const Filters = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [queryItems, setQueryItems] = useState<QueryItems>({ items: [] });
    const { state, dispatch } = useBooksContext();

    // Update queryItems based on URL
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const itemsFromURL = params.get('categories')?.split(',') || [];
        setQueryItems({ items: itemsFromURL });
    }, [location.search]);

    const changeQueryItems = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = e.target;
        const { items } = queryItems;

        let newItems;
        if (!checked) {
            newItems = items.filter((e) => e !== value);
        } else {
            return; // Do nothing if checked, as this function is for removing items
        }

        setQueryItems({ items: newItems });

        // Update URL
        const params = new URLSearchParams();
        if (newItems.length > 0) {
            params.append('categories', newItems.join(','));
        } else {
            dispatch({ type: 'CLEAR_BOOKS' });  // set books to initial state
        }
        navigate({ search: params.toString() });
    };

    const clearQueryItems = () => {
        setQueryItems({ items: [] });
        navigate({ search: '' }); // Clear the URL query parameters
        dispatch({ type: 'CLEAR_BOOKS' });  // set books to initial state
    };

    return (
        <>
            {queryItems.items.length > 0 ? (
                <>
                    {queryItems.items.map((item, i) => (
                        <FilterItem key={i} item={item} func={changeQueryItems} />
                    ))}
                    {queryItems.items.length > 0 && (
                        <FilterItem key={"remove"} item="Remove all filters" func={clearQueryItems} />
                    )}
                </>
            ) : null}
        </>
    );
};

export default Filters;
