import { Link } from 'react-router-dom';
import Container from '../Container';
import logoImg from '../../../assets/the-fitness-logo.avif';
import MenuDropdown from './MenuDropdown';
import HostModal from '../../Modal/HostModal';
import { useState } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import avatarImg from '../../../assets/images/fitness-image-1.webp';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';
import toast from 'react-hot-toast';

const Navbar = () => {
  const axiosSecure = useAxiosSecure();
  const { user, logOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setisModalOpen] = useState(false);

  const closeModal = () => {
    setisModalOpen(false);
  };

  const modalHandler = async () => {
    console.log("I want to be a host");
    try {
      const currentUser = {
        email: user?.email,
        role: user?.role,
        status: "Requested",
      };
      const { data } = await axiosSecure.put(`/user`, currentUser);
      console.log(data);
      if (data.modifiedCount > 0) {
        toast.success("Success! Please wait for admin confirmation");
      } else {
        toast.success("Please!!, Wait for admin approval");
      }
      return data;
    } catch (err) {
      toast.error(err.message);
    } finally {
      closeModal();
    }
  };

  return (
    <div className='fixed w-full bg-white z-10 shadow-sm'>
      <div className='py-4 border-b-[1px]'>
        <Container>
          <div className='flex flex-row items-center justify-between gap-3 md:gap-0'>
            {/* Logo */}
            <Link to='/'>
              <img
                src={logoImg}
                alt='logo'
                width='100'
                height='100'
              />
            </Link>
            <div className='navbae-center flex'>
              <Link to='/all-trainer' className='btn btn-ghost text-sm'>
                All Trainer
              </Link>
              <a className='btn btn-ghost text-sm'>All Class</a>
              <a className='btn btn-ghost text-sm'>Community</a>
            </div>

            {/* Dropdown Menu */}
            <div className='relative'>
              <div className='flex flex-row items-center gap-3'>
                {/* Become A Host Button */}
                <div className='hidden md:block'>
                  <button
                    onClick={() => setisModalOpen(true)}
                    className='disabled:cursor-not-allowed cursor-pointer hover:bg-neutral-100 py-3 px-4 text-sm font-semibold rounded-full transition'
                  >
                    Host your home
                  </button>
                </div>

                {/* Modal */}
                <HostModal
                  isOpen={isModalOpen}
                  closeModal={closeModal}
                  modalHandler={modalHandler}
                />

                {/* Dropdown Button */}
                <div
                  onClick={() => setIsOpen(!isOpen)}
                  className='p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition'
                >
                  <AiOutlineMenu />
                  <div className='hidden md:block'>
                    {/* Avatar */}
                    <img
                      className='rounded-full'
                      referrerPolicy='no-referrer'
                      src={user && user.photoURL ? user.photoURL : avatarImg}
                      alt='profile'
                      height='30'
                      width='30'
                    />
                  </div>
                </div>
              </div>

              {isOpen && (
                <div className='absolute rounded-xl shadow-md w-[40vw] md:w-[10vw] bg-white overflow-hidden right-0 top-12 text-sm'>
                  <div className='flex flex-col cursor-pointer'>
                    <Link
                      to='/'
                      className='block md:hidden px-4 py-3 hover:bg-neutral-100 transition font-semibold'
                    >
                      Home
                    </Link>

                    {user ? (
                      <>
                        <Link
                          to='/dashboard'
                          className='block px-4 py-3 hover:bg-neutral-100 transition font-semibold'
                        >
                          Dashboard
                        </Link>
                        <div
                          onClick={logOut}
                          className='px-4 py-3 hover:bg-neutral-100 transition font-semibold cursor-pointer'
                        >
                          Logout
                        </div>
                      </>
                    ) : (
                      <>
                        <Link
                          to='/login'
                          className='px-4 py-3 hover:bg-neutral-100 transition font-semibold'
                        >
                          Login
                        </Link>
                        <Link
                          to='/signup'
                          className='px-4 py-3 hover:bg-neutral-100 transition font-semibold'
                        >
                          Sign Up
                        </Link>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Navbar;
