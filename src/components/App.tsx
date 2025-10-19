import { useState } from 'react';
import Container from '@mui/material/Container';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import HeaderBar from './header-bar';
import NewReviewDialog from '../features/NewReview/new-review-dialog';
import ReviewCard from '../features/Reviews/review-card';
import GenreFilter from '../features/Reviews/genre-filter';
import { useFilms } from '../context/film-context';
import type { Film } from '../types';

const App = () => {
  const { availableFilms, reviewedFilms, addReview } = useFilms();
  const [openForm, setOpenForm] = useState(false);
  const [filteredFilms, setFilteredFilms] = useState<Film[]>([]);

  const handleClickOpenForm = () => {
    setOpenForm(true);
  };
  const handleCloseForm = () => {
    setOpenForm(false);
  };

  const handleReviewSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formValues = Object.fromEntries((formData as any).entries());

    const selectedFilm = availableFilms?.find(
      (film) => film.title === formValues.filmTitle
    );

    if (!selectedFilm) {
      // TODO: either show error to user or validate form input
      console.warn('Film not found');
      return;
    }

    const newReview = {
      ...selectedFilm,
      review_text: formValues.review_text as string,
    };
    addReview(newReview);
    handleCloseForm();
  };

  const genres = [...new Set(reviewedFilms.flatMap((film) => film.genres))];

  const handleGenreFilter = (genre: string | null) => {
    if (!genre) {
      setFilteredFilms([]);
      return;
    }
    const filtered = reviewedFilms.filter((film) =>
      film.genres.includes(genre)
    );
    setFilteredFilms(filtered);
  };

  const filmsToDisplay =
    filteredFilms.length > 0 ? filteredFilms : reviewedFilms;

  return (
    <>
      <HeaderBar
        buttonLabel='add-review'
        clickHandler={handleClickOpenForm}
        icon={<AddCircleOutlineOutlinedIcon sx={{ fontSize: 40 }} />}
        title='Film Log'
      />

      <Container sx={{ height: '100vh' }}>
        {reviewedFilms.length ? (
          <>
            <GenreFilter genres={genres} onFilterChange={handleGenreFilter} />
            <Grid
              container
              spacing={4}
              justifyContent='center'
              alignItems='center'
              sx={{
                maxWidth: { xs: 350, sm: 750, lg: 1150 },
                mt: 6,
              }}
            >
              {filmsToDisplay.map((film) => (
                <ReviewCard key={film.id} film={film} />
              ))}
            </Grid>
          </>
        ) : (
          <Box sx={{ mt: 20, textAlign: 'center' }}>
            <Typography variant='h5'>No reviews yet</Typography>
            <Typography>Click the + button to add your first review</Typography>
          </Box>
        )}

        <NewReviewDialog
          isOpen={openForm}
          onClose={handleCloseForm}
          onSubmit={handleReviewSubmit}
          autoCompleteOptions={
            availableFilms ? availableFilms.map((film) => film.title) : []
          }
        />
      </Container>
    </>
  );
};

export default App;
