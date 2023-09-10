import { createTheme } from '@mui/material/styles';

import components from './ComponentOverRide';
import shadows from './Shadows';
import typography from './Typography';

const baseTheme = {
  palette: {
    primary: {
      main: '#454545',
      light: '#6A6A6A',
      dark: '#303030',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#FBEEBB',
      light: '#FBEEBB',
      dark: '#AFA377',
      contrastText: 'rgba(0, 0, 0, 0.87)',
    },
    success: {
      main: '#00c292',
      light: '#ebfaf2',
      dark: '#00964b',
      contrastText: '#ffffff',
    },
    danger: {
      main: '#e46a76',
      light: '#fdf3f5',
    },
    info: {
      main: '#0bb2fb',
      light: '#a7e3f4',
    },
    error: {
      main: '#e46a76',
      light: '#fdf3f5',
      dark: '#e45a68',
    },
    warning: {
      main: '#fec90f',
      light: '#fff4e5',
      dark: '#dcb014',
      contrastText: '#ffffff',
    },
    text: {
      secondary: '#777e89',
      danger: '#fc4b6c',
    },
    grey: {
      A100: '#ecf0f2',
      A200: '#99abb4',
      A400: '#767e89',
      A700: '#e6f4ff',
    },
    action: {
      disabledBackground: 'rgba(73,82,88,0.12)',
      hoverOpacity: 0.02,
      hover: 'rgba(0, 0, 0, 0.03)',
    },
    background: {
      default: '#fafbfb',
    },
  },
  mixins: {
    toolbar: {
      color: '#949db2',
      '@media(min-width:1280px)': {
        minHeight: '64px',
        padding: '0 30px',
      },
      '@media(max-width:1280px)': {
        minHeight: '64px',
      },
    },
  },
  components,
  shadows,
  typography,
};

export const BuildTheme = () => {
  const theme = createTheme(baseTheme);
  return theme;
};
