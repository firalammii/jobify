import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: "AIzaSyAuhbn_Bk9zv9tlVgqnM19Sjri-FPx2om8",
  authDomain: "jobify-job-board-9e312.firebaseapp.com",
  projectId: "jobify-job-board-9e312",
  storageBucket: "jobify-job-board-9e312.appspot.com",
  messagingSenderId: "377411475663",
  appId: "1:377411475663:web:e70a516403ba5ae916ffba"
};

export const app = initializeApp(firebaseConfig);