importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js");

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
messaging.onBackgroundMessage(function (payload) {
  console.log("Received background message ", payload);

  /*const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: "/logo192.png",
  };*/

  /*return self.registration.showNotification(
    notificationTitle,
    notificationOptions
  );*/
});
