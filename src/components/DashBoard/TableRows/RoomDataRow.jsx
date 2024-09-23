/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import { useState } from 'react';

import DeleteModal from '../../../components/Modal/DeleteModal';
const RoomDataRow = ({ room, refetch  , handleDelete , id}) => {
    // for delete modal
   
    let [isOpen, setIsOpen] = useState(false);
    const closeModal = () => {
        setIsOpen(false)
    }
     // for update modal
     const updateModal = () => {
        
     }
    return (
        <tr>
            <td className="px-5 py-5 border-grey-200 bg-white text-sm">
                <div className="flex items-center">
                    <div className="flex-shrink-0">
                        <div className="block relative">
                            <img alt="profile" src={room?.image} className="mx-auto object-cover rounded h-10 w-15" />
                        </div>
                    </div>
                    <div className="ml-3">
                        <p className="text-grey-900 whitespace-no-wrap">{room?.title}</p>
                    </div>
                </div>
            </td>
            <td>
                <div className="px-5 py-5 border-grey-200 bg-white text-sm">
                    <p className="text-grey-900 whitespace-no-wrap">{room?.location}</p>
                </div>
            </td>
            <td>
                <div className="px-5 py-5 border-grey-200 bg-white text-sm">
                    <p className="text-grey-900 whitespace-no-wrap">{room?.price}</p>
                </div>
            </td>
            <td>
                <div className="px-5 py-5 border-grey-200 bg-white text-sm">
                    <p className="text-grey-900 whitespace-no-wrap">
                        {room?.from ? format(new Date(room.from), 'p') : 'N/A'}
                    </p>
                </div>
            </td>
            <td>
                <div className="px-5 py-5 border-grey-200 bg-white text-sm">
                    <p className="text-grey-900 whitespace-no-wrap">
                        {room?.to ? format(new Date(room.to), 'p') : 'N/A'}
                    </p>
                </div>
            </td>
            <td>
                <button   
                onClick={() => setIsOpen(true)} 
                className="px-5 py-5 border-grey-200 bg-white text-sm">
                    <span className="relative cursor-pointer inline-block px-3 py-1 font-semi-bold text-green">
                        <span
                            aria-hidden="true"
                            className="absolute inset-0 bg-green-200 opacity-50 rounded-full"
                        ></span>
                        <span className="relative">Delete</span>
                    </span>
                </button>
            </td>
            <td className='px-5 py-5 border-grey-200 bg-white text-sm'>

                <button
                  
                    className="relative cursor-pointer inline-block px-3 py-1 font-semi-bold text-green">
                    <span
                        aria-hidden="true"
                        className="absolute inset-0 bg-green-200 opacity-50 rounded-full"
                    ></span>
                    <span className="relative">Update</span>
                </button>
                   <DeleteModal isOpen={isOpen} closeModal={closeModal} handleDelete={handleDelete } id={room?._id}></DeleteModal>

            </td>
        </tr>
    );
};

RoomDataRow.propTypes = {
    room: PropTypes.object,
    refetch: PropTypes.func,
};

export default RoomDataRow;
