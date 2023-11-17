import { createTheme } from '@mui/material/styles';

const defaultTheme = createTheme({
  palette: {
    primary: {
      main: "#F25D29",
      contrastText: "#fff",
    },
    secondary: {
      main: "#FFAA83",
    },
    white: {
      main: '#FFFFFF',
    }
  },
});

export default defaultTheme;