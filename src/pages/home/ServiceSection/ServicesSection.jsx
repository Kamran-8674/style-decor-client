import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import ServiceCard from "../../services/ServiceCard";

const ServicesSection = () => {
    const axiosSecure = useAxiosSecure()

  const { data: services = [] } = useQuery({
    queryKey: ["services"],
    queryFn: async () => {
      const res = await axiosSecure.get('/services') ;
      return res.data;
    },
  });

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-center">
        Our Services
      </h2>

      <div className="grid md:grid-cols-3 gap-4">
        {services.slice(0, 6).map(service => (
          <ServiceCard key={service._id} service={service} />
        ))}
      </div>
    </div>
  );
};

export default ServicesSection;