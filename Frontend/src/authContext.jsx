import React from 'react';
import { useEffect } from 'react';
import { useState, createContext, useContext } from 'react';

const AuthContext = createContext();

export const useAuth = () =>{
    return useContext(AuthContext);
}

export const AuthProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true)

    useEffect(()=>{
        const token = localStorage.getItem('token');

        if(token){
            setCurrentUser(token);
        }

        setLoading(false)
    }, []);

    const logout = () => {
        localStorage.removeItem("token")
        localStorage.removeItem("userId")
        setCurrentUser(null)
    }

    return <AuthContext.Provider 
                value={{
                    currentUser,
                    setCurrentUser,
                    loading,
                    logout,
                    isAuthenticated: !!currentUser,
                }}
            >
                {children}
            </AuthContext.Provider>
}