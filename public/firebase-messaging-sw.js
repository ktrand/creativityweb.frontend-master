// importScripts("https://www.gstatic.com/firebasejs/8.1.2/firebase-analytics.js")
// importScripts("https://www.gstatic.com/firebasejs/8.1.2/firebase-app.js")

//   var firebaseConfig = {
//     apiKey: "AIzaSyA_Y-KsJjCzzJcB6qIOAXkRpXt8v6TJU3Y",
//     authDomain: "creativity-ee643.firebaseapp.com",
//     databaseURL: "https://creativity-ee643.firebaseio.com",
//     projectId: "creativity-ee643",
//     storageBucket: "creativity-ee643.appspot.com",
//     messagingSenderId: "603803984613",
//     appId: "1:603803984613:web:847f34a701b28a1dcaea0c",
//     measurementId: "G-K649YQH3X8"
//   };
//   // Initialize Firebase
//   firebase.initializeApp(firebaseConfig);
  
//   firebase.initializeApp(firebaseConfig);
//   const messaging = firebase.messaging();
  
//   messaging.setBackgroundMessageHandler(function(payload) {
//     const data = { ...payload.notification, ...payload.data };
//     const notificationTitle = data.title;
//     const notificationOptions = {
//       body: data.body,
//       icon: data.icon,
//       image: data.image,
//       requireInteraction: true,
//       click_action: data.click_action,
//       data
//     };
//     self.registration.showNotification(notificationTitle, notificationOptions);
//   });
  
//   self.addEventListener("notificationclick", function(event) {
//     const target = event.notification.data.click_action;
//     event.notification.close();
//     event.waitUntil(
//       clients
//         .matchAll({
//           type: "window",
//           includeUncontrolled: true
//         })
//         .then(function(clientList) {
//           for (var i = 0; i < clientList.length; i++) {
//             var client = clientList[i];
//             console.log(client.url, client.focus);
//             if (client.url === target && "focus" in client) {
//               return client.focus();
//             }
//           }
//           return clients.openWindow(target);
//         })
//     );
//   });

/*
Give the service worker access to Firebase Messaging.
Note that you can only use Firebase Messaging here, other Firebase libraries are not available in the service worker.
*/
importScripts('https://www.gstatic.com/firebasejs/7.23.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.23.0/firebase-messaging.js');
   
/*
Initialize the Firebase app in the service worker by passing in the messagingSenderId.
* New configuration for app@pulseservice.com
*/
firebase.initializeApp({
    apiKey: "AIzaSyA_Y-KsJjCzzJcB6qIOAXkRpXt8v6TJU3Y",
    authDomain: "creativity-ee643.firebaseapp.com",
    databaseURL: "https://creativity-ee643.firebaseio.com",
    projectId: "creativity-ee643",
    storageBucket: "creativity-ee643.appspot.com",
    messagingSenderId: "603803984613",
    appId: "1:603803984613:web:847f34a701b28a1dcaea0c",
    measurementId: "G-K649YQH3X8"
    });
  
/*
Retrieve an instance of Firebase Messaging so that it can handle background messages.
*/
const messaging = firebase.messaging();
messaging.setBackgroundMessageHandler(function(payload) {
    console.log(
        "[firebase-messaging-sw.js] Received background message ",
        payload,
    );
    /* Customize notification here */
    const notificationTitle = "Background Message Title";
    const notificationOptions = {
        body: "Background Message body.",
        icon: "/itwonders-web-logo.png",
    };
  
    return self.registration.showNotification(
        notificationTitle,
        notificationOptions,
    );
});