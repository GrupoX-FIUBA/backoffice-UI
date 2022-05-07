import {initializeApp} from 'firebase/app';
import {getAuth} from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyBO_n7_ux_MAQVI8XJoxcCm2gbbgdgQJY4",
    authDomain: "spotifiuby-bc6da.firebaseapp.com",
    projectId: "spotifiuby-bc6da",
    storageBucket: "spotifiuby-bc6da.appspot.com",
    messagingSenderId: "356153051584",
    appId: "1:356153051584:web:4a51ab76120fbef1e76025",
    measurementId: "G-5HNYWMGG4X"
  };

  export const app = initializeApp(firebaseConfig);
  export const auth = getAuth(app);