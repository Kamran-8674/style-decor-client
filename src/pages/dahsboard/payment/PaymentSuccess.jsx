import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const PaymentSuccess = () => {
    const [paymentInfo,setPaymentInfo]= useState({})
   const [searchParams] = useSearchParams()
   const axiosSecure = useAxiosSecure()
   const sessionId = searchParams.get('session_id')
   console.log(sessionId)

   useEffect(()=>{
    if(sessionId){
        axiosSecure.patch(`/payment-success?session_id=${sessionId}`)
        .then(res=>{
            console.log(res.data)
            setPaymentInfo({
                transactionId : res.data.transactionId,
                trackingId : res.data.trackingId
            })
        })


    }

   },[sessionId,axiosSecure])

    return (
        <div>
            payment is successful
            <h1>your tracking id : {paymentInfo.trackingId}</h1>
            <h1>your transactionId id : {paymentInfo.transactionId}</h1>
        </div>
    );
};

export default PaymentSuccess;