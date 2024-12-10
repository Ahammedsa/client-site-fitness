import { useState } from 'react'
import { GrLogout } from 'react-icons/gr'
import { FcSettings } from 'react-icons/fc'
import { AiOutlineBars } from 'react-icons/ai'
import { BsGraphUp } from 'react-icons/bs'
import { NavLink } from 'react-router-dom'
import useAuth from '../../../hooks/useAuth'
import { Link } from 'react-router-dom'

import TrainnerMenu from '../Trainner/TrainnerMenu'
import MemberMenu from '../Member/MemberMenu'
import AdminMenu from '../Admin/AdminMenu'
import MenuItem from '../Sidebar/MenuItem'
import ToggleBtn from '../../Button/ToggleBtn'
import useRole from '../../../hooks/useRole'

const Sidebar = () => {
  const [role] = useRole()
  const { logOut } = useAuth()
  const [toggle, setToggle] = useState(true)
  const [isActive, setActive] = useState(false)
      console.log("role" ,role)
  const handleToggle = () => {
    setActive(!isActive)
  }

  const toggleHandler = (event) => {
    setToggle(event.target.checked)
  }

  const getNavLinkClasses = (isActive) => {
    return `flex items-center px-4 py-2 my-5 transition-colors duration-300 transform ${isActive ? 'bg-gray-300 text-gray-700' : 'text-gray-600 hover:bg-gray-300 hover:text-gray-700'}`
  }

  return (
    <>
      <div className="bg-gray-100 text-gray-800 flex justify-between md:hidden">
        <div>
          <div className="block cursor-pointer p-4 font-bold">
            <Link to="/">
              <img src="https://i.ibb.co/xyz123/the-fitness-logo.jpg" alt="logo" width="100" height="100" />
            </Link>
          </div>
        </div>
        <button onClick={handleToggle} className="mobile-menu-button p-4 focus:outline-none focus:bg-gray-200">
          <AiOutlineBars className="h-5 w-5" />
        </button>
      </div>

      <div className={`z-10 md:fixed flex flex-col justify-between overflow-x-hidden bg-gray-100 w-64 space-y-6 px-2 py-4 absolute inset-y-0 left-0 transform ${isActive ? '-translate-x-full' : 'translate-x-0'} md:translate-x-0 transition duration-200 ease-in-out`}>
        <div>
          <div className="w-full hidden md:flex px-4 py-2 shadow-lg rounded-lg justify-center items-center bg-rose-100 mx-auto">
            <Link to="/">
              <img src="https://i.ibb.co/xyz123/the-fitness-logo.jpg" alt="logo" width="50" height="50" />
            </Link>
          </div>

          <div className="flex flex-col justify-between flex-1 mt-6">
            {/* {role === "trainer" && <ToggleBtn toggleHandler={toggleHandler} toggle={toggle} />} */}
            <nav>
              <MenuItem label="Statistics" address="/dashboard" icon={BsGraphUp} />
              {role === "member" && <MemberMenu />}
              {role === "trainer" &&   <TrainnerMenu></TrainnerMenu>  }
              {role === "admin" && <AdminMenu />}
            </nav>
          </div>
        </div>

        <div>
          <hr />
          <NavLink to="/dashboard/profile" className={getNavLinkClasses(false)}>
            <FcSettings className="w-5 h-5" />
            <span className="mx-4 font-medium">Profile</span>
          </NavLink>
          <button onClick={logOut} className="flex w-full items-center px-4 py-2 mt-5 text-gray-600 hover:bg-red-500 hover:text-white transition-colors duration-300 transform">
            <GrLogout className="w-5 h-5" />
            <span className="mx-4 font-medium">Logout</span>
          </button>
        </div>
      </div>
    </>
  )
}

export default Sidebar
