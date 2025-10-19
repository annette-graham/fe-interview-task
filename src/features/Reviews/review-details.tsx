import { useParams, useNavigate } from 'react-router';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

import { useFilms } from '../../context/film-context';
import HeaderBar from '../../components/header-bar';

function ReviewDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { reviewedFilms, deleteReview } = useFilms();

  const film = reviewedFilms.find((f) => f.id === String(id));

  if (!film) {
    return (
      <Container sx={{ mt: 10, textAlign: 'center' }}>
        <IconButton
          aria-label='go-back'
          size='large'
          onClick={() => navigate('/')}
        >
          <ArrowBackIosNewIcon sx={{ fontSize: 40 }} />
        </IconButton>
        <Typography variant='h5'>Review not found</Typography>
      </Container>
    );
  }
  const { title, release_year, review_text, cast, image_url } = film;

  const director = cast.find((member) =>
    member.credits.includes('Director')
  )?.name;

  const handleDeleteReview = () => {
    // TODO: add `confirm delete` functionality
    deleteReview(String(id));
    navigate('/');
  };

  const handleBackNavigation = () => {
    navigate(`/`);
  };

  return (
    <>
      <HeaderBar
        buttonLabel='delete-review'
        clickHandler={handleDeleteReview}
        icon={<DeleteOutlineOutlinedIcon sx={{ fontSize: 40 }} />}
        title={title}
      />

      <Container sx={{ height: '100vh' }}>
        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between' }}>
          <Box>
            <IconButton
              aria-label='go-back'
              size='large'
              onClick={handleBackNavigation}
            >
              <ArrowBackIosNewIcon sx={{ fontSize: 40 }} />
            </IconButton>
            <Typography sx={{ mt: 8 }} variant='h5'>
              {title}
            </Typography>
            <Typography variant='body1' sx={{ mt: 2 }}>
              {' '}
              {director || 'Director Unknown'}
            </Typography>
            <Typography variant='body1'>{release_year}</Typography>
          </Box>
          <Box sx={{ width: '700px' }}>
            <img
              src={image_url}
              alt={title}
              style={{ width: '100%', height: 'auto' }}
            />
          </Box>
        </Box>
        <Typography sx={{ mt: 10, fontSize: 18 }} variant='body1'>
          {review_text}
        </Typography>
      </Container>
    </>
  );
}

export default ReviewDetails;
