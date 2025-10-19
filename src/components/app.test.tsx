import { render } from '@testing-library/react';

import App from './App';
import { FilmContextProvider } from '../context/film-context';

describe('App', () => {
  beforeAll(() => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve([]),
      } as any)
    );
  });

  it('should render without crashing', () => {
    const { container } = render(
      <FilmContextProvider>
        <App />
      </FilmContextProvider>
    );
    expect(container).toBeInTheDocument();
  });
});

// TODO: add more tests if time allows
