import { useRef, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import CategoryItem from '../category-item/CategoryItem';
import ErrorDisplayer from '@/components/error-displayer/ErrorDisplayer';
import LoadingSpinner from '@/components/loading-spinner/LoadingSpinner';
import useCategories from '@/hooks/useCategories';
import classes from './Categories.module.css';
import React from 'react';
import { MdOutlineExpandMore, MdOutlineExpandLess } from 'react-icons/md';

interface QueryItems {
    items: string[];
    }

const Categories = () => {
   
    const navigate = useNavigate();
    const location = useLocation();
    const refArray = useRef<HTMLInputElement[]>([]);
    const [queryItems, setQueryItems] = useState<QueryItems>({ items: [] });
    const { categories, error, loading } = useCategories();
    const [isExpanded, setIsExpanded] = useState(false);
    const [isSmallDevice, setIsSmallDevice] = useState(window.innerWidth <= 1200);


    // tracks the window size. To be used to determine whether to show the categories or not
    useEffect(() => {
        const handleResize = () => {
            setIsSmallDevice(window.innerWidth <= 1200);
        };
        window.addEventListener("resize", handleResize);
    
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);
    
    // Initialize queryItems from URL
    useEffect(() => {
       const params = new URLSearchParams(location.search);
       const initialItems = params.get('categories')?.split(',') || [];
       setQueryItems({ items: initialItems });

      //  Also set the checkboxes to checked based on URL
        if (refArray.current) {
            initialItems.forEach((item) => {
                const checkbox = refArray.current.find((element) => element.id === item);
                if (checkbox) {
                    checkbox.checked = true;
                }
            });
        }
    }, [location.search]);

    const changeQueryItems = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = e.target;
        const { items } = queryItems;
    
        let newItems;
        if (checked) {
            newItems = [...items, value];
        } else {
            newItems = items.filter((e) => e !== value);
        }
    
        setQueryItems({ items: newItems });
    
        // Get existing query parameters
        const params = new URLSearchParams(location.search);
    
        // Update the 'categories' query parameter
        if (newItems.length > 0) {
            params.set('categories', newItems.join(','));
        } else {
            params.delete('categories');
        }
    
        // Update the URL while preserving other query parameters
        navigate(`${location.pathname}?${params.toString()}`);
    };
    

    return (
        <>  
            <div className={classes["categories-heading-container"]}>
                <h3>Categories</h3>
                <div className={"categories-expand-container"} onClick={() => setIsExpanded(!isExpanded)}>
                { isSmallDevice && (
                    <div className={"categories-expand-container"} onClick={() => setIsExpanded(!isExpanded)}>
                        { isExpanded 
                            ? <MdOutlineExpandLess className={classes["expand-icon"]} /> 
                            : <MdOutlineExpandMore className={classes["expand-icon"]} />
                        }
                    </div>
                )}
                </div>
            </div>
            { (isExpanded || !isSmallDevice) && ( <ul>
                {error && <ErrorDisplayer error="Unable to load categories" />}
                {loading && !error && <LoadingSpinner isVisible={loading} />}
                {!error &&
                    categories.map((item, i) => (
                        <CategoryItem
                            key={i}
                            item={item}
                            changeQueryItems={changeQueryItems}
                            i={i}
                            refArray={refArray}
                            queryItems={queryItems.items}
                        />
                    ))}
            </ul> )}
        </>
    );
};

export default React.memo(Categories);
