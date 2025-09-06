
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import { useDogs } from './hooks/useDogs';
import type { Dog } from './types';

vi.mock('./hooks/useDogs');

const mockDogs: Dog[] = [
  { imageUrl: 'https://images.dog.ceo/breeds/hound-afghan/n02088094_1003.jpg', breed: 'hound' },
  { imageUrl: 'https://images.dog.ceo/breeds/hound-basset/n02088238_10005.jpg', breed: 'hound' },
  { imageUrl: 'https://images.dog.ceo/breeds/terrier-kerryblue/n02093859_1002.jpg', breed: 'terrier' },
];

describe('App', () => {
  it('renders loading state', () => {
    vi.mocked(useDogs).mockReturnValue({
      isPending: true,
      isError: false,
      data: null,
      error: null,
    });

    render(<App />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders error state', () => {
    vi.mocked(useDogs).mockReturnValue({
      isPending: false,
      isError: true,
      data: null,
      error: { message: 'Test error' },
    });

    render(<App />);
    expect(screen.getByText('Error: Test error')).toBeInTheDocument();
  });

  it('renders main content', () => {
    vi.mocked(useDogs).mockReturnValue({
      isPending: false,
      isError: false,
      data: mockDogs,
      error: null,
    });

    render(<App />);
    expect(screen.getByText('Dog Viewer')).toBeInTheDocument();
    expect(screen.getAllByRole('img').length).toBeGreaterThan(0);
  });

  it('adds a dog to favorites', () => {
    vi.mocked(useDogs).mockReturnValue({
      isPending: false,
      isError: false,
      data: mockDogs,
      error: null,
    });

    render(<App />);
    const favoriteButton = screen.getByText('Add To Favorites');
    fireEvent.click(favoriteButton);
    expect(screen.getByText('Favorites')).toBeInTheDocument();
  });

  it('removes a dog from favorites', () => {
    vi.mocked(useDogs).mockReturnValue({
      isPending: false,
      isError: false,
      data: mockDogs,
      error: null,
    });

    render(<App />);
    const favoriteButton = screen.getByText('Add To Favorites');
    fireEvent.click(favoriteButton);
    const removeButton = screen.getByRole('button', { name: /remove/i });
    fireEvent.click(removeButton);
    expect(screen.queryByText('Favorites')).not.toBeInTheDocument();
  });

  it('filters thumbnails', () => {
    vi.mocked(useDogs).mockReturnValue({
      isPending: false,
      isError: false,
      data: mockDogs,
      error: null,
    });

    render(<App />);
    const filterInput = screen.getByPlaceholderText('Filter by breed...');
    fireEvent.change(filterInput, { target: { value: 'terrier' } });
    const images = screen.getAllByRole('img');
    // Main image + 1 filtered thumbnail
    expect(images.length).toBe(2);
  });
});
