import React, { useState } from 'react';
import PropTypes from 'prop-types';

// Components
import CustomButton from '../util/CustomButton';

// Redux
import { connect } from 'react-redux';
import { editUserDetails } from '../redux/actions/userActions';

// MUI
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

// Icons
import EditIcon from '@material-ui/icons/Edit';

const styles = (theme) => ({
  ...theme.spreadThis,
  button: {
    float: 'right',
  },
});

const EditDetails = ({ credentials, classes, editUserDetails }) => {
  const [userDetails, setUserDetails] = useState({
    bio: credentials.bio ? credentials.bio : '',
    website: credentials.website ? credentials.website : '',
    location: credentials.location ? credentials.location : '',
    open: false,
  });

  const handleOpen = () => {
    setUserDetails({
      ...userDetails,
      open: true,
    });
  };

  const handleClose = () => {
    setUserDetails({
      ...userDetails,
      open: false,
    });
  };

  const handleSubmit = () => {
    const userDetailsToEdit = {
      bio: userDetails.bio,
      website: userDetails.website,
      location: userDetails.location,
    };
    editUserDetails(userDetailsToEdit);
    handleClose();
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserDetails({ ...userDetails, [name]: value });
  };

  return (
    <>
      <CustomButton
        title='Edit details'
        placement='top'
        onClick={handleOpen}
        btnClassName={classes.button}
      >
        <EditIcon color='primary' />
      </CustomButton>
      <Dialog
        open={userDetails.open}
        onClose={handleClose}
        fullWidth
        maxWidth='sm'
      >
        <DialogTitle>Edit your details</DialogTitle>
        <DialogContent>
          <form>
            <TextField
              name='bio'
              type='text'
              label='Bio'
              multiline
              rows='3'
              placeholder='A short bio about yourself'
              className={classes.textField}
              value={userDetails.bio}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              name='website'
              type='text'
              label='Website'
              placeholder='Your personal/professional website'
              className={classes.textField}
              value={userDetails.website}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              name='location'
              type='text'
              label='Location'
              placeholder='A short location about yourself'
              className={classes.textField}
              value={userDetails.location}
              onChange={handleChange}
              fullWidth
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='primary'>
            Cancel
          </Button>
          <Button onClick={handleSubmit} color='primary'>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

EditDetails.propTypes = {
  editUserDetails: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  credentials: state.user.credentials,
});

export default connect(mapStateToProps, { editUserDetails })(
  withStyles(styles)(EditDetails)
);
