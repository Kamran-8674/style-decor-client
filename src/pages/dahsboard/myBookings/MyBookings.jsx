import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import { FaTrash } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";
import Swal from "sweetalert2";
import { Link } from "react-router";

const MyBookings = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  //   const { data: myBookings, isLoading } = useQuery({
  //     queryKey: ["bookings", user?.email],
  //     queryFn: async () => {
  //       const res = await axiosSecure.get(`/bookings?email=${user.email}`);
  //       return res.data;
  //     },
  //   });

  const { data: myBookings = [], isLoading, refetch } = useQuery({
    queryKey: ["bookings", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/bookings?email=${user?.email}`);
      return res.data;
    },
    // enabled: !!user?.email, // 🔥 important
  });

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed)

        axiosSecure.delete(`/bookings/${id}`)
        .then(res =>{
            console.log(res)
            if(res.data.deletedCount){
                refetch()
                 Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });

            }
        })
       
    });
    console.log(id);
  };

   const handlePayment = async(booking) =>{
      const paymentInfo = {
        cost: booking.cost,
        bookingId:booking._id,
        userEmail:booking.userEmail,
        serviceName : booking.serviceName

      }
      const res = await axiosSecure.post('/create-checkout-session', paymentInfo)
      
      window.location.assign( res.data.url)
      console.log(res)
      
    }

  console.log(myBookings);

  if (isLoading) {
    return <div className="text-center mt-20">Loading...</div>;
  }


  return (
    <div className="py-20 container mx-auto ">
      <h2 className="text-2xl font-bold text-center mt-6 mb-6">My Bookings</h2>

      <div className="overflow-x-auto">
        <table className="table w-full border border-orange-300 rounded-lg shadow-sm">
          <thead className=" bg-primary text-white">
            <tr>
              <th></th>
              <th>Service Name</th>
              <th>cost</th>
              <th>CreatedAt</th>
              <th>payment </th>
              <th>Deloivery status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {myBookings.map((booking, index) => (
              <tr key={booking._id} className="hover:bg-orange-200">
                <td>{index + 1}</td>
                <td className="font-medium">{booking.serviceName}</td>
                <td>{booking.cost}</td>
                <td>{booking.createdAt}</td>
                <td>
                  {
                    booking.paymentStatus === 'paid' ? 
                    <span className="text-green-400">Paid</span>:
                    
                    <button onClick={()=>handlePayment(booking)} className="btn btn-primary text-black btn-sm">Pay</button>
                   
                  
                  }


                </td>
                <td>{booking.deliveryStatus}</td>
                <td className="flex items-center gap-3">
                  <button
                    onClick={() => handleDelete(booking._id)}
                    className="btn btn-xs bg-orange-500 text-white hover:bg-orange-600"
                  >
                    <FaTrash />
                  </button>
                  {/* <Link to={`/update/${booking._id}`}>
                    {" "}
                    <button className="btn btn-xs bg-orange-500 text-white hover:bg-orange-600">
                      <CiEdit />
                    </button>
                  </Link> */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* {myBookings.length === 0 && (
          <p className="text-center text-gray-500 mt-6">
            You haven’t added any bookings yet.
          </p>
        )} */}
      </div>
    </div>
  );
};

export default MyBookings;
