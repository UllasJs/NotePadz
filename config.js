import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyBpv9n4TxmclZ1OwxU9uzjlLhhRmqkDGb8",
  authDomain: "notepadz-21de1.firebaseapp.com",
  projectId: "notepadz-21de1",
  storageBucket: "notepadz-21de1.appspot.com",
  messagingSenderId: "165141262330",
  appId: "1:165141262330:web:26a51d741435dfd54efe43",
  measurementId: "G-6H0YSF5QZ9",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export { firebase };
