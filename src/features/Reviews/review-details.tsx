import Container from '@mui/material/Container';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import mubiLogo from '/logo.svg';

function ReviewDetails() {
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
            aria-label='delete-review'
            size='large'
          >
            <DeleteOutlineOutlinedIcon sx={{ fontSize: 40 }} />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Container sx={{ height: '100vh' }}>
          // Review details content goes here
      </Container>
    </>
  );
}

export default ReviewDetails;
