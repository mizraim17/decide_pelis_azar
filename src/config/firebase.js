// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyBqHrbWsrmOmIPZvHVpht2mw_aodi8JLLM",
	authDomain: "wepapp-angular.firebaseapp.com",
	databaseURL: "https://wepapp-angular-default-rtdb.firebaseio.com",
	projectId: "wepapp-angular",
	storageBucket: "wepapp-angular.appspot.com",
	messagingSenderId: "421302703415",
	appId: "1:421302703415:web:a4103be1fec7db09e376b2",
	measurementId: "G-YM75YJFC4Y",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
