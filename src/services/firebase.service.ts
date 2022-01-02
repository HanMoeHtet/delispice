import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../config/firebase.config';

export const app = initializeApp(firebaseConfig);
