import React from 'react';
import { useParams } from 'react-router-dom';
import useAxiosCommon from '../../../hooks/useAxiosCommon';
import { useQuery } from '@tanstack/react-query';
import LoadingSpinner from '../../Shared/LoadingSpinner';

const Details = () => {
  const { id } = useParams(); 
  const axiosCommon = useAxiosCommon();
  console.log('ID from URL:', id); 
  const { data: user = {}, isLoading, error } = useQuery({
    queryKey: ['users', id], 
    queryFn: async () => {
      const { data } = await axiosCommon.get(`/users/${id}`);
      return data;
    },
  
  });

  if (isLoading) return <LoadingSpinner />;
  if (error) return <p className="text-red-500">Failed to load user data</p>;
 console.log(user)
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-center mb-6">User Details</h1>
      <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <img
          src={user?.profileImage || 'https://via.placeholder.com/150'}
          alt={user?.fullName}
          className="w-32 h-32 rounded-full mx-auto mb-4"
        />
        <h2 className="text-center text-xl font-semibold mb-2">{user?.fullName}</h2>
        <p className="text-center text-gray-600 mb-4">{user?.email}</p>
        <ul className="space-y-3">
          <li><strong>Age:</strong> {user?.age || 'N/A'}</li>
          <li><strong>Available Days:</strong> {user?.availableDays?.join(', ') || 'N/A'}</li>
          <li><strong>Available Time:</strong> {user?.availableTime || 'N/A'}</li>
          <li><strong>Skills:</strong> {user?.skills?.join(', ') || 'N/A'}</li>
          <li><strong>Status:</strong> {user?.status || 'N/A'}</li>
          <li><strong>Other Info:</strong> {user?.otherInfo || 'N/A'}</li>
        </ul>
      </div>
    </div>
  );
};

export default Details;
