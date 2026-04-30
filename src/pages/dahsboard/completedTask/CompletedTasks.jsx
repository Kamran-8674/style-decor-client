import React from 'react';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const CompletedTasks = () => {
     const {user} = useAuth()
    const axiosSecure = useAxiosSecure()

    const { data: bookings = []} = useQuery({
    queryKey: ["bookings", user?.email, 'decorator-assigned'],
    queryFn: async () => {
      const res = await axiosSecure.get(`/bookings/decorator?decoratorEmail=${user?.email}&deliveryStatus=taskCompleted`);
      return res.data;
    },

    
    
  });
  const calculatePayout = (booking) =>{
    return booking.cost * 0.6

  }


    return (
        <div>
           <h1>compolede{bookings.length}</h1> 
        <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>cost</th>
              <th>Payout</th>
              <th>Created At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {bookings.map((booking, index) => (
              <tr key={booking._id}>
                <td>{index + 1}</td>
                <td className="font-medium">{booking.serviceName}</td>
                <td>{booking.cost}</td>
                <td>{calculatePayout(booking)}</td>
                <td>{booking.createdAt}</td>
                <td>
                  <button
                    className="btn btn-primary text-black"
                  >
                    Cash Out
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

export default CompletedTasks;