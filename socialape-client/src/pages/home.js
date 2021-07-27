import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';

//Components
import Scream from '../components/Scream';
import Profile from '../components/Profile';

const Home = () => {
  const [screams, setScreams] = useState(null);

  useEffect(() => {
    axios
      .get('/screams')
      .then((res) => {
        console.log(res.data);
        setScreams(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [setScreams]);

  let recentScreamMarkup = screams ? (
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

export default Home;
