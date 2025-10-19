import { useNavigate } from 'react-router';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Rating from '@mui/material/Rating';

import type { Film } from '../../types';

function ReviewCard({ film }: { film: Film }) {
  const navigate = useNavigate();
  const {
    cast,
    id,
    image_url,
    rating,
    release_year,
    review_text,
    title,
  } = film;

  const director = cast.find((member) =>
    member.credits.includes('Director')
  )?.name;

  const handleReadMore = () => {
    navigate(`/${id}`, { state: film });
  };

  return (
    <Card
      sx={{
        width: 350,
        height: 550,
        marginBottom: 2,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <CardMedia
        component='img'
        height='240'
        image={image_url}
        alt={title}
        sx={{ flexShrink: 0 }}
      />
      <CardContent sx={{ flexGrow: 1, overflow: 'hidden' }}>
        <Typography variant='h6'>{title}</Typography>
        <Typography variant='body2'>
          {director || 'Director Unknown'}
        </Typography>
        <Typography variant='body2'>{release_year}</Typography>
        <Rating sx={{mt: 2}} value={rating} precision={0.5} readOnly size="small" />
        <Typography variant='body2' sx={{ mt: 4, wordBreak: 'break-word' }}>
          {review_text && review_text.length > 100
            ? `${review_text.substring(0, 190)}...`
            : review_text}
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
