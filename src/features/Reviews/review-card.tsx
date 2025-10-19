import { useNavigate } from 'react-router';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import type { Film } from '../../types';

function ReviewCard({ film }: { film: Film }) {
  const navigate = useNavigate();

  const director = film.cast.find((member) =>
    member.credits.includes('Director')
  )?.name;

  const handleReadMore = () => {
    navigate(`/${film.id}`, { state: film });
  };

  return (
    <Card
      sx={{
        width: 350,
        height: 500,
        marginBottom: 2,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <CardMedia
        component='img'
        height='240'
        image={film.image_url}
        alt={film.title}
        sx={{ flexShrink: 0 }}
      />
      <CardContent sx={{ flexGrow: 1, overflow: 'hidden' }}>
        <Typography variant='h6'>{film.title}</Typography>
        <Typography variant='body2'>
          {director || 'Director Unknown'}
        </Typography>
        <Typography variant='body2'>{film.release_year}</Typography>
        <Typography variant='body2' sx={{ mt: 4, wordBreak: 'break-word' }}>
          {film.review_text && film.review_text.length > 100
            ? `${film.review_text.substring(0, 190)}...`
            : film.review_text}
        </Typography>
      </CardContent>
      <CardActions sx={{ flexShrink: 0 }}>
        <Button
          sx={{ color: 'text.primary' }}
          size='small'
          onClick={handleReadMore}
        >
          Read More
        </Button>
      </CardActions>
    </Card>
  );
}

export default ReviewCard;
