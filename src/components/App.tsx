import { useState } from 'react';
import Container from '@mui/material/Container';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import mubiLogo from '/logo.svg';
import NewReviewDialog from '../features/NewReview/new-review-dialog';

const App = () => {
  const [openForm, setOpenForm] = useState(false);

  const handleClickOpenForm = () => {
    setOpenForm(true);
  };
  const handleCloseForm = () => {
    setOpenForm(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('Form submitted', event);
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
        <Box sx={{ mt: 20, textAlign: 'center' }}>
          <Typography variant='h5'>No reviews yet</Typography>
          <Typography>Click the + button to add your first review</Typography>
        </Box>

        <NewReviewDialog
          isOpen={openForm}
          onClose={handleCloseForm}
          onSubmit={handleSubmit}
        />
      </Container>
    </>
  );
};

export default App;
