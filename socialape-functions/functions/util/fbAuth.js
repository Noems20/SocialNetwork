const { admin, db } = require('./admin');

// ---------------------------- MIDDLEWARE TO CHECK IF USER IS LOGGED IN--------------------

module.exports = (req, res, next) => {
  let idToken;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer ')
  ) {
    idToken = req.headers.authorization.split('Bearer ')[1]; // split crea dos arreglos, cuando vea 'Bearer ' va a separarlo [Bearer ][token]
  } else {
    console.error('No token found');
    return res.status(403).json({ error: 'Unauthorized' });
  }

  admin
    .auth()
    .verifyIdToken(idToken)
    .then((decodedToken) => {
      req.user = decodedToken;
      console.log(decodedToken);
      return db
        .collection('users')
        .where('userId', '==', req.user.uid)
        .limit(1)
        .get();
    })
    .then((data) => {
      req.user.handle = data.docs[0].data().handle;
      // console.log(req.user);
      return next();
    })
    .catch((err) => {
      console.error('Error while verifying token', err);
      return res.status(403).json(err);
    });
};
