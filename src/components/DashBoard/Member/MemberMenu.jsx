
import MenuItem from '../Sidebar/MenuItem'
import { BsFingerprint } from 'react-icons/bs'
import { GrUserAdmin } from 'react-icons/gr'
import useRole from '../../../hooks/useRole'
import TrainnerModal from '../../Modal/TrainnerModal'
import useAxiosSecure from '../../../hooks/useAxiosSecure'
import useAuth from '../../../hooks/useAuth'
import toast from 'react-hot-toast'
import { useState } from 'react'
const Member = () => {
  const [role] = useRole()
  const axiosSecure = useAxiosSecure()
  const { user } = useAuth()
  
  const [isModalOpen, setisModalOpen] = useState(false)
  const closeModal = () => {
    setisModalOpen(false)
  }
  const modalHandler = async () => {
    console.log("i want to be a host")
    try {
      const currentUser = {
        email: user?.email,
        role: user?.role,
        status: "requested"
      }
      const { data } = await axiosSecure.put(`/user`, currentUser)
      console.log(data)
      if (data.modifiedCount > 0) {
        toast.success("Success! Please wait for admin confirmation")
      } else {
        toast.success("please!!, Wait for admin approval")
      }
      return data
    } catch (err) {
      toast.error(err.message)
    } finally {
      closeModal()
    }

  }
  return (
    <>
      <MenuItem
        icon={BsFingerprint}
        label='My Bookings'
        address='my-bookings'
      />

      {role === 'guest' && (
        <button onClick={() => setisModalOpen(true)} className='flex items-center px-4 py-2 mt-5  transition-colors duration-300 transform text-gray-600  hover:bg-gray-300   hover:text-gray-700 cursor-pointer'>
          <GrUserAdmin className='w-5 h-5' />

          <span className='mx-4 font-medium'>Become A Host</span>
        </button>
      )}
      <TrainnerModal
        isOpen={isModalOpen}
        closeModal={closeModal}
        modalHandler={modalHandler}
      ></TrainnerModal>
    </>

  )
}

export default Member