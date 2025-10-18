import { useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import mubiLogo from '/logo.svg';
import { API_URL } from '../constants';
import type { Film } from '../types';
import NewReviewDialog from '../features/NewReview/new-review-dialog';
import ReviewCard from '../features/Reviews/review-card';

const App = () => {
  const [openForm, setOpenForm] = useState(false);
  const [availableFilms, setAvailableFilms] = useState<Film[]>();
  const [reviewedFilms, setReviewedFilms] = useState<Film[]>([]);

  useEffect(() => {
    const fetchFilmLogs = async () => {
      const response = await fetch(API_URL);
      const data: Film[] = await response.json();
      setAvailableFilms(data);
    };

    fetchFilmLogs();
  }, []);

  const handleClickOpenForm = () => {
    setOpenForm(true);
  };
  const handleCloseForm = () => {
    setOpenForm(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formValues = Object.fromEntries((formData as any).entries());

    const selectedFilm = availableFilms?.find((film) => film.title === formValues.filmTitle);

    const newAvailableFilms = availableFilms?.filter((film) => film.title !== formValues.filmTitle);    

    setAvailableFilms(newAvailableFilms);

    if (!selectedFilm) {
      // TODO: show error to user or validate form input
      console.warn('Film not found');
      return;
    }

    const newReview = {
      ...selectedFilm,
      review_text: formValues.review_text as string,
    };

    setReviewedFilms([...reviewedFilms, newReview]);
    handleCloseForm();
  };

  return (
    <>
      <AppBar position='static' color='primary'>
        <Toolbar
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            p: 1,
          }}
        >
          <Box>
            <img src={mubiLogo} alt='Mubi logo' style={{ maxWidth: '70px' }} />
          </Box>
          <Typography variant='h1' sx={{ fontSize: 40, textAlign: 'center' }}>
            Film Log
          </Typography>
          <IconButton
            aria-label='add-review'
            size='large'
            onClick={handleClickOpenForm}
          >
            <AddCircleOutlineOutlinedIcon sx={{ fontSize: 40 }} />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Container sx={{ height: '100vh' }}>
        {reviewedFilms.length ? (
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
            {reviewedFilms.map((film) => (
              <ReviewCard key={film.id} film={film} />
            ))}
          </Grid>
        ) : (
          <Box sx={{ mt: 20, textAlign: 'center' }}>
            <Typography variant='h5'>No reviews yet</Typography>
            <Typography>Click the + button to add your first review</Typography>
          </Box>
        )}

        <NewReviewDialog
          isOpen={openForm}
          onClose={handleCloseForm}
          onSubmit={handleSubmit}
          autoCompleteOptions={
            availableFilms ? availableFilms.map((film) => film.title) : []
          }
        />
      </Container>
    </>
  );
};

export default App;
