import * as firebase from 'firebase';

export const config = {
  apiKey: 'AIzaSyDJdJDhXp1xRYdosjfbD2pHJvkriaLiBOY',
  authDomain: 'cats-capstone.firebaseapp.com',
  databaseURL: 'https://cats-capstone.firebaseio.com',
  projectId: 'cats-capstone',
  storageBucket: 'cats-capstone.appspot.com',
  messagingSenderId: '643399815494',
  appId: '1:643399815494:web:efc614ad6fb98574',
};

firebase.initializeApp(config);

export const database = firebase.database();
export const auth = firebase.auth();
