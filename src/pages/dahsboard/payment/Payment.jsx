import React from 'react';
import { useParams } from 'react-router';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const Payment = () => {
     const { bookingId } = useParams();
  // const navigate = useNavigate();
  const axiosSecure = useAxiosSecure()
  // const {user}=useAuth()

   const {data:bookings=[], isLoading}=useQuery({

        queryKey:['bookings',bookingId],
        queryFn: async ()=>{
          const res = await axiosSecure.get(`/bookings/${bookingId}`)
          console.log(res.data)
          return res.data

        }
    })   

    const handlePayment = async() =>{
      const paymentInfo = {
        cost: bookings.cost,
        bookingId:bookings.serviceId,
        userEmail:bookings.userEmail,
        serviceName : bookings.serviceName

      }
      const res = await axiosSecure.post('/create-checkout-session', paymentInfo)
      
      window.location.href = res.data.url
      console.log(res)
      
    }

    if (isLoading) {
    return <div className="text-center mt-20">Loading...</div>;
  }

    return (
        <div>
          please pay  
          <h1>{bookings.serviceName}</h1>
          <button onClick={handlePayment} className="btn btn-primary">pay</button>
        </div>
    );
};

export default Payment;