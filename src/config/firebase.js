import {initializeApp} from 'firebase/app';
import {getFirestore} from 'firebase/firestore';

// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: 'AIzaSyA6JJM7UkenyDRyddtc95x5gZs2CPrwoy4',
  authDomain: 'restaurantapp-rn.firebaseapp.com',
  databaseURL:
    'https://restaurantapp-rn-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'restaurantapp-rn',
  storageBucket: 'restaurantapp-rn.appspot.com',
  messagingSenderId: '775572384755',
  appId: '1:775572384755:web:15bcb61bdfccaa203b4086',
};

// let app;

// if (!firebase.apps.length) {
//   app = firebase.initializeApp(firebaseConfig);
// } else {
//   app = firebase.app();
// }
// const app = initializeApp(firebaseConfig);

// const db = getFirestore();
// const auth = firebase.auth();

// export {db};
