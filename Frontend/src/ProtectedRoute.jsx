import React from 'react'
import { useAuth } from './authContext';
import { useNavigate } from 'react-router-dom';


const ProtectedRoute = ({children}) => {
    const {isAuthenticated, loading} = useAuth()
    const navigate = useNavigate();

    if(loading){
        return <div>Loading...</div>
    }

    if(!isAuthenticated){
        return navigate('/auth')
    }

    return children
}

export default ProtectedRoute
