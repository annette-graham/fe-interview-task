import type { ReactNode } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import mubiLogo from '/logo.svg';

interface HeaderBarProps {
  buttonLabel: string;
  clickHandler: () => void;
  icon: ReactNode;
  title: string;
}

function HeaderBar({ clickHandler, buttonLabel, icon, title }: HeaderBarProps) {
  return (
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
          {title}
        </Typography>
        <IconButton
          aria-label={buttonLabel}
          size='large'
          onClick={clickHandler}
        >
          {icon}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

export default HeaderBar;
