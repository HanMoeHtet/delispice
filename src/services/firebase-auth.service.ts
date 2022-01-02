import { FirebaseError } from 'firebase/app';
import {
  getAuth as _getAuth,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword as _signInWithEmailAndPassword,
  signOut as _signOut,
  AuthError,
  UserCredential,
} from 'firebase/auth';
import { createNewUserData } from './firestore/user';

export const isAuthError = (error: Error): error is AuthError => {
  return (
    error instanceof FirebaseError &&
    error.customData !== undefined &&
    'appName' in error.customData
  );
};

const auth = _getAuth();

/**
 * @throws {AuthError}
 */
export const signUpWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  let response: UserCredential;

  response = await createUserWithEmailAndPassword(auth, email, password);

  // TODO: verify email
  // sendEmailVerification(response.user, { url: 'http://localhost:3000/' });

  await createNewUserData(response.user.uid);

  return response.user;
};

export const signInWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  const response = _signInWithEmailAndPassword(auth, email, password);

  return response;
};

export const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  const response = await signInWithPopup(auth, provider);
  return response;
};

export const getAuth = () => auth;

export const getCurrentUser = () => auth.currentUser;

export const signOut = () => {
  _signOut(auth);
};
