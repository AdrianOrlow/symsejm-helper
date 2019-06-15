import * as firebase from "firebase"
import { auth } from "./firebase"

// Provider

const facebookProvider = new firebase.auth.FacebookAuthProvider()

// Sign In

export const signInWithFacebook = () => auth.signInWithPopup(facebookProvider)

// Sign out
export const signOut = () => auth.signOut()
