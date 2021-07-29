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
    invisibleSeparator: {
      border: 'none',
      margin: 4,
    },
    visibleSeparator: {
      width: '100%',
      borderBottom: '1px solid rgba(0,0,0,0.1)',
      marginBottom: 20,
    },
    paper: {
      padding: 20,
    },
    profile: {
      '& .image-wrapper': {
        textAlign: 'center',
        position: 'relative',
        '& button': {
          position: 'absolute',
          top: '80%',
          left: '70%',
        },
      },
      '& .profile-image': {
        width: 200,
        height: 200,
        objectFit: 'cover',
        maxWidth: '100%',
        borderRadius: '50%',
      },
      '& .profile-details': {
        textAlign: 'center',
        '& span, svg': {
          verticalAlign: 'middle',
        },
        '& a': {
          color: '#00bcd4',
        },
      },
      '& hr': {
        border: 'none',
        margin: '0 0 10px 0',
      },
      '& svg.button': {
        '&:hover': {
          cursor: 'pointer',
        },
      },
    },
    buttons: {
      textAlign: 'center',
      '& a': {
        margin: '20px 10px',
      },
    },
  },
};

export default themeFile;
