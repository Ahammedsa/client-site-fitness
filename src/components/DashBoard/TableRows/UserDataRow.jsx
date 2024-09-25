/* eslint-disable react/prop-types */
import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import UpdateUserModal from "../../../components/Modal/UpdateUserModal";
import toast from 'react-hot-toast';


const UserDataRow = ({ user, refetch }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate hook
 console.log(user)
  // Function to handle redirection after fetching user details
  const modalHandler = async (email , user) => {
    console.log('User ID:', user?._id);
    if (user?._id) {
      navigate(`/dashboard/user-details/${user?._id}`);
    } else {
      console.error('User ID is missing');
      toast.error("User ID not found");
    }
  };

  return (
    <tr>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 whitespace-no-wrap'>{user?.email}</p>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 whitespace-no-wrap'>{user?.role}</p>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        {user?.status ? (
          <p
            className={`${user.status === 'Verified' ? 'text-green-500' : 'text-yellow-500'} whitespace-no-wrap`}
          >
            {user.status}
          </p>
        ) : (
          <p className='text-red-500 whitespace-no-wrap'>Unavailable</p>
        )}
      </td>

      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <Link
 
          onClick={() => modalHandler(user?.email , user)} // Trigger modalHandler on click
          className='relative cursor-pointer inline-block px-3 py-1 font-semibold text-green-900 leading-tight'
        >
          <span
            aria-hidden='true'
            className='absolute inset-0 bg-green-200 opacity-50 rounded-full'
          ></span>
          <span className='relative'>Details</span>
        </Link>
        {/* Modal */}
        <UpdateUserModal
          modalHandler={modalHandler}
          isOpen={isOpen}
          setIsopen={setIsOpen}
          user={user}
        />
      </td>
    </tr>
  );
};

export default UserDataRow;
