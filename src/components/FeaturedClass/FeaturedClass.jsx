import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const FeaturedClass = () => {
  const axiosSecure = useAxiosSecure();

  // Fetch classes from the database
  const { data: classes = [], isLoading, error } = useQuery({
    queryKey: ['classes'],
    queryFn: async () => {
      const response = await axiosSecure('/class');
      return response.data;
    },
  });

  // Handle loading state
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <div className="loading loading-spinner loading-lg"></div>
          <p>Loading classes...</p>
        </div>
      </div>
    );
  }

  // Handle error state
  if (error) {
    return (
      <div className="text-center text-red-500">
        <p>Error loading classes: {error.message}</p>
      </div>
    );
  }

  return (
    <div className="container px-6 py-10 mx-auto grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
      {classes.map((item) => (
        <div key={item._id} className="container mx-auto py-6 px-4 ">
          <div className="bg-base-100 shadow-xl p-5">
            <figure className="w-full">
              <img
                src={item.image}
                alt={item.className}
                className="rounded-xl w-full"
              />
            </figure>
            <div className=" ">
              <h2 className=" text-2xl font-bold">{item.className}</h2>
              <p className="text-gray-600">{item.details}</p>
              <div className="mt-4">
                <h3 className="text-lg font-semibold">Additional Information</h3>
                <p className="text-gray-500">{item.additionalInfo}</p>
              </div>
              <div className=" mt-4 w-full">
                <button className="btn btn-success text-white w-full">Number of Booking : 25</button>
              
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FeaturedClass;
