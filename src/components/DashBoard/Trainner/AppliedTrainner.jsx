import React from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import LoadingSpinner from '../../Shared/LoadingSpinner';
import { useQuery } from '@tanstack/react-query';
import UserDataRow from '../TableRows/UserDataRow';

const AppliedTrainer = () => {
  const axiosSecure = useAxiosSecure();

  // Fetch users from the backend
  const { data: users = [], isLoading , refetch } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const { data } = await axiosSecure(`/users`); // Ensure it points to the correct backend route
      return data;
    },
  });

  // Filter users with status "Requested"
  const requestedUsers = users.filter(user => user.status === 'Requested');

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className='container mx-auto px-4 sm:px-8'>
      <h2>Applied Trainers</h2> 
      <div className='-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto'>
        <div className='inline-block min-w-full shadow rounded-lg overflow-hidden'>
        {requestedUsers.length > 0 ? (
        <table className='min-w-full leading-normal'>
          <thead>
          <tr>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                    >
                      Email
                    </th>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                    >
                      Role
                    </th>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                    >
                      Status
                    </th>

                    <th
                      scope='col'
                      className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                    >
                      Action
                    </th>
                  </tr>
          </thead>
          <tbody>
          {requestedUsers.map(user => ( <UserDataRow 
                  key={user?._id}
                  user={user}
                  refetch={refetch}
                  ></UserDataRow>))}
          </tbody>
        </table>
      ) : (
        <p>No trainers have applied yet.</p>
      )}
        </div>
      </div>
      
    </div>
  );
};

export default AppliedTrainer;
