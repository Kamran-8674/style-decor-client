import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const TopDecorators = () => {
  const axiosSecure = useAxiosSecure();

  const { data: decorators = [], isLoading } = useQuery({
    queryKey: ["decorators"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/decorators`);
      return res.data;
    },
    
  });
  console.log(decorators)

  if (isLoading) {
    return (
      <div className="text-center">
        <span className="loading loading-spinner"></span>
      </div>
    );
  }

  return (
    <div className="p-10 bg-base-200">
      <h2 className="text-3xl font-bold text-center mb-8">
        Top Decorators
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        
        {decorators.slice(6, 10).map((d) => (
          <div
            key={d._id}
            className="card bg-base-100 shadow-md hover:shadow-xl transition p-4 text-center"
          >
            {/* Image */}
            <img
              src={d.photo}
              alt={d.name}
              className="w-20 h-20 mx-auto rounded-full object-cover mb-3"
            />

            {/* Name */}
            <h3 className="font-bold text-lg">{d.name}</h3>

            {/* Specialty */}
            <p className="text-sm text-gray-500">
              {d.specialty}
            </p>

            {/* Rating */}
            <p className="mt-2 text-yellow-500">
              ⭐ {d.rating || 4.5}
            </p>
          </div>
        ))}

      </div>
    </div>
  );
};

export default TopDecorators;