import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from 'react';
import { API_URL } from '../constants';
import type { Film } from '../types';

interface FilmContextType {
  availableFilms: Film[];
  reviewedFilms: Film[];
  setAvailableFilms: (films: Film[]) => void;
  setReviewedFilms: (films: Film[]) => void;
  addReview: (film: Film) => void;
  deleteReview: (filmId: string) => void;
}

const FilmContext = createContext<FilmContextType | undefined>(undefined);

const STORAGE_KEYS = {
  REVIEWED_FILMS: 'mubi_reviewed_films',
  AVAILABLE_FILMS: 'mubi_available_films',
};

function FilmContextProvider({ children }: { children: ReactNode }) {
  const [availableFilms, setAvailableFilms] = useState<Film[]>([]);
  const [reviewedFilms, setReviewedFilms] = useState<Film[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const loadFromStorage = () => {
      try {
        const storedReviewed = localStorage.getItem(
          STORAGE_KEYS.REVIEWED_FILMS
        );
        const storedAvailable = localStorage.getItem(
          STORAGE_KEYS.AVAILABLE_FILMS
        );

        if (storedReviewed) {
          setReviewedFilms(JSON.parse(storedReviewed));
        }

        if (storedAvailable) {
          setAvailableFilms(JSON.parse(storedAvailable));
          setIsInitialized(true);
        } else {
          // Only fetch from API if nothing in localStorage
          fetchFilmLogs();
        }
      } catch (error) {
        console.error('Error loading from localStorage:', error);
        // Fallback to fetching from API
        fetchFilmLogs();
      }
    };

    loadFromStorage();
  }, []);

  const fetchFilmLogs = async () => {
    try {
      const response = await fetch(API_URL);
      const data: Film[] = await response.json();
      setAvailableFilms(data);
      setIsInitialized(true);
    } catch (error) {
      console.error('Error fetching films:', error);
    }
  };

  // Save reviewedFilms to localStorage whenever it changes
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem(
        STORAGE_KEYS.REVIEWED_FILMS,
        JSON.stringify(reviewedFilms)
      );
    }
  }, [reviewedFilms, isInitialized]);

  // Save availableFilms to localStorage whenever it changes
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem(
        STORAGE_KEYS.AVAILABLE_FILMS,
        JSON.stringify(availableFilms)
      );
    }
  }, [availableFilms, isInitialized]);

  const addReview = (newFilm: Film) => {
    setReviewedFilms((prev) => [...prev, newFilm]);
    setAvailableFilms(
      (prev) => prev && prev.filter((film) => film.id !== newFilm.id)
    );
  };

  const deleteReview = (filmId: string) => {
    const deletedFilm = reviewedFilms.find((film) => film.id === filmId);
    if (deletedFilm) {
      setReviewedFilms((prev) => prev.filter((film) => film.id !== filmId));
      // Remove review_text and rating before adding back to available films. TODO: add it back in alphabetical order
      const { review_text, rating, ...filmWithoutReview } = deletedFilm;
      setAvailableFilms((prev) => prev && [...prev, filmWithoutReview as Film]);
    }
  };

  return (
    <FilmContext.Provider
      value={{
        availableFilms,
        reviewedFilms,
        setAvailableFilms,
        setReviewedFilms,
        addReview,
        deleteReview,
      }}
    >
      {children}
    </FilmContext.Provider>
  );
}

function useFilms() {
  const context = useContext(FilmContext);
  if (context === undefined) {
    throw new Error('useFilms must be used within a FilmContextProvider');
  }
  return context;
}

export { FilmContextProvider, useFilms };
