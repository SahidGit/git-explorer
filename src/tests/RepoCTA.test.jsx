import { render, screen, cleanup } from '@testing-library/react';
import { describe, it, expect, afterEach } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import RepoCTA from '../components/features/RepoCard/RepoCTA';

afterEach(() => {
    cleanup();
});

describe('RepoCTA Component', () => {
    it('renders as a link with correct text', () => {
        render(
            <MemoryRouter>
                <RepoCTA />
            </MemoryRouter>
        );
        const link = screen.getByRole('link', { name: /explore trending repositories/i });
        expect(link).toBeTruthy();
    });

    it('points to the dashboard', () => {
        render(
            <MemoryRouter>
                <RepoCTA />
            </MemoryRouter>
        );

        const link = screen.getByRole('link', { name: /explore trending repositories/i });
        expect(link.getAttribute('href')).toBe('/dashboard');
    });

    it('has correct styling classes', () => {
        render(
            <MemoryRouter>
                <RepoCTA />
            </MemoryRouter>
        );
        const link = screen.getByRole('link', { name: /explore trending repositories/i });

        expect(link.className).toContain('group');
        expect(link.className).toContain('flex');
        expect(link.className).not.toContain('fixed');
    });
});
