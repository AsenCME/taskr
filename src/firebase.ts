import firebase from "firebase";
import store from "./store";

var config = {
	apiKey: "AIzaSyDG0-C1Mx-A_H2aazyRchcm2K4fb3qWt2s",
	authDomain: "taskr-ab4af.firebaseapp.com",
	databaseURL: "https://taskr-ab4af.firebaseio.com",
	projectId: "taskr-ab4af",
	storageBucket: "taskr-ab4af.appspot.com",
	messagingSenderId: "809242556155",
};

let app = firebase.initializeApp(config);
let auth = app.auth();
let firestoreSettings = { timestampsInSnapshots: true };
let db = app.firestore();
db.settings(firestoreSettings);
let provider = new firebase.auth.GoogleAuthProvider();

firebase.auth().onAuthStateChanged(user => {
	if (user) {
		store.dispatch("login", user);
	} else {
		store.dispatch("logout");
	}
});

const getUserStatus = function() {
	return new Promise((resolve, reject) => {
		firebase.auth().onAuthStateChanged(user => {
			if (user) {
				store.dispatch("login", user);
				resolve(user.uid);
			} else {
				reject(Error("It broke"));
			}
		});
	});
};

const logout = function() {
	return new Promise((resolve, reject) => {
		auth
			.signOut()
			.then(() => resolve())
			.catch(() => reject());
	});
};

export { provider, auth, db, getUserStatus, logout };
