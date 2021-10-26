import firebase from "firebase/compat/app";
import "firebase/compat/messaging";
// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCgomi1pTmGnurAsTxrts_o2S2CHEyAf6o",
  authDomain: "meetup-49e17.firebaseapp.com",
  projectId: "meetup-49e17",
  storageBucket: "meetup-49e17.appspot.com",
  messagingSenderId: "778598140469",
  appId: "1:778598140469:web:9cbf7d2c710130945d3f7c",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();
const { REACT_APP_VAPID_KEY } = process.env;
const publicKey = REACT_APP_VAPID_KEY;

export const getToken = async (/*setTokenFound: any*/) => {
  let currentToken = "";
  try {
    currentToken = await messaging.getToken({ vapidKey: publicKey });
    /*if (currentToken) {
      setTokenFound(true);
    } else {
      setTokenFound(false);
    }*/
  } catch (error) {
    console.log("An error occurred while retrieving token.", error);
  }
  return currentToken;
};

export const onMessageListener = () =>
  new Promise((resolve) => {
    messaging.onMessage((payload) => {
      resolve(payload);
    });
  });