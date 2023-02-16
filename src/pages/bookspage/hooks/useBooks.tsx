import { useState, useEffect } from 'react';
import client from '@/utils/sanityClient';
import Book from '@/interfaces/bookInterface';


interface BooksResult {
    books: Book[];
    booksError: string;
}

interface QueryItemsProps {
    queryItems: {
        items: string[];
    },
    querySearch: string;
}
 
const useBooks = ({queryItems, querySearch} : QueryItemsProps) : BooksResult => {

    const [books, setBooks] = useState<Book[]>([]);
    const [error, setError] = useState<string>("");

    // query for books. Filter on queryItems. Return all books if queryItems is empty.
    const booksQuery : string = `*[_type == "book" 
    && (${querySearch.length > 0 ? `title match "${querySearch}" || author->name match "${querySearch}"` : `true`} )
    && (${queryItems.items.length > 0 ? `category->slug.current in [${queryItems.items.map(item => `'${item}'`)}]` : `true`}) ]
    {
        title,
        slug,
        author->{name},
        category->{title,slug},  
        mainImage{
            asset->{
            _id,
            url
        }
        }
    }`;

    // fetch books
    const fetchBooks = async () => {
        try {
            const booksResult : Book[] = await client.fetch(booksQuery);
            setBooks(booksResult);
        } catch(e) {
            setError("Something went wrong while fetching books");
        }
    }

    // fetch books and categories on page load and when queryItems changes
    useEffect(() => {
        fetchBooks();
    }, [queryItems, querySearch]);

    return {books, booksError: error};

} 

export default useBooks;    
 
 
