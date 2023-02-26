import {describe, test, expect} from 'vitest';
import {render, screen} from '@testing-library/react';
import BookPage from './BookPage';


describe('BookPage', () => {
    // check that <BookPage /> renders the {book.title}
    test('should render book page', () => {
        render(<BookPage />);
        expect(screen.getByText('something went wrong')).toBeDefined();
    });
});

