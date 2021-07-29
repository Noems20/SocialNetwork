import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

// Redux
import { connect } from 'react-redux';
import { submitComment } from '../../redux/actions/dataActions';

// MUI
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const styles = (theme) => ({
  ...theme.spreadThis,
});

const CommentForm = ({
  submitComment,
  UI: { errors, loading },
  authenticated,
  screamId,
  classes,
}) => {
  const [body, setBody] = useState('');
  const [uiErrors, setUiErrors] = useState({});

  useEffect(() => {
    if (errors) {
      setUiErrors(errors);
    }
    if (!errors && !loading) {
      setBody('');
      setUiErrors({});
    }
  }, [errors, loading]);

  const handleSubmit = (event) => {
    event.preventDefault();
    submitComment(screamId, { body: body });
  };

  const handleChange = (event) => {
    setBody(event.target.value);
  };

  const commentFormMarkup = authenticated ? (
    <Grid item sm={12} style={{ textAlign: 'center' }}>
      <form onSubmit={handleSubmit}>
        <TextField
          name='body'
          type='text'
          label='Comment on scream'
          error={uiErrors.comment ? true : false}
          helperText={uiErrors.comment}
          value={body}
          onChange={handleChange}
          fullWidth
          className={classes.textField}
        />
        <Button
          type='submit'
          variant='contained'
          color='primary'
          className={classes.button}
        >
          Submit
        </Button>
      </form>
      <hr className={classes.visibleSeparation} />
    </Grid>
  ) : null;

  return commentFormMarkup;
};

CommentForm.propTypes = {
  submitComment: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired,
  authenticated: PropTypes.bool.isRequired,
  classes: PropTypes.object.isRequired,
  screamId: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  UI: state.UI,
  authenticated: state.user.authenticated,
});

export default connect(mapStateToProps, { submitComment })(
  withStyles(styles)(CommentForm)
);
