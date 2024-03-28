
import {describe, test, expect, vi} from 'vitest';
import {render, screen, waitFor} from '@testing-library/react';
import HomePageBooks from './homePageBooks';
import { MemoryRouter } from 'react-router-dom';

interface UseBooksResult {
    books: Book[];
    booksError: string;
    loading: boolean;
}


// Mock the module '@/hooks/useBooksHomepage' 
vi.mock('@/hooks/useBooksHomepage', () => ({
  // This is a mock implementation of useBooks
  default: vi.fn(),
}));

// Import after mocking
import useBooks from '@/hooks/useBooksHomepage';
import Book from '@/interfaces/bookInterface';
import { booksData } from '@/data/books.data';
const mockedUseBooks = useBooks as vi.MockedFunction<() => UseBooksResult>;


// Define mock data
const mockUseBooksResultsSuccessful = {books: booksData, booksError: "", loading: false};
const mockUseBooksResultsFailed = {books: [], booksError: "Unable to load books", loading: false};
const mockUseBooksResultsEmpty = {books: [], booksError: "", loading: false};

describe('HomePageBooks', () => {
    test('should render books or error message if unable to fetch recent books', async () => {
        // Directly use the mocked function to set return values
        useBooks.mockReturnValue(mockUseBooksResultsFailed);
        render(<HomePageBooks />);
        await waitFor(() => expect(screen.findAllByText(/Recently added:|Unable to load books/)).toBeDefined());
    });

    test('should render books if able to fetch recent books', async () => {
        useBooks.mockReturnValue(mockUseBooksResultsSuccessful);
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
});
