var firebaseConfig = {
  apiKey: "AIzaSyBTEC0y3HG9oxN3iIWFSM6hKO9Ii4mMNZ0",
  authDomain: "todo-list-web-bc029.firebaseapp.com",
  projectId: "todo-list-web-bc029",
  storageBucket: "todo-list-web-bc029.firebasestorage.app",
  messagingSenderId: "828004103624",
  appId: "1:828004103624:web:8b45ec218648ed6063bcfd",
  measurementId: "G-JDYNV1SYY7"
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();
var db = firebase.firestore();