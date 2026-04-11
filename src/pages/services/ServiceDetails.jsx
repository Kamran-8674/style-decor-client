import React from 'react';
import {  Link, useParams } from 'react-router';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
// import useAuth from '../../hooks/useAuth';

const ServiceDetails = () => {
     const { id } = useParams();
  // const navigate = useNavigate();
  const axiosSecure = useAxiosSecure()
  // const {user}=useAuth()

   const {data:service=[], isLoading}=useQuery({

        queryKey:['service',id],
        queryFn: async ()=>{
          const res = await axiosSecure.get(`/services/${id}`)
          console.log(res.data)
          return res.data

        }
    })

  //    const handleBookNow = () => {
  //   if (!user) {
  //     alert("Please login first!");
  //     navigate("/login");
  //     return;
  //   }

  //   navigate(`/booking/${id}`);
  // };

  
  if (isLoading) {
    return <div className="text-center mt-20">Loading...</div>;
  }
   

  

    return (
        <div className="max-w-5xl mx-auto p-6">
      
      {/* Image */}
      <div className="rounded-2xl overflow-hidden shadow-lg">
        <img
          src={service.image}
          alt={service.service_name}
          className="w-full h-100 object-cover"
        />
      </div>

      {/* Content */}
      <div className="mt-6 space-y-4">
        
        <h1 className="text-3xl font-bold">
          {service.service_name}
        </h1>

        <p className="text-gray-500 capitalize">
          Category: {service.category}
        </p>

        <p className="text-2xl font-semibold text-primary">
          ৳ {service.cost} / {service.unit}
        </p>

        <p className="text-gray-700 leading-relaxed">
          {service.description}
        </p>

        <Link
            to={`/booking/${service._id}`}
            className="btn btn-primary w-full"
          >
            View Details
          </Link>
      </div>
    </div>
    );
};

export default ServiceDetails;