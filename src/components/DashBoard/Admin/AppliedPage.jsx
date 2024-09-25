import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import LoadingSpinner from '../../Shared/LoadingSpinner';

const AppliedPage = () => {
  const axiosSecure = useAxiosSecure();

  // Fetch users with status "Requested"
  // const { data: appliedUsers = [], isLoading, refetch } = useQuery({
  //   queryKey: ['appliedUsers'],
  //   queryFn: async () => {
  //     const { data } = await axiosSecure.get('/applied-trainers');
  //     return data;
  //   },
  // });

  // if (isLoading) return <LoadingSpinner />;

  // Handle confirmation action
  // const handleConfirm = async (id) => {
  //   try {
  //     const result = await axiosSecure.patch(`/confirm-trainer/${id}`);
  //     if (result.status === 200) {
  //       Swal.fire('Success!', 'Trainer has been confirmed.', 'success');
  //       refetch(); // Refresh data after confirmation
  //     } else {
  //       Swal.fire('Error!', 'Failed to confirm trainer.', 'error');
  //     }
  //   } catch (err) {
  //     Swal.fire('Error!', 'There was an issue confirming the trainer.', 'error');
  //   }
  // };

  return (
    <div>
      <h2>Applied Trainers</h2>
      {/* {appliedUsers.length > 0 ? ( */}
        <table>
          <thead className=''>
            <tr className='flex justify-between gap-5 w-full'> 
              <th>Full Name</th>
              <th>Email</th>
              <th>Age</th>
              <th>Available Days</th>
              <th>Skills</th>
              <th>Actions</th>
            </tr>
          </thead>
          {/* <tbody>
            {appliedUsers.map((user) => (
              <tr key={user._id}>
                <td>{user.fullName}</td>
                <td>{user.email}</td>
                <td>{user.age}</td>
                <td>{user.availableDays.join(', ')}</td>
                <td>{user.skills.join(', ')}</td>
                <td>
                  <Link to={`/trainer-details/${user._id}`}>Details</Link>
                  <button onClick={() => handleConfirm(user._id)}>Confirm</button>
                </td>
              </tr>
            ))}
          </tbody> */}
        </table>
      {/* ) : (
        <p>No trainers have applied yet.</p>
      )} */}
    </div>
  );
};

export default AppliedPage;
