import React, { useEffect } from 'react';
import {useNavigate, useRoutes} from 'react-router-dom';

// PAGES LIST
import Dashboard from "./components/dashboard/Dashboard";
import Profile from "./components/user/Profile";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";

import { useAuth } from './authContext';
import CreateRepo from './components/repo/CreateRepo';

const ProjectRoutes = () => {
    const {currentUser, setCurrentUser} = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const userIdFromStorage = localStorage.getItem("userId");

        if(userIdFromStorage && !currentUser){
            setCurrentUser(userIdFromStorage);
        }

        if(!userIdFromStorage && !["/login", "/signup"].includes(window.location.pathname)){
            navigate("/login");
        }

        if(userIdFromStorage && window.location.pathname == '/login'){
            navigate("/");
        }
    }, [currentUser, navigate, setCurrentUser]);

    const element = useRoutes([
        {
            path: "/",
            element: <Dashboard/>
        },
        {
            path: "/login",
            element: <Login/>
        },
        {
            path: "/signup",
            element: <Signup/>
        },
        {
            path: "/profile",
            element: <Profile/>
        },
        {
            path: "/create",
            element: <CreateRepo/>
        }
    ]);

    return element;
};

export default ProjectRoutes;