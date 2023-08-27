import { createTheme } from '@mui/material/styles';

const defaultTheme = createTheme({
  palette: {
    primary: {
      main: "#F1895A",
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