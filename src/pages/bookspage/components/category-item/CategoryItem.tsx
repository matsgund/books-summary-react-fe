import React from "react";

interface CategoryItemProps {
    item: {
        title: string;
        slug: {
            current: string;
        };
        bookCount: number;
    };
    changeQueryItems: (e: React.ChangeEvent<HTMLInputElement>) => void;
    i: number;
    refArray: React.MutableRefObject<HTMLInputElement[]>;
}


const CategoryItem = ({item, changeQueryItems, i, refArray} : CategoryItemProps) => {

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
                refArray.current[i] = ref;
            }}
            /> 
        </li>
    )
}

export default CategoryItem;


