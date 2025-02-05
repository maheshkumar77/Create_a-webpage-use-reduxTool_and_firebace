import { auth } from "../FirebaceAuth/index";  // Ensure this path is correct
import { 
  createUserWithEmailAndPassword, 
  GoogleAuthProvider, 
  sendEmailVerification, 
  sendPasswordResetEmail, 
  signInWithEmailAndPassword, 
  signInWithPopup, 
  updatePassword 
} from "firebase/auth";

// Function to create a user with email and password
export const doCreateUserWithEmailAndPassword = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential;
  } catch (error) {
    throw new Error(error.message);  // Handle errors properly
  }
};

// Function to sign in with email and password
export const doSignInWithEmailAndPassword = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential;
  } catch (error) {
    throw new Error(error.message);  // Handle errors properly
  }
};

// Function to sign in using Google
export const doGoogleAuthProvider = async () => {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    return result;
  } catch (error) {
    throw new Error(error.message);  // Handle errors properly
  }
};

// Function to sign out the user
export const doSignout = async () => {
  try {
    await auth.signOut();
    return true;
  } catch (error) {
    throw new Error(error.message);  // Handle errors properly
  }
};

// Function to send a password reset email
export const doPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    return true;
  } catch (error) {
    throw new Error(error.message);  // Handle errors properly
  }
};

// Function to change user password
export const doPasswordChange = async (password) => {
  try {
    await updatePassword(auth.currentUser, password);
    return true;
  } catch (error) {
    throw new Error(error.message);  // Handle errors properly
  }
};

// Function to send email verification
export const doEmailVerify = async () => {
  try {
    await sendEmailVerification(auth.currentUser, {
      url: `${window.location.origin}/home`,  // Update the URL to your desired verification redirect
    });
    return true;
  } catch (error) {
    throw new Error(error.message);  // Handle errors properly
  }
};
