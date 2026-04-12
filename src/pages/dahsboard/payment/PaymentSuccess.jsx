import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router';

const PaymentSuccess = () => {
   const [searchParams] = useSearchParams()
   const sessionId = searchParams.get('session_id')
   console.log(sessionId)

   useEffect(()=>{
    if(sessionId){

    }

   },[sessionId])

    return (
        <div>
            payment is successful
        </div>
    );
};

export default PaymentSuccess;