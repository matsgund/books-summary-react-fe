import {describe, test, expect} from 'vitest';
import {render, screen} from '@testing-library/react';
import HomePage from './HomePage';
import { MemoryRouter } from 'react-router-dom';

describe('HomePageBooks', () => {

    test('Should always display homepage title"', () => {
        render(
            <MemoryRouter>
                <HomePage />
            </MemoryRouter>
        );
        expect(screen.getByText(/The Smmary Hub/)).toBeDefined();
    });

    test('should give error unable to load books', () => {
        render(
            <MemoryRouter>
                <HomePage />
            </MemoryRouter>
        );
        expect(screen.getByText(/Unable to load books/)).toBeDefined();
    });
    }
);



