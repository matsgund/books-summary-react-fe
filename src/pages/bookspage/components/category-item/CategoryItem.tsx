import { useEffect } from 'react';
import React from 'react';

interface CategoryItemProps {
    item: {
        title: string;
        slug: {
            current: string;
        }
        bookCount: number;
    };
    changeQueryItems: (e: React.ChangeEvent<HTMLInputElement>) => void;
    i: number;
    refArray: React.MutableRefObject<HTMLInputElement[]>;
    queryItems: string[];
}

const CategoryItem = ({item, changeQueryItems, i, refArray, queryItems} : CategoryItemProps) => {

    useEffect(() => {
        // Set the checkbox state based on queryItems
        if (refArray.current[i]) {
            refArray.current[i].checked = queryItems.includes(item.slug.current);
        }
    }, [queryItems]);

    return (
        <li key={i}>
            <label htmlFor={item.slug.current}>{`${item.title} ( ${item.bookCount} ) `}</label>
            <input 
                type="checkbox" 
                name="category"
                id={item.slug.current} 
                value={item.slug.current}
                onChange={changeQueryItems}
                ref={ref => {
                    refArray.current[i] = ref as HTMLInputElement;
                }}
            /> 
        </li>
    )
}

export default React.memo(CategoryItem);
