import { useState, useEffect } from 'react';
import client from '@/utils/sanityClient';
import  Book  from '@/interfaces/bookInterface';

interface UseBooksResult {
    books: Book[];
    booksError: string;
    loading: boolean;
}

const useBooks = () : UseBooksResult => {

    // query for fetching the 3 latest items
    const [books, setBooks] = useState<Book[]>([]);
    const [error, setError] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const query: string = `*[_type == "book"] | order(publishedAt desc)[0..2] {
                title,
                slug,
                mainImage{
                asset->{
                _id,
                url
            }
        }
    }`;

    // fetch the data
    const fetchBooks = async () => {
      setLoading(true);
        const abortController = new AbortController();
        const options = { signal: abortController.signal };
        try {
          const booksResult: Book[] = await client.fetch(query, options);
          setBooks(booksResult);
          setLoading(false);
        } catch(e) {
          setError("Unable to load books");
          setLoading(false);
        }
      
        return () => abortController.abort();
      }

    // run the fetch function on mount
    useEffect(() => {
        fetchBooks();
    }, []);
    

    // return the data
    return {books, booksError: error, loading};
}

 export default useBooks;
