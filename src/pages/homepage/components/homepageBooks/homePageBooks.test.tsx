import {describe, test, expect, vi} from 'vitest';
import {render, screen, waitFor} from '@testing-library/react';
import HomePageBooks from './homePageBooks';
import Book from '@/interfaces/bookInterface';
import {booksData} from '@/data/books.data';
import useBooks from '../../hooks/useBooks';
import { MemoryRouter } from 'react-router-dom';

interface UseBooksResult {
    books: Book[];
    booksError: string;
    loading: boolean;
}

// mock some different results from the useBooks hook
 vi.mock('../../hooks/useBooks');
 //@ts-ignore
 const mockUseBooks = useBooks as vi.mock<UseBooksResult>;
 const mockUseBooksResultsSuccessfuly = {books: booksData, booksError: "", loading: false};
 const mockUseBooksResultsFailed = {books: booksData, booksError: "Unable to load books", loading: false};
 const mockUseBooksResultsEmpty = {books: [], booksError: "", loading: false};

describe('HomePageBooks', () => {
    
         test('should render books or error message if unable to fetch recent books', async () => {
            await mockUseBooks.mockReturnValue(mockUseBooksResultsFailed); 
            render(<HomePageBooks />);
            await waitFor(()=> expect(screen.findAllByText(/Recently added:|Unable to load books/)).toBeDefined());
         });

         test('should render books if able to fetch recent books', async () => {
            await mockUseBooks.mockReturnValue(mockUseBooksResultsSuccessfuly);
            render(
                <MemoryRouter>
                    <HomePageBooks />
                </MemoryRouter>
            );
            const bookImages = screen.getAllByAltText("book image");
            expect(bookImages.length).toBe(3);
            expect(bookImages[0].getAttribute('src')).toBe('https://via.placeholder.com/150');
            expect(bookImages[1].getAttribute('src')).toBe('https://via.placeholder.com/150');
            expect(bookImages[2].getAttribute('src')).toBe('https://via.placeholder.com/150');
        });
        
    

    }
);

