/* eslint-disable react/prop-types */
import React, { createContext, useEffect, useState } from 'react';

import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import app from '../../firebase.config';
// import { Result } from 'postcss';

export const AuthContext = createContext(null)
const auth = getAuth(app)



const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)



    const google = (googelProvider) => {
        setLoading(true)
        return signInWithPopup(auth, googelProvider)

    }

    const github = (githubProvider) => {
        setLoading(true)
        return signInWithPopup(auth, githubProvider)

    }


    const createAccount = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)

    }

    const loginAccount = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    const logOut = () => {
        localStorage.removeItem('access-token')
        setLoading(true)
        return signOut(auth)
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
            setLoading(false)

            if (currentUser?.email) {
                const loggedUser = {
                    email: currentUser.email
                }
                fetch('http://localhost:5000/jwt', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(loggedUser)

                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data)
                        if (data?.token) {
                            localStorage.setItem('access-token', data.token)

                        }
                    }
                    )
            }


        })
        return () => { unsubscribe() }
    }, [])


    const userName = (name, img) => {

        return updateProfile(auth.currentUser, {
            displayName: name, photoURL: img
        })
            .then(() => setUser((user) => ({ ...user, displayName: name, photoURL: img })))
            .catch((error) => { console.log(error) });
    }



    const authInfo = {
        user,
        loginAccount,
        createAccount,
        logOut,
        userName,
        loading,
        google,
        github


    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}

        </AuthContext.Provider>
    );
};

export default AuthProvider;