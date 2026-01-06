import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';


const UserAuthRouter = () => {
    const token = localStorage.getItem('token');

    return token ? < Navigate to='/' /> : <Outlet />
}

export default UserAuthRouter