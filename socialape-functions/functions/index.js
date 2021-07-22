const functions = require('firebase-functions');

const app = require('express')();
// const express = require('express');
// const app = express();

const {
  getAllScreams,
  postOneScream,
  getScream,
  commentOnScream,
  likeScream,
  unlikeScream,
  deleteScream,
} = require('./handlers/screams');
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
// GET SCREAM INFO
app.get('/scream/:screamId', getScream);
//  DELETE SCREAM
app.delete('/scream/:screamId', FBAuth, deleteScream);
//  LIKE SCREAM
app.get('/scream/:screamId/like', FBAuth, likeScream);
//  UNLIKE SCREAM
app.get('/scream/:screamId/unlike', FBAuth, unlikeScream);
// COMMENT SCREAM
app.post('/scream/:screamId/comment', FBAuth, commentOnScream);

// --------------------------------- USER ROUTES ---------------
//  CREATE USER
app.post('/signup', signUp);
//  LOGIN
app.post('/login', login);
// UPLOAD IMAGE
app.post('/user/image', FBAuth, uploadImage);
// ADD USER DETAILS
app.post('/user', FBAuth, addUserDetails);
// GET USER DETAILS
app.get('/user', FBAuth, getAuthenticatedUser);

// https://baseurl.com/api/ -> ESTO ES LO QUE HACE
exports.api = functions.https.onRequest(app);
