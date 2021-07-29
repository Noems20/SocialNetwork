import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import CustomButton from '../../util/CustomButton';

//Redux
import { connect } from 'react-redux';

// Components
import PostScream from '../scream/PostScream';

// Material UI
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

// Icons
import HomeIcon from '@material-ui/icons/Home';
import Notifications from '@material-ui/icons/Notifications';

const Navbar = ({ authenticated }) => {
  return (
    <AppBar>
      <Toolbar className='nav-container'>
        {authenticated ? (
          <>
            <PostScream />
            <Link to='/'>
              <CustomButton tip='Home'>
                <HomeIcon color='secondary' />
              </CustomButton>
            </Link>
            <CustomButton tip='Notifications'>
              <Notifications color='secondary' />
            </CustomButton>
          </>
        ) : (
          <>
            <Button color='inherit' component={Link} to='/'>
              Home
            </Button>
            <Button color='inherit' component={Link} to='/login'>
              Login
            </Button>
            <Button color='inherit' component={Link} to='/signup'>
              Signup
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

Navbar.propTypes = {
  authenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = ({ user }) => ({
  authenticated: user.authenticated,
});

export default connect(mapStateToProps)(Navbar);
