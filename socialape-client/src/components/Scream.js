import React from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import PropTypes from 'prop-types';

// Components
import CustomButton from '../util/CustomButton';
import DeleteScream from './DeleteScream';

// Redux
import { connect } from 'react-redux';
import { likeScream, unlikeScream } from '../redux/actions/dataActions';

// MUI Stuff
import withStyles from '@material-ui/styles/withStyles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

// Icons
import ChatIcon from '@material-ui/icons/Chat';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';

const styles = {
  card: {
    position: 'relative',
    display: 'flex',
    marginBottom: 20,
  },
  image: {
    minWidth: 200,
  },
  content: {
    padding: 25,
    objectFit: 'cover',
  },
};

const Scream = ({
  scream: {
    body,
    createdAt,
    userImage,
    userHandle,
    screamId,
    likeCount,
    commentCount,
  },
  classes,
  user: {
    likes,
    authenticated,
    credentials: { handle },
  },
  likeScream,
  unlikeScream,
}) => {
  dayjs.extend(relativeTime);
  // const classes = this.props.classes;

  const likedScream = () => {
    if (likes && likes.find((like) => like.screamId === screamId)) {
      return true;
    } else {
      return false;
    }
  };

  const like = () => {
    likeScream(screamId);
  };

  const unlike = () => {
    unlikeScream(screamId);
  };

  const likeButton = !authenticated ? (
    <CustomButton tip='Like'>
      <Link to='/login'>
        <FavoriteBorder color='primary' />
      </Link>
    </CustomButton>
  ) : likedScream() ? (
    <CustomButton tip='Undo like' onClick={unlike}>
      <FavoriteIcon color='primary' />
    </CustomButton>
  ) : (
    <CustomButton tip='Like' onClick={like}>
      <FavoriteBorder color='primary' />
    </CustomButton>
  );

  const deleteButton =
    authenticated && userHandle === handle ? (
      <DeleteScream screamId={screamId} />
    ) : null;

  return (
    <Card className={classes.card}>
      <CardMedia
        image={userImage}
        title='ProfileImage'
        className={classes.image}
      />
      <CardContent className={classes.content}>
        <Typography
          variant='h5'
          component={Link}
          to={`/users/${userHandle}`}
          color='primary'
        >
          {userHandle}
        </Typography>
        {deleteButton}
        <Typography variant='body2' color='textSecondary'>
          {dayjs(createdAt).fromNow()}
        </Typography>
        <Typography variant='body1' color='textSecondary'>
          {body}
        </Typography>
        {likeButton}
        <span>{likeCount} likes</span>
        <CustomButton tip='comments'>
          <ChatIcon color='primary' />
        </CustomButton>
        <span>{commentCount} Comments</span>
      </CardContent>
    </Card>
  );
};

Scream.propTypes = {
  likeScream: PropTypes.func.isRequired,
  unlikeScream: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  scream: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapActionsToProps = {
  likeScream,
  unlikeScream,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(Scream));
