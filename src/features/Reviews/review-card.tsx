import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import type { Film } from '../../types';

function ReviewCard({ film }: { film: Film }) {
  const director = film.cast.find((member) =>
    member.credits.includes('Director')
  )?.name;

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
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant='h6'>{film.title}</Typography>
        <Typography variant='body2'>
          {' '}
          {director || 'Director Unknown'}
        </Typography>
        <Typography variant='body2'>{film.release_year}</Typography>
        <Typography variant='body2' sx={{ mt: 4 }}>
          {film.review_text}
        </Typography>
      </CardContent>
      <CardActions>
        <Button sx={{ color: 'text.primary' }} size='small'>
          Read More
        </Button>
      </CardActions>
    </Card>
  );
}

export default ReviewCard;
