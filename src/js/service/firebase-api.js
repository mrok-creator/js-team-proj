import { firebaseConfig } from './firebase-config';
import { getDatabase, ref, push, onValue, get } from 'firebase/database';
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  signOut,
} from 'firebase/auth';

import { authAccess, authDecline } from '../../index.js';

// init all needed firebase features
const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
const auth = getAuth();
const db = getDatabase();

// let userId = null;

// needed function

// !  use to signUp user
onAuthStateChanged(auth, user => {
  if (user) {
    authAccess(user); // todo function which work when authentication successfully ======= optional
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    // ...
  } else {
    authDecline(); // todo function which work when authentication declined  ======= optional
    // User is signed out
    // ...
  }
});

// ! used to signUp with google pop-up
function authWithPopup() {
  signInWithPopup(auth, provider)
    .then(result => {
      // userId = ;

      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      localStorage.setItem('userId', auth.currentUser.uid);
      // ...
    })
    .catch(error => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
}

// ! use to signOut from user account
function onClickSignOut() {
  signOut(auth)
    .then(() => {
      // Sign-out successful.
    })
    .catch(error => {
      // An error happened.
    });
}

// ! use to add object to firebase
function pushData(data, key) {
  const userId = localStorage.getItem('userId');

  push(ref(db, key + userId), data)
    .then(() => {
      console.log(`success`);

      // Data saved successfully!
    })
    .catch(error => {
      console.log(`Error`);
      // The write failed...
    });
}
// remove()
// function getFromFirebase(key) {
//   return get(ref(db, key + userId))
//     .then(snapshot => {
//       if (snapshot.exists()) {
//         return Object.values(snapshot.val());
//       } else {
//         console.log('No data available');
//       }
//     })
//     .catch(error => {
//       console.error(error);
//     });
// }

function getFromFirebase(key) {
  const userId = localStorage.getItem('userId');
  return get(ref(db, key + userId))
    .then(snapshot => {
      if (snapshot.exists()) {
        return Object.values(snapshot.val());
      } else {
        console.log('No data available');
      }
    })
    .catch(error => {
      console.error(error);
    });
}

// ! used to listen data when push to firebase ---- optional
// const starCountRef = ref(db, 'starred-film');
// onValue(starCountRef, snapshot => {
//   const data = snapshot.val();
//  console.log(data);
//   viewUpdate(Object.values(data));  //todo function used to do something with sended data ---optional
// updateStarCount(postElement, data);
// });

export { authWithPopup, onClickSignOut, pushData, getFromFirebase };
