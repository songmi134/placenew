import firebase from "firebase";
import "firebase/auth";
import firebaseKey from "../config/firebaseKey.json";

firebaseKey.apiKey = process.env.REACT_APP_KEY;
let firebaseui = require("firebaseui");
firebase.initializeApp(firebaseKey);

export const auth = firebase.auth();

export const signInGoogle = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  return auth.signInWithPopup(provider);
};

export const signOut = () => {
  console.log("signOut");
  return auth.signOut();
};

// Initialize the FirebaseUI Widget using Firebase.
export let ui = new firebaseui.auth.AuthUI(firebase.auth());

export let uiConfig = {
  callbacks: {
    signInSuccessWithAuthResult: function (authResult, redirectUrl) {
      // User successfully signed in.
      // Return type determines whether we continue the redirect automatically
      // or whether we leave that to developer to handle.
      return true;
    },
    uiShown: function () {
      // The widget is rendered.
      // Hide the loader.
      document.getElementById("loader").style.display = "none";
    },
  },
  // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
  signInFlow: "popup",
  signInSuccessUrl: "/pages/login",
  signInOptions: [
    // Leave the lines as is for the providers you want to offer your users.
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
  ],
};
