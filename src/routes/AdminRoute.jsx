import React from 'react';
import useRole from '../hooks/useRole';
import useAuth from '../hooks/useAuth';

const AdminRoute = ({children}) => {
    const {loading}=useAuth()
    const {roleLoading,role}=useRole()

    if(loading || roleLoading){
        return <div>loading</div>
    }
    if(role !== 'admin'){
        return <div>you have no access</div>
    }
    return children;
};

export default AdminRoute;