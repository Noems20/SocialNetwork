const functions = require('firebase-functions');

const app = require('express')();
// const express = require('express');
// const app = express();

const { getAllScreams, postOneScream } = require('./handlers/screams');
const {
  signUp,
  login,
  uploadImage,
  addUserDetails,
  getAuthenticatedUser,
} = require('./handlers/users');
const FBAuth = require('./util/fbAuth');

// --------------------------------- SCREAM ROUTES ---------------
//  GET ALL SCREAMS
app.get('/screams', getAllScreams);
//  POST SCREAM
app.post('/scream', FBAuth, postOneScream);
// ADD USER DETAILS
app.post('/user', FBAuth, addUserDetails);
// ADD USER DETAILS
app.get('/user', FBAuth, getAuthenticatedUser);

// --------------------------------- USER ROUTES ---------------
//  CREATE USER
app.post('/signup', signUp);
//  LOGIN
app.post('/login', login);
// UPLOAD IMAGE
app.post('/user/image', FBAuth, uploadImage);

// https://baseurl.com/api/ -> ESTO ES LO QUE HACE
exports.api = functions.https.onRequest(app);
