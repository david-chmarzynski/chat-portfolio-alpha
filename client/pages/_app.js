import { useEffect } from 'react';
import '../styles/globals.css'
import '../styles/sass/Chat.scss'
import { useAuthState } from 'react-firebase-hooks/auth'
import firebase from 'firebase/app'
import {auth, db} from '../firebase'

// IMPORT COMPONENTS
import Login from '../components/Login';
import Loader from '../components/Loader';

function MyApp({ Component, pageProps }) {
  const [user, loading, error] = useAuthState(auth);
  useEffect(() => {
    if(user) {
      console.log(user);
      db.collection("users").doc(user.uid).set({
        email: user.email,
        lastSeen: firebase.firestore.FieldValue.serverTimestamp(),
        photoURL: user.photoURL,
        isOnline: true
      }, { merge: true } )
    }
  }, [user]);

  if(loading) return <Loader />

  return <Component {...pageProps} user={user} />
}

export default MyApp
