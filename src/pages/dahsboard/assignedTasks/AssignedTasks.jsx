import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const AssignedTasks = () => {
    const {user} = useAuth()
    const axiosSecure = useAxiosSecure()

    const { data: bookings = [], refetch} = useQuery({
    queryKey: ["bookings", user?.email, 'decorator-assigned'],
    queryFn: async () => {
      const res = await axiosSecure.get(`/bookings/decorator?decoratorEmail=${user?.email}&deliveryStatus=decorator-assigned`);
      return res.data;
    },
    
  });


    const handleDeliveryStatusUpdate = (booking,status) =>{
      const statusInfo = {
        deliveryStatus : status
       
      }
      const message = `Booking Status Is Updated With ${status.split('-,_').join(' ')}`
      axiosSecure.patch(`/bookings/${booking._id}/status`, statusInfo)
      .then(res =>{
        if(res.data.modifiedCount){
          refetch()
           Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: message,
                    showConfirmButton: false,
                    timer: 1500,
                  });
  
        }
      })
    
  }

  // const handleAccept = (booking) =>{
  //   update(booking,'on_the_way_to_venue')
  // }
  // const handleReject = (booking) =>{
  //   update(booking,'pending-pickup')
  // }
  
    return (
         <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">
        My Assigned Tasks
      </h1>

      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>#</th>
              <th>Service</th>
              <th>Customer</th>
              {/* <th>Status</th> */}
              <th>Action</th>
              <th>Other Actions</th>
            </tr>
          </thead>

          <tbody>
            {bookings.map((booking, index) => (
              <tr key={booking._id}>
                <td>{index + 1}</td>
                <td>{booking.serviceName}</td>
                <td>{booking.userEmail}</td>

                {/* STATUS BADGE */}
                {/* <td>
                  <span
                    className={`badge ${
                      booking.status === "accepted"
                        ? "badge-success"
                        : booking.status === "rejected"
                        ? "badge-error"
                        : "badge-warning"
                    }`}
                  >
                    {booking.status}
                  </span>
                </td> */}

                {/* ACTION BUTTONS */}
                <td className="space-x-2">
                 {booking.deliveryStatus==="decorator-assigned"? <>
                  <button
                    onClick={() => handleDeliveryStatusUpdate(booking,'on_the_way_to_venue')}
                    className="btn btn-xs btn-success"
                    // disabled={booking.status === "accepted"}
                  >
                    Accept
                  </button>

                  <button
                    onClick={() => handleDeliveryStatusUpdate(booking,'pending-pickup')}
                    className="btn btn-xs btn-error"
                    // disabled={booking.status === "rejected"}
                  >
                    Reject
                  </button>
                 </> : <span>accepted</span>}
                </td>
                <td>

                  <button 
                    onClick={() => handleDeliveryStatusUpdate(booking,'setup-in-progress')}
                    className="btn btn-xs btn-success mr-3.5"
                    // disabled={booking.status === "accepted"}
                  >
                   Progress

                  </button>
                  <button
                    onClick={() => handleDeliveryStatusUpdate(booking,'taskCompleted')}
                    className="btn btn-xs btn-success"
                    // disabled={booking.status === "accepted"}
                  >
                   Completed


                  </button>


                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    );
};

export default AssignedTasks;