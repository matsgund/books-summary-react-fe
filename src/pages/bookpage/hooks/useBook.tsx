import { useState, useEffect } from 'react';
import client from '@/utils/sanityClient';
import  Book  from '@/interfaces/bookInterface';

interface UseBookResult {
    book: Book | undefined;
    error: string | undefined;
}

const useBook = (slug: string | undefined): UseBookResult  => {

const [book, setBook] = useState<Book>();
const [error, setError] = useState<string>();

// query for fetching book data. author should fetch image etc.
const bookQuery: string = `*[_type == "book" && slug.current == "${slug}"]{
        title,
        slug,
        body,
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
        try {
            const bookResult = await client.fetch(bookQuery);
            if(bookResult.length > 0) {
                const book : Book = bookResult[0];
                setBook(book);
            } else {
                setError("No book found");
            }        
        } catch(e) {
            setError("Error fetching book data");
        }
    }

    useEffect(() => {
        fetchBook();
    }, []);

    return {book, error};

}

export default useBook;
