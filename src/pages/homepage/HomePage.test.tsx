import {describe, test, expect} from 'vitest';
import {render, screen} from '@testing-library/react';
import HomePage from './HomePage';
import { MemoryRouter } from 'react-router-dom';

describe('HomePageBooks', () => {

    test('should the homepage title', () => {
        render(
            <MemoryRouter>
                <HomePage />
            </MemoryRouter>
        );
        expect(screen.getByText('The Summary Hub')).toBeDefined();
    });

    }
);



