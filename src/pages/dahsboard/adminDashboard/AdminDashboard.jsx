import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import ServiceDemandChart from './ServiceDemandChart';

const AdminDashboard = () => {
    const axiosSecure = useAxiosSecure()

    
    const { data: stats = [] } = useQuery({
  queryKey: ['service-stats'],
  queryFn: async () => {
    const res = await axiosSecure.get('/service-stats');
    return res.data;
  }
});
console.log(stats)
    return (
        <div>
            <ServiceDemandChart stats={stats}></ServiceDemandChart>
            
        </div>
    );
};

export default AdminDashboard;