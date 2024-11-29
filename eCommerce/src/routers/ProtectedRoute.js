import React from 'react';
import UseAuth from '../custom-hooks/useAuth';
import { useNavigate } from 'react-router-dom';
const ProtectedRoute = ({children}) => {
    const navigate = useNavigate();
    const {currentUser} = UseAuth();
    return currentUser ? children : navigate("/login")
}

export default ProtectedRoute;
