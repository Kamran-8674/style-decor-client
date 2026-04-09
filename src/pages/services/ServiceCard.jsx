import React from 'react';
import { Link } from 'react-router';

const ServiceCard = ({service}) => {
     const {
    _id,
    service_name,
    cost,
    category,
    image,
    description,
  } = service;
    return (
        <div className="card bg-base-100 shadow-lg hover:shadow-2xl transition duration-300 rounded-2xl overflow-hidden">
      
      {/* Image */}
      <figure className="h-52 overflow-hidden">
        <img
          src={image}
          alt={service_name}
          className="w-full h-full object-cover hover:scale-105 transition duration-500"
        />
      </figure>

      {/* Content */}
      <div className="card-body">
        
        {/* Title */}
        <h2 className="card-title text-lg font-bold">
          {service_name}
        </h2>

        {/* Category */}
        <p className="text-sm text-gray-500 capitalize">
          {category}
        </p>

        {/* Description (short) */}
        <p className="text-sm text-gray-600">
          {description}...
        </p>

        {/* Price */}
        <div className="flex justify-between items-center mt-2">
          <span className="text-xl font-semibold text-primary">
            ৳ {cost}
          </span>
        </div>

        {/* Button */}
        <div className="card-actions mt-4">
          <Link
            to={`/service/${_id}`}
            className="btn btn-primary w-full"
          >
            View Details
          </Link>
        </div>

      </div>
    </div>
    );
};

export default ServiceCard;