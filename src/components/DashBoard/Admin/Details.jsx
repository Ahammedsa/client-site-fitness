import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import useAxiosCommon from '../../../hooks/useAxiosCommon';
import { useMutation, useQuery } from '@tanstack/react-query';
import LoadingSpinner from '../../Shared/LoadingSpinner';
import UpdateUserModal from '../../Modal/UpdateUserModal';
import toast from 'react-hot-toast';

const Details = () => {
  const { id } = useParams();
  const axiosCommon = useAxiosCommon();
  const [isOpen, setIsOpen] = useState(false);

  console.log('ID from URL:', id);
  const { data: user = {}, isLoading, error, refetch } = useQuery({
    queryKey: ['users', id],
    queryFn: async () => {
      const { data } = await axiosCommon.get(`/users/${id}`);
      return data;
    },
  });

  const mutation = useMutation({
    mutationFn: async (updatedUser) => {
      const { data } = await axiosCommon.put(`/random`, updatedUser); 
      return data;
    },
    onSuccess: (data) => {
      refetch(); 
      toast.success("User role updated successfully");
      setIsOpen(false);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  
  const modalHandler = async (selectedRole) => {
    if (loggedInUser.email === user.emial) {
      toast.error("Action not allowed")
      return setIsOpen(false)
    }
    const updatedUser = {
      role: selectedRole,
      status: "Verified",

    };
    try {
      await mutation.mutateAsync(updatedUser);
    } catch (error) {
      console.error(error);
    }
  };
  const confirmTrainer = async () => {
    const updatedRole = { role: "trainer", status: "Verified", email: user?.email };

    
    try {
      await mutation.mutateAsync(updatedRole); // Perform the role update mutation
      toast.success("Now you are a trainer!");
    } catch (error) {
      console.error("Failed to confirm trainner:", error);
      toast.error("Failed to confirm trainer.");
    }
  };
  
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
        <div className='flex justify-between w-8/12 mx-auto'>
          <button className='btn btn-error text-white'>Reject</button>
          <button onClick={confirmTrainer} className='btn btn-success text-white'>
            Confirm
          </button>

          {/* <button onClick={() => (setIsOpen(true), handleConfirm(user?._id))}
            className='relative cursor-pointer inline-block px-3 py-1 font-semibold text-green-900 leading-tight'>
            <span
              aria-hidden='true'
              className='absolute inset-0 bg-green-200 opacity-50 rounded-full'
            ></span>
            <span className='relative'>Update Role</span>
          </button> */}
          {/* Modal */}
          <UpdateUserModal
            modalHandler={modalHandler}
            isOpen={isOpen}
            setIsopen={setIsOpen}
            user={user}
          />
        </div>
      </div>
    </div>
  );
};

export default Details;
