import firebase from 'react-native-firebase';

const db = firebase.firestore();

const postsRef = db.collection('posts');

async function firebaseLogin(number) {
  const response = await firebase.auth().signInWithPhoneNumber(number);

  return response;
}

async function firebaseLogout() {
  const response = await firebase
    .auth()
    .signOut()
    .catch(error => console.log('Firebase logout error:', error.code, error));

  return response;
}

export {firebaseLogin, firebaseLogout, postsRef};

export default db;
