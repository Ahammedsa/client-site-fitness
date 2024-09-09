import { useEffect, useState } from 'react';
import useAxiosCommon from '../../hooks/useAxiosCommon';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import LoadingSpinner from '../Shared/LoadingSpinner';

const PaymentPage = () => {
  const [price, setPrice] = useState(null);
  const [plan, setPlan] = useState(null);
  const [slot, setselectedSlot] = useState(null);
  const { id } = useParams();
  
  console.log('Trainer ID:', id); // Check if id is being logged correctly
  
  const axiosCommon = useAxiosCommon();

  useEffect(() => {
    const savedPrice = localStorage.getItem('selectedPrice');
    const savedPlan = localStorage.getItem('selectedPlan');
    const savedSlot = localStorage.getItem('selectedSlot'); 


    if (savedPrice && savedPlan && savedSlot) {
      setPrice(savedPrice);
      setPlan(savedPlan);
      setselectedSlot(savedSlot)
    }
  }, []);
 console.log(slot)
 
  const { data: trainner = {}, isLoading } = useQuery({
    queryKey: ['trainner', id],
    queryFn: async () => {
      if (!id) throw new Error('Invalid Trainer ID');
      const { data } = await axiosCommon.get(`/paymentPage/${id}`);
      return data;
    },
    enabled: !!id, // Only run the query if id exists
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!id) {
    return <p>Invalid trainer ID</p>; // Handle invalid ID case
  }

  return (
    <div className="payment-container">
      {price && plan ? (
        <div>
          <h2>Payment for {plan} Plan</h2>
          <p>Amount: ${price}</p>
          {/* Add your payment processing form or component here */}
        </div>
      ) : (
        <p>Loading payment details...</p>
      )}
    </div>
  );
};

export default PaymentPage;
