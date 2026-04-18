import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";

const BookingPage = () => {
  const axiosSecure = useAxiosSecure();
  const { id } = useParams();
  const {user}=useAuth()
  const navigate = useNavigate()

  const {  handleSubmit } = useForm();

  const { data: service, isLoading } = useQuery({
    queryKey: ["service", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/services/${id}`);
      console.log(service);
      return res.data;
    },
  });
  const handleBooking = async () => {
    const bookingData = {
      serviceId: id,
      serviceName: service.service_name,
      cost: service.cost,
      userEmail: user?.email,
      userName: user?.name,
      
    };

    try {
      const res = await axiosSecure.post(
        "/bookings",
        bookingData,
      );

      if (res.data.insertedId) {
        alert("✅ Booking successful!");
        navigate("/dashboard");
      }
    } catch (error) {
      console.error(error);
      alert("❌ Booking failed");
    }
  };

  if (isLoading) {
    return <div className="text-center mt-20">Loading...</div>;
  }

  return (
     <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">
        Book: {service?.service_name}
      </h1>
      <h1 className="text-2xl font-bold mb-4">
        Price: {service?.cost}
      </h1>

      <form onSubmit={handleSubmit(handleBooking)} className="space-y-4">
        
        <input
          type="text"
          defaultValue={user?.name}
          
          className="input input-bordered w-full"
        />

        <input
          type="email"
          defaultValue={user?.email}
          
          className="input input-bordered w-full"
        />

        {/* <input
          type="date"
          {...register("date", { required: true })}
          className="input input-bordered w-full"
        /> */}

        <button className="btn btn-primary w-full">
          Confirm Booking
        </button>

      </form>
    </div>
)};

export default BookingPage;
