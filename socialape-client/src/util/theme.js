const themeFile = {
  palette: {
    primary: {
      light: '#ff7071',
      main: '#e63946',
      dark: '#ad001f',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ffffff',
      main: '#f1faee',
      dark: '#f1faee',
      contrastText: '#000',
    },
  },
  typography: {
    useNextVariants: true,
  },
  spreadThis: {
    form: {
      textAlign: 'center',
    },
    image: {
      margin: '20px auto 20px auto',
      height: '100px',
    },
    pageTitle: {
      margin: '10px auto 10px auto',
    },
    textField: {
      margin: '10px auto 10px auto',
    },
    button: {
      marginBottom: 20,
      marginTop: 20,
      position: 'relative',
    },
    customError: {
      marginTop: 10,
      color: 'red',
      fontSize: '0.8rem',
    },
    progress: {
      position: 'absolute',
    },
  },
};

export default themeFile;
