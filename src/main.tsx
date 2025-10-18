import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router';
import { ThemeProvider, CssBaseline } from '@mui/material';

import theme from './theme.ts';
import App from './components/App.js';
import ReviewDetails from './features/Reviews/review-details.js';

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route index element={<App />} />
          <Route path='/:id' element={<ReviewDetails />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>
);
