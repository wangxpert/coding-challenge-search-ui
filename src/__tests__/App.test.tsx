/* eslint-disable testing-library/no-wait-for-multiple-assertions */
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from '../App';

// Mock the fetch function
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    status: 200,
    json: () => Promise.resolve([]), // Mock an empty array as the response
    headers: new Headers(),
    redirected: false,
    statusText: 'OK',
    type: 'basic',
    url: '',
    clone: jest.fn(),
    body: null,
    bodyUsed: false,
    arrayBuffer: jest.fn(),
    blob: jest.fn(),
    formData: jest.fn(),
    text: jest.fn(),
  } as any)
);

test('provides a search form', () => {
  render(<App />);
  const searchField = screen.getByPlaceholderText(/Enter search query/i);
  const searchButton = screen.getByRole('button', { name: /Search/i });
  expect(searchField).toBeInTheDocument();
  expect(searchButton).toBeInTheDocument();
});

test('triggers search by clicking the "Search" button', async () => {
  render(<App />);
  const searchField = screen.getByPlaceholderText(/Enter search query/i);
  const searchButton = screen.getByRole('button', { name: /Search/i });

  fireEvent.change(searchField, { target: { value: 'test query' } });
  fireEvent.click(searchButton);

  await waitFor(() => {
    const result = screen.getByTestId('search-result');
    expect(result).toBeInTheDocument();
  });
});

test('triggers search by pressing the Enter key', async () => {
  render(<App />);
  const searchField = screen.getByPlaceholderText(/Enter search query/i);

  fireEvent.change(searchField, { target: { value: 'test query' } });
  fireEvent.keyDown(searchField, { key: 'Enter', code: 'Enter' });

  await waitFor(() => {
    const result = screen.getByTestId('search-result');
    expect(result).toBeInTheDocument();
  });
});

test('shows loading state while search results are loading', async () => {
  render(<App />);
  const searchField = screen.getByPlaceholderText(/Enter search query/i);
  const searchButton = screen.getByRole('button', { name: /Search/i });

  fireEvent.change(searchField, { target: { value: 'test query' } });
  fireEvent.click(searchButton);

  await waitFor(() => {
    const loading = screen.getByTestId('search-loader');
    expect(loading).toBeInTheDocument();
  });
});

test('shows result title and description', async () => {
  // Mock the fetch function to return a specific response
  (global.fetch as jest.Mock).mockImplementationOnce(() =>
    Promise.resolve({
      json: () => Promise.resolve([
        { id: '1', title: 'Result Title', url: '#', description: 'Result Description', category: 'VIDEOS' }
      ]),
    })
  );

  render(<App />);
  const searchField = screen.getByPlaceholderText(/Enter search query/i);
  const searchButton = screen.getByRole('button', { name: /Search/i });

  fireEvent.change(searchField, { target: { value: 'test query' } });
  fireEvent.click(searchButton);

  await waitFor(() => {
    const title = screen.getByText(/Result Title/i);
    const description = screen.getByText(/Result Description/i);
    expect(title).toBeInTheDocument();
    expect(description).toBeInTheDocument();
  });
});

test('opens search result URL in a new tab', async () => {
  // Mock the fetch function to return a specific response
  (global.fetch as jest.Mock).mockImplementationOnce(() =>
    Promise.resolve({
      json: () => Promise.resolve([
        { id: '1', title: 'Result Title', url: '#', description: 'Result Description', category: 'VIDEOS' }
      ]),
    })
  );

  render(<App />);
  const searchField = screen.getByPlaceholderText(/Enter search query/i);
  const searchButton = screen.getByRole('button', { name: /Search/i });

  fireEvent.change(searchField, { target: { value: 'test query' } });
  fireEvent.click(searchButton);

  await waitFor(() => {
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('target', '_blank');
  });
});

test('marks search results as their content type', async () => {
  // Mock the fetch function to return a specific response
  (global.fetch as jest.Mock).mockImplementationOnce(() =>
    Promise.resolve({
      json: () => Promise.resolve([
        { id: '1', title: 'Result Title', url: '#', description: 'Result Description', category: 'VIDEOS' },
        { id: '2', title: 'Another Title', url: '#', description: 'Another Description', category: 'PLAYLISTS' },
        { id: '3', title: 'Blog Post Title', url: '#', description: 'Blog Post Description', category: 'BLOG_POSTS' }
      ]),
    })
  );

  render(<App />);
  const searchField = screen.getByPlaceholderText(/Enter search query/i);
  const searchButton = screen.getByRole('button', { name: /Search/i });

  fireEvent.change(searchField, { target: { value: 'test query' } });
  fireEvent.click(searchButton);

  await waitFor(() => {
    const videoLabel = screen.getByTestId(/video/i);
    const playlistLabel = screen.getByTestId(/playlist/i);
    const blogPostLabel = screen.getByTestId(/blog_post/i);
    expect(videoLabel).toBeInTheDocument();
    expect(playlistLabel).toBeInTheDocument();
    expect(blogPostLabel).toBeInTheDocument();
  });
});

test('informs user if no search results match their query', async () => {
  render(<App />);
  const searchField = screen.getByPlaceholderText(/Enter search query/i);
  const searchButton = screen.getByRole('button', { name: /Search/i });

  fireEvent.change(searchField, { target: { value: 'no results query' } });
  fireEvent.click(searchButton);

  await waitFor(() => {
    const noResultsMessage = screen.getByText(/There are no results matching your query./i);
    expect(noResultsMessage).toBeInTheDocument();
  });
});
