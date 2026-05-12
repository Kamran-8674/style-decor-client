import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer
} from "recharts";

const ServiceDemandChart = ({ stats }) => {
  return (
    <div className="bg-orange-300 p-6 rounded-xl shadow-md">

      <h2 className="text-2xl font-bold mb-6">
        Service Demand Chart
      </h2>

      <ResponsiveContainer width="100%" height={350}>

        <BarChart data={stats}>

          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="_id" />

          <YAxis />

          <Tooltip />

          <Bar dataKey="totalBookings" />

        </BarChart>

      </ResponsiveContainer>

    </div>
  );
};

export default ServiceDemandChart;