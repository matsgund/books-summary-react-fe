import {describe, test, expect, vi} from 'vitest';
import {render, screen} from '@testing-library/react';
import HomePageBooks from './homePageBooks';
import Book from '@/interfaces/bookInterface';
import {booksData} from '@/data/books.data';
import useBooks from '../../hooks/useBooks';
import { MemoryRouter } from 'react-router-dom';

interface UseBooksResult {
    books: Book[];
    booksError: string;
}

// mock some different results from the useBooks hook
 vi.mock('../../hooks/useBooks');
 const mockUseBooks = useBooks as vi.mock<UseBooksResult>;
 const mockUseBooksResultsSuccessfuly = {books: booksData, booksError: ""};
 const mockUseBooksResultsFailed = {books: booksData, booksError: "Something went wrong"};
 const mockUseBooksResultsEmpty = {books: [], booksError: ""};

describe('HomePageBooks', () => {
    
         test('should render books or error message if unable to fetch recent books', () => {
            mockUseBooks.mockReturnValue(mockUseBooksResultsFailed); 
            render(<HomePageBooks />);
            expect(screen.findAllByText(/Recently added:|Unable to load books/)).toBeDefined();
         });

        test('should render books if able to fetch recent books', () => {
            mockUseBooks.mockReturnValue(mockUseBooksResultsSuccessfuly);
            render(
                <MemoryRouter>
                    <HomePageBooks />
                </MemoryRouter>
            );
            expect(screen.getByText("Book Title")).toBeDefined();
            expect(screen.getByText("Book Title 2")).toBeDefined();
            expect(screen.getByText("Book Title 3")).toBeDefined();
        });

        test('If API returns an empty array unable to find books should be displayed', () => {
            mockUseBooks.mockReturnValue(mockUseBooksResultsEmpty);
            render(
                <MemoryRouter>
                    <HomePageBooks />
                </MemoryRouter>
            );
            expect(screen.getByText("Unable to load books")).toBeDefined();
        }); 
    }
);

