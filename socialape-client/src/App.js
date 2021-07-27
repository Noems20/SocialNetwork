import './App.css';
import { Redirect, Route, Switch } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import PropTypes from 'prop-types';

// Redux

import store from './redux/store';
import { SET_AUTHENTICATED } from './redux/types';
import { logoutUser, getUserData } from './redux/actions/userActions';
import { connect } from 'react-redux';

// MUI
import ThemeProvider from '@material-ui/styles/ThemeProvider';
import { createTheme } from '@material-ui/core';
import themeFile from './util/theme';

// Components
import Navbar from './components/Navbar';

//Pages
import Home from './pages/home';
import Login from './pages/login';
import Signup from './pages/signup';
import axios from 'axios';

const theme = createTheme(themeFile);

const token = localStorage.FBIdToken;
if (token) {
  const decodedToken = jwtDecode(token);
  if (decodedToken.exp * 1000 < Date.now()) {
    store.dispatch(logoutUser());
    window.location.href = '/login';
  } else {
    store.dispatch({ type: SET_AUTHENTICATED });
    axios.defaults.headers.common['Authorization'] = token;
    store.dispatch(getUserData());
  }
}

function App({ authenticated }) {
  return (
    <ThemeProvider theme={theme}>
      <Navbar />
      <div className='container'>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route
            exact
            path='/login'
            render={() => (authenticated ? <Redirect to='/' /> : <Login />)}
          />
          <Route
            exact
            path='/signup'
            render={() => (authenticated ? <Redirect to='/' /> : <Signup />)}
          />
        </Switch>
      </div>
    </ThemeProvider>
  );
}

App.propTypes = {
  authenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = ({ user }) => ({
  authenticated: user.authenticated,
});

export default connect(mapStateToProps)(App);
