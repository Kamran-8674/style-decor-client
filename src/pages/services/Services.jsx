import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import ServiceCard from './ServiceCard';

const Services = () => {
    const axiosSecure = useAxiosSecure()
      const [search, setSearch] = useState("");


    const {data:services=[], isLoading}=useQuery({
        queryKey:['services' , search],
        queryFn: async()=>{
          const res = await axiosSecure.get(`/services?search=${search}`)
          return res.data
         

        }
         
    })
    // console.log(services)
    return (
        <div className='bg-gray-100'>
             <div className="p-6 space-y-6 max-w-7xl mx-auto ">

      {/* 🎯 Title */}
      <h1 className="text-3xl font-bold text-center text-primary">
        All Services
      </h1>

      {/* 🔍 Search */}
      <div className="flex justify-center">
        <input
          type="text"
          placeholder="Search services..."
          className="input input-bordered w-full max-w-md"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      
      {isLoading && (
        <div className="text-center">
          <span className="loading loading-spinner"></span>
        </div>
      )}

      {/* 📊 Result */}
      <p className="text-center text-gray-500">
        Found {services.length} services
      </p>

      {/* 🧩 Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {services.map((service) => (
          <ServiceCard key={service._id} service={service} />
        ))}
      </div>

      {/* ❌ No result */}
      {!isLoading && services.length === 0 && (
        <p className="text-center text-gray-500">
          No services found
        </p>
      )}

    </div>

        </div>
        
       
    );
};

export default Services;