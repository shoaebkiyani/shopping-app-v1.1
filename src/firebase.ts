// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: import.meta.env.VITE_API_FIREBASE_API_KEY,
	authDomain: 'techzoneapp-8363f.firebaseapp.com',
	projectId: 'techzoneapp-8363f',
	storageBucket: 'techzoneapp-8363f.appspot.com',
	messagingSenderId: '580144049323',
	appId: '1:580144049323:web:b746b61b5b6a723e4a1bee',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
