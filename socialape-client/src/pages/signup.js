import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import AppIcon from '../images/icon.png';
import { useHistory } from 'react-router-dom';

// Redux
import { connect } from 'react-redux';
import { signupUser } from '../redux/actions/userActions';

//MUI STUFF
import withStyles from '@material-ui/core/styles/withStyles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const styles = (theme) => ({
  ...theme.spreadThis,
});

const Signup = ({ classes, signupUser, UI: { loading, errors }, user }) => {
  const [uiErrors, setUiErrors] = useState({});

  useEffect(() => {
    if (errors) {
      setUiErrors(errors);
    }
  }, [errors]);

  const [userCredentials, setUserCredentials] = useState({
    email: '',
    handle: '',
    password: '',
    confirmPassword: '',
  });

  let history = useHistory();

  const { email, handle, password, confirmPassword } = userCredentials;

  const handleSubmit = (event) => {
    event.preventDefault();
    const userData = {
      email: userCredentials.email,
      handle: userCredentials.handle,
      password: userCredentials.password,
      confirmPassword: userCredentials.confirmPassword,
    };

    signupUser(userData, history);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserCredentials({ ...userCredentials, [name]: value });
  };

  return (
    <Grid container className={classes.form}>
      <Grid item sm />
      <Grid item sm>
        <img src={AppIcon} alt='Logo' className={classes.image} />
        <Typography variant='h2' className={classes.pageTitle}>
          Signup
        </Typography>
        <form noValidate onSubmit={handleSubmit}>
          <TextField
            id='email'
            name='email'
            type='email'
            label='Email'
            className={classes.textField}
            helperText={uiErrors.email}
            error={uiErrors.email ? true : false}
            value={email}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            id='handle'
            name='handle'
            type='text'
            label='Handle'
            className={classes.textField}
            helperText={uiErrors.handle}
            error={uiErrors.handle ? true : false}
            value={handle}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            id='password'
            name='password'
            type='password'
            label='Password'
            className={classes.textField}
            helperText={uiErrors.password}
            error={uiErrors.password ? true : false}
            value={password}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            id='confirmPassword'
            name='confirmPassword'
            type='password'
            label='Confirm Password'
            className={classes.textField}
            helperText={uiErrors.confirmPassword}
            error={uiErrors.confirmPassword ? true : false}
            value={confirmPassword}
            onChange={handleChange}
            fullWidth
          />
          {uiErrors.general && (
            <Typography variant='body2' className={classes.customError}>
              {uiErrors.general}
            </Typography>
          )}
          <Button
            type='submit'
            variant='contained'
            color='primary'
            className={classes.button}
            disabled={loading}
          >
            Signup
            {loading && (
              <CircularProgress size={30} className={classes.progress} />
            )}
          </Button>
          <br />
          <small>
            Already have an account ? login <Link to='/login'>here</Link>
          </small>
        </form>
      </Grid>
      <Grid item sm />
    </Grid>
  );
};

Signup.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
  signupUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI,
});

// const mapActionsToProps = {
//   signupUser,
// };

export default connect(mapStateToProps, { signupUser })(
  withStyles(styles)(Signup)
);
