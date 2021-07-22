const functions = require('firebase-functions');

const app = require('express')();
// const express = require('express');
// const app = express();

const FBAuth = require('./util/fbAuth');

const { db } = require('./util/admin');

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
  getUserDetails,
  markNotificationsRead,
} = require('./handlers/users');

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
// GET USER DETAILS (PUBLIC)
app.get('/user/:handle', getUserDetails);
// MARK NOTIFICATIONS READ
app.post('/notifications', FBAuth, markNotificationsRead);

// https://baseurl.com/api/ -> ESTO ES LO QUE HACE
exports.api = functions.https.onRequest(app);

// ----------------------------------------- NOTIFICATION ON LIKE --------------
exports.createNotificationOnLike = functions.firestore
  .document('likes/{id}')
  .onCreate((snapshot) => {
    // OBTENEMOS EL DOCUMENTO DE LIKE
    return db
      .doc(`/screams/${snapshot.data().screamId}`) // OBTENEMOS EL DOCUMENTO DEL SCREAM GRACIAS AL LIKE
      .get()
      .then((doc) => {
        if (
          doc.exists &&
          doc.data().userHandle !== snapshot.data().userHandle
        ) {
          return db.doc(`/notifications/${snapshot.id}`).set({
            createdAt: new Date().toISOString(),
            recipient: doc.data().userHandle,
            sender: snapshot.data().userHandle,
            screamId: doc.id, //snapshot.data().screamId -> Ya que es el documento de like tenemos tambien el ID
            type: 'like',
            read: false,
          });
        }
      })
      .catch((err) => console.error(err));
  });

// ----------------------------------------- DELETE LIKE NOTIFICATION WHEN UNLIKE --------------
exports.deleteNotificationOnUnlike = functions.firestore
  .document('likes/{id}')
  .onDelete((snapshot) => {
    return db
      .doc(`/notifications/${snapshot.id}`)
      .delete()
      .catch((err) => {
        console.error(err);
        return;
      });
  });

// ----------------------------------------- NOTIFICATION ON COMMENT --------------
exports.createNotificationOnComment = functions.firestore
  .document('comments/{id}')
  .onCreate((snapshot) => {
    // OBTENEMOS EL DOCUMENTO DEL COMMENT
    return db
      .doc(`/screams/${snapshot.data().screamId}`) // OBTENEMOS EL DOCUMENTO DEL SCREAM GRACIAS A TRAVES DEL COMMENT
      .get()
      .then((doc) => {
        if (
          doc.exists &&
          doc.data().userHandle !== snapshot.data().userHandle
        ) {
          return db.doc(`/notifications/${snapshot.id}`).set({
            createdAt: new Date().toISOString(),
            recipient: doc.data().userHandle,
            sender: snapshot.data().userHandle,
            screamId: doc.id, //snapshot.data().screamId -> Ya que es el documento de comment tenemos tambien el ID del post
            type: 'comment',
            read: false,
          });
        }
      })
      .catch((err) => console.error(err));
  });

// ----------------------------------------- CHANGE USER IMAGE ON POSTS WHEN USER CHANGES IMAGE --------------
exports.onUserImageChange = functions.firestore
  .document('/users/{userId}')
  .onUpdate((change) => {
    console.log(change.before.data());
    console.log(change.after.data());
    if (change.before.data().imageUrl !== change.after.data().imageUrl) {
      console.log('image has changed');
      const batch = db.batch();
      return db
        .collection('screams') //REFERENCIA DE COLECCION DE POSTS
        .where('userHandle', '==', change.before.data().handle)
        .get() //SNAPSHOTS DE POSTS
        .then((data) => {
          data.forEach((doc) => {
            const scream = db.doc(`/screams/${doc.id}`); //REFERENCIA DE POST
            batch.update(scream, { userImage: change.after.data().imageUrl });
          });
          return batch.commit();
        });
    } else return true;
  });

// ----------------------------------------- DELETE LIKES, NOTIFICATIONS, AND COMENTS WHEN POST DELETED --------------
exports.onScreamDelete = functions.firestore
  .document('/screams/{screamId}')
  .onDelete((snapshot, context) => {
    const screamId = context.params.screamId;
    const batch = db.batch();
    return db
      .collection('comments') //REFERENCIA DE COMENTARIOS
      .where('screamId', '==', screamId)
      .get() // OBTENEMOS LAS SNAPSHOTS DE LOS COMENTARIOS CON LA MISMA screamId
      .then((data) => {
        data.forEach((doc) => {
          // ELIMINAMOS LOS COMENTARIOS
          batch.delete(db.doc(`/comments/${doc.id}`));
        });
        return db.collection('likes').where('screamId', '==', screamId).get(); // OBTENEMOS LAS SNAPSHOTS DE LOS LIKES CON LA MISMA screamId
      })
      .then((data) => {
        data.forEach((doc) => {
          // ELIMINAMOS LOS LIKES
          batch.delete(db.doc(`/likes/${doc.id}`));
        });
        return db
          .collection('notifications')
          .where('screamId', '==', screamId)
          .get(); // OBTENEMOS LAS SNAPSHOTS DE LAS NOTIFICACIONES CON LA MISMA screamId
      })
      .then((data) => {
        data.forEach((doc) => {
          // ELIMINAMOS LAS NOTIFICACIONES
          batch.delete(db.doc(`/notifications/${doc.id}`));
        });
        return batch.commit();
      })
      .catch((err) => console.error(err));
  });
