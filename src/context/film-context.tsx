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

function FilmContextProvider({ children }: { children: ReactNode }) {
  const [availableFilms, setAvailableFilms] = useState<Film[]>([]);
  const [reviewedFilms, setReviewedFilms] = useState<Film[]>([]);

  useEffect(() => {
    const fetchFilmLogs = async () => {
      const response = await fetch(API_URL);
      const data: Film[] = await response.json();
      setAvailableFilms(data);
    };

    fetchFilmLogs();
  }, []);

  const addReview = (newFilm: Film) => {
    setReviewedFilms((prev) => [...prev, newFilm]);
    setAvailableFilms((prev) => prev && prev.filter((film) => film.id !== newFilm.id));
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
