import MenuItem from '../Sidebar/MenuItem'
import { BsFillHouseAddFill } from 'react-icons/bs'
import { FaUserCog } from 'react-icons/fa'
import { MdHomeWork, MdOutlineManageHistory } from 'react-icons/md'
import { FaBeer } from 'react-icons/fa'
const Trainner = () => {
  return (
    <>
      <MenuItem icon={FaBeer} label='Add new Slot' address='add-newSlot' />
     
      <MenuItem
        icon={MdOutlineManageHistory}
        label='Manage Bookings'
        address='manage-bookings'
      />
       <MenuItem icon={FaUserCog} label='Profile' address='profile' />
    </>
  )
}

export default Trainner