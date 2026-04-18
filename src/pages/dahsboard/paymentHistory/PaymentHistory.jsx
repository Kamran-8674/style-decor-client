import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const PaymentHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: payments = [], isLoading } = useQuery({
    queryKey: ["bookings", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments?email=${user?.email}`);
      return res.data;
    },
      // enabled: !loading && !!user?.email, // 🔥 BEST FIX

  });
  console.log(payments)

  // if(loading){
  //       return <div className="text-center mt-20">Loading...</div>;

  // }

  if (isLoading) {
    return <div className="text-center mt-20">Loading...</div>;
  }

  return (
    <div>
      <h1>My Payments :{payments.length}</h1>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Amount</th>
              <th>PaidAt</th>
              <th>Transaction Id</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {payments.map((payment,iddex)=> <tr key={iddex}>
              <th>{iddex + 1}</th>
              <td>{payment.bookingName}</td>
              <td>{payment.amount}</td>
              <td>{payment.paidAt}</td>
              <td>{payment.transactionId}</td>
            </tr>)}
            {/* row 2 */}
           
            
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentHistory;
