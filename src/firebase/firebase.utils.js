import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyBBBtv1YPxGQlYOA1vmXxJJi_mhbWp_XPQ",
    authDomain: "crwn-db-d6ec1.firebaseapp.com",
    databaseURL: "https://crwn-db-d6ec1.firebaseio.com",
    projectId: "crwn-db-d6ec1",
    storageBucket: "crwn-db-d6ec1.appspot.com",
    messagingSenderId: "41916540436",
    appId: "1:41916540436:web:97c6e45b6818f07a84e901",
    measurementId: "G-S763GG3HP7"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return; // no user

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();
    
    if (!snapShot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();
        
        try {
        await userRef.set({
            displayName,
            email,
            createdAt,
            ...additionalData 
        });
        } catch (error) {
            console.log('error creating user', error.message);
        }
    }

    return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;