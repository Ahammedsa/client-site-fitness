import React from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Container from "../Shared/Container";
import useAxiosCommon from '../../hooks/useAxiosCommon';
import { useQuery } from '@tanstack/react-query';
import LoadingSpinner from '../Shared/LoadingSpinner';


const TrainnerBook = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams()
  console.log(id   )
  const { slot, trainer } = location.state || {}; // Destructure slot and trainerName from state
  console.log(trainer)
  const axiosCommon = useAxiosCommon()
  const { data: trainner = {}, isLoading } = useQuery({
    // 35 number id is a dependecy id  if  it will late or change id you call full 
    queryKey: ['trainner', id],
    queryFn: async () => {
      const { data } = await axiosCommon.get(`/trainnerDetails/${id}`)
      return data
    }
  })
  if (isLoading) return < LoadingSpinner
  />
  console.log(trainner)
  const joinNowHandler = (price, plan ,slot) => {
    // Save price and plan in localStorage
    localStorage.setItem('selectedPrice', price);
    localStorage.setItem('selectedPlan', plan);
    localStorage.setItem('selectedSlot', slot);
   
    navigate(`/payment/${id}`);
  };
  return (
    <div className="bg-gray-100 h-5/6 py-10">
      <Container>
        <h1 className="text-3xl font-bold text-center mb-10 w-9/12 mx-auto">Trainer Booked Page</h1>
        <div className="grid grid-cols-7 gap-5">
          <div className="col-span-2  bg-base-100 shadow-xl flex flex-col justify-between">
            <div className="p-5">
              <h2 className=" text-2xl font-bold">Name: {trainer?.trainner?.name}</h2>
              <h3 className="text-xl">Class: {trainer?.category}</h3>
              <p className="text-lg">Selected slot: <br />
                {slot}</p>
            </div>
            <figure className="px-6">
              <img
                src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                alt="Trainer"
                className="rounded-xl"
              />
            </figure>
         <div></div>
          </div>

          {/* Membership Plans Section - 65% of the viewport */}
          <div className="col-span-5  bg-slate-100 shadow-xl">
            <div className="">
              <header className="text-center mb-10">
                <h1 className="text-3xl font-bold">Choose Your Membership Plan</h1>
                <p className="text-gray-600">Select the best plan that suits your needs.</p>
              </header>

              <div className="grid grid-cols-1 md:grid-cols-3 border">
                {/* Basic Membership */}
                <div className=" bg-slate-200 shadow-md border border-2 border-slate-400">
                  <div className="p-5">
                    <h2 className="text-lg font-bold">Basic Membership</h2>
                    <p className="text-xl font-semibold">$10</p>
                    <ul className="list-disc list-inside mt-4 mb-6 border">
                      <li>Access to gym facilities during regular operating hours.</li>
                      <li>Use of cardio and strength training equipment.</li>
                      <li>Access to locker rooms and showers.</li>
                    </ul>
                    <div className="p-11">
                      <button  onClick={() => joinNowHandler(10 ,"Basic" , slot)} className="btn btn-success w-full text-white">Join now</button>
                    </div>
                  </div>
                </div>

                {/* Standard Membership */}
                <div className=" bg-slate-200 shadow-md border border-2 border-slate-400">
                  <div className="p-5">
                    <h2 className="text-lg font-bold">Standard Membership</h2>
                    <p className="text-xl font-semibold">$50</p>
                    <ul className="list-disc list-inside mt-4 mb-6">
                      <li>All benefits of the Basic Membership.</li>
                      <li>Access to group fitness classes such as yoga, spinning, and Zumba.</li>
                      <li>Use of additional amenities like a sauna or steam room.</li>
                    </ul>
                    <div className="p-10">
                      <button onClick={() => joinNowHandler(50 ,"Standard" , slot)} className="btn btn-success w-full text-white">Join now</button>
                    </div>
                  </div>
                </div>

                {/* Premium Membership */}
                <div className=" bg-slate-200 shadow-md border border-2 border-slate-400">
                  <div className="p-5">
                    <h2 className=" text-lg font-bold">Premium Membership</h2>
                    <p className="text-xl font-semibold">$100</p>
                    <ul className="list-disc list-inside mt-4 mb-6">
                      <li>All benefits of the Standard Membership.</li>
                      <li>Access to personal training sessions with certified trainers.</li>
                      <li>Discounts on additional services such as massage therapy or nutrition counseling.</li>
                    </ul>
                    <div className="p-6">
                      <button onClick={() => joinNowHandler(100 ,"Premimum" , slot)}  className="btn btn-success w-full text-white">Join now</button>
                    </div>
                  </div>
                </div>
              </div>


            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default TrainnerBook;

