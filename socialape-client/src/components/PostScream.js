import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

// Components
import CustomButton from '../util/CustomButton';

// Redux
import { connect } from 'react-redux';
import { postScream } from '../redux/actions/dataActions';

// MUI
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';

// Icons
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';

const styles = (theme) => ({
  ...theme.spreadThis,
  submitButton: {
    position: 'relative',
    float: 'right',
    marginTop: 10,
  },
  progressSpinner: {
    position: 'absolute',
  },
  closeButton: {
    position: 'absolute',
    left: '91%',
    top: '6%',
  },
});

const PostScream = ({ UI: { loading, errors }, postScream, classes }) => {
  const [body, setBody] = useState('');
  const [open, setOpen] = useState(false);
  const [uiErrors, setUiErrors] = useState({});

  useEffect(() => {
    if (errors) {
      setUiErrors(errors);
    }
    if (!errors && !loading) {
      setBody('');
      handleClose();
    }
  }, [errors, loading]);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setUiErrors({});
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    postScream({ body: body });
  };

  const handleChange = (event) => {
    const { value } = event.target;
    setBody(value);
  };

  return (
    <>
      <CustomButton onClick={handleOpen} tip='Post a Scream!'>
        <AddIcon color='secondary' />
      </CustomButton>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth='sm'>
        <CustomButton
          tip='Close'
          onClick={handleClose}
          btnClassName={classes.closeButton}
        >
          <CloseIcon />
        </CustomButton>
        <DialogTitle>Post a new scream</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <TextField
              name='body'
              type='text'
              label='POST!!'
              multiline
              rows='3'
              placeholder='Post at your fellow gamers'
              error={uiErrors.error ? true : false}
              helperText={uiErrors.error}
              className={classes.TextField}
              onChange={handleChange}
              fullWidth
            />
            <Button
              type='submit'
              variant='contained'
              color='primary'
              className={classes.submitButton}
              disabled={loading}
            >
              Submit
              {loading && (
                <CircularProgress
                  size={30}
                  className={classes.progressSpinner}
                />
              )}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

PostScream.propTypes = {
  postScream: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  UI: state.UI,
});

export default connect(mapStateToProps, { postScream })(
  withStyles(styles)(PostScream)
);
