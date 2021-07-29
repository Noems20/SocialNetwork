import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

// Components
import Scream from '../components/scream/Scream';
import StaticProfile from '../components/profile/StaticProfile';

// Redux
import { connect } from 'react-redux';
import { getUserData } from '../redux/actions/dataActions';

// MUI

import Grid from '@material-ui/core/Grid';

const User = ({ match, getUserData, data: { screams, loading } }) => {
  const [profile, setProfile] = useState(null);

  const handle = match.params.handle;
  useEffect(() => {
    getUserData(handle);
    axios.get(`/user/${handle}`).then((res) => {
      setProfile(res.data.user);
    });
  }, [handle, getUserData]);

  const screamsMarkup = loading ? (
    <p>Loadin data...</p>
  ) : screams === null ? (
    <p>No screams for this user</p>
  ) : (
    screams.map((scream) => <Scream key={scream.screamId} scream={scream} />)
  );

  return (
    <Grid container spacing={2}>
      <Grid item sm={8} xs={12}>
        {screamsMarkup}
      </Grid>
      <Grid item sm={4} xs={12}>
        {profile == null ? (
          <p>Loading profile...</p>
        ) : (
          <StaticProfile profile={profile} />
        )}
      </Grid>
    </Grid>
  );
};

User.propTypes = {
  getUserData: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  data: state.data,
});

export default connect(mapStateToProps, { getUserData })(User);
