import * as firebase from "firebase/app"
import "firebase/auth"
import "firebase/firestore"

const config = {
  apiKey: "AIzaSyDaZFg-u5CHn7Y4Av-2yCbW4aRFWUPiJto",
  authDomain: "symsejm-ato.firebaseapp.com",
  databaseURL: "https://symsejm-ato.firebaseio.com",
  projectId: "symsejm-ato",
  storageBucket: "symsejm-ato.appspot.com",
  messagingSenderId: "933077790671",
  appId: "1:933077790671:web:6a7d26c531648666"
}

if (!firebase.apps.length) {
  firebase.initializeApp(config)
}

export const auth = firebase.auth()
export const db = firebase.firestore()
