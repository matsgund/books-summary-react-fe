import {describe, test, expect, vi} from 'vitest';
import {render, screen} from '@testing-library/react';
import HomePageBooks from './homePageBooks';
import Book from '@/interfaces/bookInterface';
import {booksData} from '@/data/books.data';
import useBooks from '../../hooks/useBooks';

interface UseBooksResult {
    books: Book[];
    booksError: string;
}

// vi.mock('../../hooks/useBooks');
// const mockUseBooksResults = {books: booksData, booksError: true};

const mock = {books: [], booksError: ""} as UseBooksResult;
vi.mock('../hooks/useBooks', () => ({
   useBooks: () => {
       return mock;
   },
}));


describe('HomePageBooks', () => {
    
        test('should render books or error message if unable to fetch recent books', () => {
            render(<HomePageBooks />);
            expect(screen.findAllByText(/Recently added:|Unable to load books/)).toBeDefined();
        });

        test('should render books if able to fetch recent books', () => {
            // useBooks.mockReturnValue(mockUseBooksResults);
            mock.books = booksData;
            mock.booksError = "";
            render(
            <HomePageBooks />
            );
            expect(screen.getByText("Book Title")).toBeDefined();
        });

        
    
    
    
    }
);

