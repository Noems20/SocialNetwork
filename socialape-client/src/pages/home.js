import React, { useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';

// Redux
import { connect } from 'react-redux';
import { getScreams } from '../redux/actions/dataActions';

//Components
import Scream from '../components/scream/Scream';
import Profile from '../components/profile/Profile';

const Home = ({ getScreams, data: { screams, loading } }) => {
  useEffect(() => {
    getScreams();
  }, [getScreams]);

  let recentScreamMarkup = !loading ? (
    screams.map((scream) => <Scream key={scream.screamId} scream={scream} />)
  ) : (
    <p>Loading...</p>
  );

  return (
    <Grid container spacing={2}>
      <Grid item sm={8} xs={12}>
        {recentScreamMarkup}
      </Grid>
      <Grid item sm={4} xs={12}>
        <Profile />
      </Grid>
    </Grid>
  );
};

Home.propTypes = {
  data: PropTypes.object.isRequired,
  getScreams: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  data: state.data,
});

export default connect(mapStateToProps, { getScreams })(Home);
