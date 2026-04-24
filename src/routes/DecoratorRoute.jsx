import React from 'react';
import useRole from '../hooks/useRole';
import useAuth from '../hooks/useAuth';

const DecoratorRoute = ({children}) => {
    const {loading,user}=useAuth()
    const {roleLoading,role}=useRole()

    if(loading || !user || roleLoading){
        return <div>loading</div>
    }
    if(role !== 'decorator'){
        return <div>you have no access</div>
    }
    return children;
};

export default DecoratorRoute;