import React, { useEffect, useState } from 'react';
import AuthContext from './AuthContext';

// Firebase imports
import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut
} from "firebase/auth";
import auth from '../Firebase/firebase.init';
import { GoogleAuthProvider } from "firebase/auth";

// Create Google sign-in provider instance
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
    // 🔐 Stores logged-in user
    const [user, setUser] = useState(null);

    // 🕐 Tracks loading state during auth operations
    const [loading, setLoading] = useState(true);

    // ✅ Register user with email + password
    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };

    // 🔑 Sign in existing user (email + password)
    const signInUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };

    // 🌐 Sign in with Google popup
    const signInWithGoogle = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    };

    // 🚪 Sign out current user
    const signOutUser = () => {
        setLoading(true);
        return signOut(auth);
    };

    // 👀 Auth state observer — runs on mount
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);       // set user data if signed in
            setLoading(false);          // done loading
            console.log('auth captured', currentUser);
        });

        // 🔄 Cleanup listener when component unmounts
        return () => unsubscribe();
    }, []);

    // 🧠 Combine everything into one object to share via Context
    const authInfo = {
        user,
        loading,
        createUser,
        signInUser,
        signOutUser,
        signInWithGoogle,
    };

    // 📤 Share authInfo with entire app
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
