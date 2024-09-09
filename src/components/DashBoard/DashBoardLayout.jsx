
 import {Outlet} from 'react-router-dom'
import Sidebar from './Sidebar/Sidebar';
const DashBoardLayout = () => {
    return <div>
        {/*Sidebar*/}
       <Sidebar></Sidebar>
        {/*Outlet --- outlet dynamic content*/}
         <div className='flex-1 md:ml-64'>
             <div className="p-5">
             <Outlet></Outlet>
             </div>
         </div>
    </div>

};

export default DashBoardLayout