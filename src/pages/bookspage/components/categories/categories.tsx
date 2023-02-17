import { useContext } from 'react';
import CategoryItem from '../category-item/CategoryItem';
import ErrorDisplayer from '@/shared-components/error-displayer/ErrorDisplayer';
import useCategories from '../../hooks/useCategories';
import { CategoryContext } from '../../BooksPage';
import {CategoryContextProps } from './categoriesInterface';


const Categories = () => {

    const { changeQueryItems, refArray } = useContext(CategoryContext) as CategoryContextProps;
    const {categories, categoryError} = useCategories();
   
    return (
        <>
            <h3>Categories</h3>
            <ul>
                {/* if categories is not empty, map over categories and return a CategoryItem component for each item. */}
                {!categoryError ? categories.map((item, i) => (
                <CategoryItem
                        key={i}
                        item={item}
                        changeQueryItems={changeQueryItems}
                        i={i}
                        refArray={refArray}
                    />
                )):
                    <ErrorDisplayer error={categoryError} />
                }
            </ul>
        </>
    )
}

export default Categories;