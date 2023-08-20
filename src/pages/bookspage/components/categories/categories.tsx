import { useContext } from 'react';
import CategoryItem from '../category-item/CategoryItem';
import ErrorDisplayer from '@/shared-components/error-displayer/ErrorDisplayer';
import LoadingSpinner from '@/shared-components/loading-spinner/LoadingSpinner';
import useCategories from '../../hooks/useCategories';
import { CategoryContext } from '../../BooksPage';
import {CategoryContextProps } from './categoriesInterface';


const Categories = () => {

    const { changeQueryItems, refArray } = useContext(CategoryContext) as CategoryContextProps;
    const {categories, error, loading} = useCategories();
   
    return (
        <>
            <h3>Categories</h3>
            <ul>
                {error && <ErrorDisplayer error="Unable to load categories"/>}
                {loading && !error && <LoadingSpinner isVisible={loading}/> }
                {!error && categories.map((item, i) => (
                <CategoryItem
                        key={i}
                        item={item}
                        changeQueryItems={changeQueryItems}
                        i={i}
                        refArray={refArray}
                    />
                ) )}
            </ul>
        </>
    )
}

export default Categories;