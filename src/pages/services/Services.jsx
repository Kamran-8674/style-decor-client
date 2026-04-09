import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const Services = () => {
    const axiosSecure = useAxiosSecure()

    const {data:services=[]}=useQuery({
        queryKey:['services'],
        queryFn: async()=>{
          const res = await axiosSecure.get('/services')
          return res.data

        }
    })
    return (
        <div>
            all services: {services.length}
        </div>
    );
};

export default Services;