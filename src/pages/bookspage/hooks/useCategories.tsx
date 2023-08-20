import { useState, useEffect } from 'react';
import client from '@/utils/sanityClient';
import  Category  from '@/interfaces/categoryInterface';

interface CategoriesResult {
    categories: Category[];
    error: string;
    loading: boolean;
}

// custom hook for fetching categories
const useCategories = () : CategoriesResult =>  {

    const [categories, setCategories] = useState<Category[]>([]);
    const [error, setError] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(true);

    //query for fetching categories. Return title, slug and bookCount for each category.
    const categoriesQuery : string = `*[_type == "category"] {
        title,
        slug,
        "bookCount": count(*[_type == 'book' && references(^._id)])
    }`;

    // fetch categories
    const fetchCategories = async () => {
        setLoading(true);
        try {
            const categoriesResult: Category[] = await client.fetch<Category[]>(categoriesQuery);
            setCategories(categoriesResult)
            setLoading(false);
        } catch (e) {
            setError("Something went wrong while fetching categories");
            setLoading(false);
        }
    }

     // fetch books and categories on page load and when queryItems changes
     useEffect(() => {
        fetchCategories();   
    }, []);

    return {categories, error, loading};
}

export default useCategories;



