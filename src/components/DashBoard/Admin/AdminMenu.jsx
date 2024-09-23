import { FaUserCog } from 'react-icons/fa'
import MenuItem from '../Sidebar/MenuItem'
import { IoIosFitness } from "react-icons/io";
import { MdFitnessCenter } from "react-icons/md";


const AdminMenu = () => {
  return (
    <>
      <MenuItem icon={FaUserCog} label='Manage Users' address='manage-users' />
      <MenuItem icon={IoIosFitness} label='Add Class' address='add-class' />
      <MenuItem icon={MdFitnessCenter} label='All Trainner' address='all-trainner-admin-page' />
      <MenuItem icon={FaUserCog} label='Applied Trainner' address='applied-trainner' />
    </>
  )
}

export default AdminMenu