import React, { useEffect } from 'react';
import {Routes, useNavigate, useRoutes} from 'react-router-dom';

// PAGES LIST
import Dashboard from "./components/dashboard/Dashboard";
import Profile from "./components/user/Profile";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";

import { useAuth } from './authContext';
import CreateRepo from './components/repo/CreateRepo';
import RepoDetail from './components/repo/RepoDetail';
import CreateIssue from './components/issue/CreateIssue';
import RepoContent from './components/repo/RepoContent';
import CommitHistory from './components/commit/commitHistory';
import ProtectedRoute from './ProtectedRoute';
import StarRepos from './components/repo/starRepos';

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
            element: <ProtectedRoute><CreateRepo/></ProtectedRoute>
        },
        {
            path: "/repo/:id",
            element: <ProtectedRoute><RepoDetail /></ProtectedRoute>
        },
        {
            path: "/issue/create/:id",
            element: <CreateIssue />
        },
        {
            path: "/repo/content/:id",
            element: <ProtectedRoute><RepoContent/></ProtectedRoute>
        },
        {
            path:  "/commit/repository/:id",
            element: <CommitHistory/>
        },
        {
            path: "/profile/starred",
            element: <StarRepos/>
        }
    ]);

    return element;
};

export default ProjectRoutes;