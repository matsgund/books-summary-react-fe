import { useState, useEffect } from 'react';
import client from '@/utils/sanityClient';
import  Book  from '@/interfaces/bookInterface';
import { s } from 'vitest/dist/env-afee91f0';

interface UseBookResult {
    book: Book | undefined;
    error: string | undefined;
    loading: boolean;
}

const useBook = (slug: string | undefined): UseBookResult  => {

const [book, setBook] = useState<Book>();
const [error, setError] = useState<string>();
const [loading, setLoading] = useState<boolean>(true);

// query for fetching book data. author should fetch image etc.
const bookQuery: string = `*[_type == "book" && slug.current == "${slug}"]{
        title,
        slug,
        body,
        url,
        publishedAt,
        author->{
            name,
            image{
                asset->{
                    _id,
                    url
                }
            }
        },
        category->{title,slug},
        mainImage{
            asset->{
                _id,
                url
            }
        }
    }`;

    // fetch book data from sanity
    const fetchBook = async () => {
        setLoading(true);
        try {
            const bookResult = await client.fetch(bookQuery);
            if(bookResult.length > 0) {
                const book : Book = bookResult[0];
                setBook(book);
                setLoading(false);
            } else {
                setError("No book found");
                setLoading(false);
            }        
        } catch(e) {
            setError("Error fetching book data");
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchBook();
    }, []);

    return {book, error, loading};

}

export default useBook;
