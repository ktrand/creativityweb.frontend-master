import Vue from "vue";
import LoadScript from "vue-plugin-load-script";

Vue.use(LoadScript);

var firebaseConfig = {
    apiKey: "AIzaSyA_Y-KsJjCzzJcB6qIOAXkRpXt8v6TJU3Y",
    authDomain: "creativity-ee643.firebaseapp.com",
    databaseURL: "https://creativity-ee643.firebaseio.com",
    projectId: "creativity-ee643",
    storageBucket: "creativity-ee643.appspot.com",
    messagingSenderId: "603803984613",
    appId: "1:603803984613:web:847f34a701b28a1dcaea0c",
    measurementId: "G-K649YQH3X8"
};

Promise.resolve()
  .then(() =>
    Vue.loadScript(
      "https://www.gstatic.com/firebasejs/8.1.2/firebase-app.js"
    )
  )
  .then(() =>
    Vue.loadScript(
      "https://www.gstatic.com/firebasejs/8.1.2/firebase-messaging.js"
    )
  )
  .then(() =>
    Vue.loadScript(
      "https://www.gstatic.com/firebasejs/8.1.2/firebase-analytics.js"
    )
  )
  .then(() => {
    window.firebase.initializeApp(firebaseConfig);
    const messaging = window.firebase.messaging();
    // работа с объектом messaging
  });