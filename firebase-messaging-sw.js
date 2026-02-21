importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey:"AIzaSyCmhzQqH60pyOD-qwCcm52nCXmT0n1Buy0",
  authDomain:"tech-b30b8.firebaseapp.com",
  databaseURL:"https://tech-b30b8-default-rtdb.asia-southeast1.firebasedatabase.app/",
  projectId:"tech-b30b8",
  storageBucket:"tech-b30b8.firebasestorage.app",
  messagingSenderId:"815434648437",
  appId:"1:815434648437:web:bd11c672f57fc24e1ba13c"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload){
  return self.registration.showNotification(
    payload.notification && payload.notification.title ? payload.notification.title : "🔔 CWC New Case!",
    {
      body: payload.notification && payload.notification.body ? payload.notification.body : "Naya case aaya hai!",
      icon: '/icon-192.png',
      badge: '/icon-192.png',
      requireInteraction: true,
      vibrate: [500, 200, 500],
      data: { url: 'https://cwc-field-tech.netlify.app' }
    }
  );
});

self.addEventListener('notificationclick', function(event){
  event.notification.close();
  event.waitUntil(
    clients.matchAll({type:'window', includeUncontrolled:true}).then(function(list){
      for(var i=0; i<list.length; i++){
        if(list[i].url.indexOf('cwc-field-tech') !== -1){
          return list[i].focus();
        }
      }
      return clients.openWindow('https://cwc-field-tech.netlify.app');
    })
  );
});
