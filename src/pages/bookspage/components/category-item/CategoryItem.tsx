import { CategoryItemProps } from "./CategoryItemInterfaces";

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
                refArray.current[i] = ref as HTMLInputElement;
            }}
            /> 
        </li>
    )
}

export default CategoryItem;


