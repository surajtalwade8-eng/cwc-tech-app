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

var messaging = firebase.messaging();

// Background notification
messaging.onBackgroundMessage(function(payload){
  return self.registration.showNotification(
    payload.notification?.title || "🔔 CWC New Case!",
    {
      body: payload.notification?.body || "Naya case aaya hai!",
      icon: 'icon-192.png',
      badge: 'icon-192.png',
      requireInteraction: true,
      vibrate: [500, 200, 500],
      data: {
        url: 'https://cwc-field-tech.netlify.app''
      }
    }
  );
});

// ✅ Notification tap karne pe app khulega!
self.addEventListener('notificationclick', function(event){
  event.notification.close();
  var appUrl = 'https://surajtalwade8-eng.github.io/technician-system/technician-app.html';
  event.waitUntil(
    clients.matchAll({type:'window', includeUncontrolled:true}).then(function(list){
      // Agar app already khuli hai to focus karo
      for(var i=0; i<list.length; i++){
        if(list[i].url.indexOf('technician-app') !== -1){
          return list[i].focus();
        }
      }
      // Nahi hai to naya tab kholo
      return clients.openWindow(appUrl);
    })
  );
});
