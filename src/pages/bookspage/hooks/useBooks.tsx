import { useState, useEffect } from 'react';
import client from '@/utils/sanityClient';
import { QueryItemsProps, BooksResult } from './hooksInterfaces';
import Book from '@/interfaces/bookInterface';


// make a synchronous call to sanity to fetch books
const useBooks  = ({queryItems, querySearch, latestBookId} : QueryItemsProps) : BooksResult  =>  {
 
    const [books, setBooks] = useState<Book[]>([]);
    const [error, setError] = useState<string>("");
    const bookLimit : number  = 10;

    let booksQueryConstructor = (reset: boolean) : string => {
        
        let useLatestBook : boolean = false;
        if(!reset) {
            useLatestBook = true;
        }
        
        const booksQuery : string = `*[_type == "book" 
        && (${querySearch.length > 0 ? `title match "${querySearch}" || author->name match "${querySearch}"` : `true`} )
        && (${queryItems.items.length > 0 ? `category->slug.current in [${queryItems.items.map(item => `'${item}'`)}]` : `true`})
        && (${latestBookId.length > 0 && useLatestBook ? `_id > "${latestBookId}"` : `true`})
        ]
    
        | order(_id) [0...${bookLimit}]
    
            {
                _id,
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

            return booksQuery;

    }
  
    // fetch books
    const fetchBooks = async (resetBooks: boolean) => {
        try {
            const query = booksQueryConstructor(resetBooks);
            const booksResult : Book[] = await client.fetch(query);
            if(resetBooks) {
                setBooks(booksResult);
            } else {
                // set a time out to simulate a loading state
                setBooks([...books, ...booksResult]);
            }
        } catch(e) {
            setError("Something went wrong while fetching books");
        }
    }

    // fetch books and categories on page load and when queryItems changes
    useEffect(() => {
        fetchBooks(true);
    }, [queryItems, querySearch]);

     // fetch books and categories on page load and when latestBookId changes
     useEffect(() => {
        fetchBooks(false);
    }, [latestBookId]);

    return {books, booksError: error};

} 

export default useBooks;    
 
 
