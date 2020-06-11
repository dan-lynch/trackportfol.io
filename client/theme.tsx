import { createMuiTheme } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';
import { deepOrange, grey } from '@material-ui/core/colors';

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#000000',
    },
    secondary: {
      main: deepOrange[700],
    },
    error: {
      main: red.A400,
    },
    background: {
      default: grey[900],
    },
  },
});

export default theme;