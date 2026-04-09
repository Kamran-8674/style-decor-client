import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import ServiceCard from './ServiceCard';

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
        <div >
            all services: {services.length}
           <div  className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
             {
                services.map(service =>(
                    <ServiceCard key={service._id} service={service}></ServiceCard>
                ))
            }
           </div>
        </div>
    );
};

export default Services;