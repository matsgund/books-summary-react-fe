import { useState, useEffect } from 'react';
import client from '@/utils/sanityClient';
import  Category  from '@/interfaces/categoryInterface';

interface CategoriesResult {
    categories: Category[];
    categoryError: string;
}

// custom hook for fetching categories
const useCategories = () : CategoriesResult =>  {

    const [categories, setCategories] = useState<Category[]>([]);
    const [error, setError] = useState<string>("");

    //query for fetching categories. Return title, slug and bookCount for each category.
    const categoriesQuery : string = `*[_type == "category"] {
        title,
        slug,
        "bookCount": count(*[_type == 'book' && references(^._id)])
    }`;

    // fetch categories
    const fetchCategories = async () => {
        try {
            const categoriesResult: Category[] = await client.fetch<Category[]>(categoriesQuery);
            setCategories(categoriesResult)
        } catch (e) {
            setError("Something went wrong while fetching categories");
        }
    }

     // fetch books and categories on page load and when queryItems changes
     useEffect(() => {
        fetchCategories();   
    }, []);

    return {categories, categoryError: error};
}

export default useCategories;



