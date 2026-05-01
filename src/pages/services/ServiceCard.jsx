import { Link } from "react-router";

const ServiceCard = ({ service }) => {
  const { _id, service_name, cost, category, image } = service;

  return (
    <div className="card bg-base-100 shadow-md hover:shadow-xl transition duration-300 rounded-xl overflow-hidden">

      {/* Image */}
      <figure className="h-40 overflow-hidden">
        <img
          src={image}
          alt={service_name}
          className="w-full h-full object-cover hover:scale-110 transition duration-500"
        />
      </figure>

      {/* Content */}
      <div className="p-4 space-y-2">

        {/* Title */}
        <h2 className="text-sm font-semibold line-clamp-1">
          {service_name}
        </h2>

        {/* Category */}
        <p className="text-xs text-gray-400 capitalize">
          {category}
        </p>

        {/* Price + Button */}
        <div className="flex items-center justify-between mt-2">

          <span className="text-sm font-bold text-primary">
            ৳ {cost}
          </span>

          <Link
            to={`/service/${_id}`}
            className="text-xs px-3 py-1 bg-primary text-white rounded hover:bg-primary/80 transition"
          >
            Details
          </Link>

        </div>

      </div>
    </div>
  );
};

export default ServiceCard;