import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

// Redux
import { connect } from 'react-redux';
import { likeScream, unlikeScream } from '../../redux/actions/dataActions';

// Components
import CustomButton from '../../util/CustomButton';

//Icons
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';

const LikeButton = ({
  likeScream,
  unlikeScream,
  user: { likes, authenticated },
  screamId,
}) => {
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
    <Link to='/login'>
      <CustomButton tip='Like'>
        <FavoriteBorder color='primary' />
      </CustomButton>
    </Link>
  ) : likedScream() ? (
    <CustomButton tip='Undo like' onClick={unlike}>
      <FavoriteIcon color='primary' />
    </CustomButton>
  ) : (
    <CustomButton tip='Like' onClick={like}>
      <FavoriteBorder color='primary' />
    </CustomButton>
  );

  return likeButton;
};

LikeButton.propTypes = {
  user: PropTypes.object.isRequired,
  screamId: PropTypes.string.isRequired,
  likeScream: PropTypes.func.isRequired,
  unlikeScream: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapActionsToProps = {
  likeScream,
  unlikeScream,
};

export default connect(mapStateToProps, mapActionsToProps)(LikeButton);
