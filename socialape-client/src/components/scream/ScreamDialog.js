import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';

// Components
import CustomButton from '../../util/CustomButton';
import LikeButton from './LikeButton';
import Comments from './Comments';
import CommentForm from './CommentForm';

// Redux
import { connect } from 'react-redux';
import { getScream, clearErrors } from '../../redux/actions/dataActions';

// MUI
import withStyles from '@material-ui/core/styles/withStyles';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';

// Icons
import CloseIcon from '@material-ui/icons/Close';
import ChatIcon from '@material-ui/icons/Chat';
import UnfoldMore from '@material-ui/icons/UnfoldMore';

const styles = (theme) => ({
  ...theme.spreadThis,
  profileImage: {
    width: 200,
    height: 200,
    borderRadius: '50%',
    objectFit: 'cover',
  },
  dialogContent: {
    padding: 20,
  },
  closeButton: {
    position: 'absolute',
    left: '90%',
  },
  expandButton: {
    position: 'absolute',
    left: '90%',
  },
  spinnerDiv: {
    textAlign: 'center',
    marginTop: 50,
    marginBottom: 50,
  },
  noComments: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
  },
});

const ScreamDialog = ({
  scream: {
    screamId,
    body,
    createdAt,
    likeCount,
    commentCount,
    userImage,
    userHandle,
    comments,
  },
  UI: { loading },
  screamIdProp,
  userHandleProp,
  getScream,
  classes,
  clearErrors,
  openDialog,
}) => {
  const [open, setOpen] = useState(false);
  const [oldPath, setOldPath] = useState('');
  // const [newPath, setNewPath] = useState('');

  const handleOpen = useCallback(() => {
    let oldPath = window.location.pathname;
    const newPath = `/users/${userHandleProp}/scream/${screamIdProp}`;

    if (oldPath === newPath) oldPath = `/users/${userHandleProp}`;

    window.history.pushState(null, null, newPath);
    setOpen(true);
    setOldPath(oldPath);
    // setNewPath(newPath);
    getScream(screamIdProp);
  }, [getScream, screamIdProp, userHandleProp]);

  const handleClose = () => {
    window.history.pushState(null, null, oldPath);
    setOpen(false);
    clearErrors();
  };

  useEffect(() => {
    if (openDialog) {
      handleOpen();
    }
  }, [openDialog, getScream, screamIdProp, handleOpen]);

  const dialogMarkup = loading ? (
    <div className={classes.spinnerDiv}>
      <CircularProgress size={200} thickness={2} />
    </div>
  ) : (
    <Grid container spacing={2}>
      <Grid item sm={5}>
        <img src={userImage} alt='Profile' className={classes.profileImage} />
      </Grid>
      <Grid item sm={7}>
        <Typography
          component={Link}
          color='primary'
          variant='h5'
          to={`/users/${userHandle}`}
        >
          @{userHandle}
        </Typography>
        <hr className={classes.invisibleSeparator} />
        <Typography variant='body2' color='textSecondary'>
          {dayjs(createdAt).format('h:mm a, MMMM DD YYYY')}
        </Typography>
        <hr className={classes.invisibleSeparator} />
        <Typography variant='body1'>{body}</Typography>
        <LikeButton screamId={screamId} />
        <span>{likeCount} likes</span>
        <CustomButton tip='comments'>
          <ChatIcon color='primary' />
        </CustomButton>
        <span>{commentCount} Comments</span>
      </Grid>
      <hr className={classes.visibleSeparator} />
      <CommentForm screamId={screamId} />
      <Comments comments={comments} />
      {commentCount === 0 && (
        <div className={classes.noComments}>
          <Typography variant='body1'>Sin comentarios</Typography>
        </div>
      )}
    </Grid>
  );

  return (
    <>
      <CustomButton
        onClick={handleOpen}
        tip='Expand scream'
        tipClassName={classes.expandButton}
      >
        <UnfoldMore color='primary' />
      </CustomButton>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth='sm'>
        <CustomButton
          tip='Close'
          onClick={handleClose}
          tipClassName={classes.closeButton}
        >
          <CloseIcon />
        </CustomButton>
        <DialogContent className={classes.dialogContent}>
          {dialogMarkup}
        </DialogContent>
      </Dialog>
    </>
  );
};

ScreamDialog.propTypes = {
  clearErrors: PropTypes.func.isRequired,
  getScream: PropTypes.func.isRequired,
  screamIdProp: PropTypes.string.isRequired,
  scream: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
  openDialog: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  scream: state.data.scream,
  UI: state.UI,
});

const mapActionsToProps = {
  getScream,
  clearErrors,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(ScreamDialog));
