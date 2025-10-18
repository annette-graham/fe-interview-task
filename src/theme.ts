import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#eaeaea',
      contrastText: '#7d7d7d',
    },
    secondary: {
      main: '#001389',
    },
    text: {
      primary: '#7d7d7d',
    },
  },
  typography: {
    fontFamily: "'Inter', sans-serif",
  },
});

export default theme;