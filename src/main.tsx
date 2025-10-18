import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider, CssBaseline } from '@mui/material';

import App from "./components/App.js";
import theme from './theme.ts';

createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </StrictMode>
);
