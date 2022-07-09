import React, { useContext, useEffect, useState } from 'react'
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { createContext } from "react";
import { auth } from '../firebase';

const authContext = createContext()

export const useAuth = () => {
    const context = useContext(authContext);
    if (!context) throw new Error("There is no Auth provider");
    return context;
}

export function AuthProvider({children}){
    const [user, setUser] = useState(null);
    const [adminError, setAdminError] = useState(null);

    const login = async (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    }

    const notAdmin = () => {
        setAdminError("You are not an Admin!");
    }

    const logout = () => signOut(auth);

    useEffect(() => {
        const unsubuscribe = onAuthStateChanged(auth, (currentUser) => {
          setUser(currentUser);
        });
        return () => unsubuscribe();
      }, []);

    return(
        <authContext.Provider value={{login, logout, user, notAdmin, adminError}}>
            {children}
        </authContext.Provider>
    )
}