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
     <div className="p-6">

    {/* Header */}
    <h1 className="text-2xl font-bold mb-4">
      My Payments ({payments.length})
    </h1>

    {/* Table Container */}
    <div className="bg-gray-100 shadow-md rounded-xl p-4">

      <div className="overflow-x-auto">
        <table className="table table-zebra">

          {/* Head */}
          <thead className="bg-primary text-white text-sm">
            <tr>
              <th>#</th>
              <th>Service</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Transaction ID</th>
            </tr>
          </thead>

          {/* Body */}
          <tbody>
            {payments.map((payment, index) => (
              <tr key={index} className="hover">

                <th>{index + 1}</th>

                <td className="font-medium">
                  {payment.bookingName}
                </td>

                <td className="text-primary font-semibold">
                  ৳ {payment.amount}
                </td>

                <td className="text-sm text-gray-500">
                  {payment.paidAt}
                </td>

                <td className="text-xs break-all">
                  {payment.transactionId}
                </td>

              </tr>
            ))}
          </tbody>

        </table>
      </div>

    </div>
  </div>
  );
};

export default PaymentHistory;
