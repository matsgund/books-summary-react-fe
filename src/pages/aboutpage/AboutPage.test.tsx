import {describe, test, expect} from 'vitest';
import {render, screen} from '@testing-library/react';
import AboutPage from './AboutPage';

describe('AboutPage', () => {
    
        test('should render about page', () => {
            render(<AboutPage />);
            expect(screen.getByText('About')).toBeDefined();
        });
    }

);