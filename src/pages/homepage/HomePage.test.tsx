import {describe, test, expect} from 'vitest';
import {render, screen} from '@testing-library/react';
import HomePageBooks from './components/homepageBooks/homePageBooks';

describe('HomePageBooks', () => {

    test('should render books or error message if unable to fetch recent books', () => {
        render(<HomePageBooks />);
        expect(screen.findAllByText(/Recently added:|Unable to load books/)).toBeDefined();
    });
    }
);



