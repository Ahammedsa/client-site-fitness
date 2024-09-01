import React from 'react';

const TrainnerCard = ({ item }) => {

    return (

        <div className=" gap-5   ">
           <div className='grid lg:grid-cols-2  gap-10   bg-slate-100 shadow-xl'>
           <div className='mt-10'> <figure>
                <img
                    className='rounded-xl w-full'
                    src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp"
                    alt="Movie" />
            </figure>

            </div>
            <div className="sm:mt-10 space-y-2">
                <h1 className='uppercase text-sm'>Hello Everybody, i am</h1>
                <h2 className=" uppercase card-title text-xl font-extrabold">{item?.trainer?.name}</h2>
                <p className='font-bold'>{item?.category}</p>
                <p className='text-xs '>{item?.trainer?.description}</p>
                <p className='text-sm'>i am  works in this sector more than <br />  <span className='text-lg font-semibold'>{item?.trainer?.years_of_experience}</span>     years</p>
                <p>Available Slots:</p>
                        <ul className='flex flex-col gap-1'>
                            {item.trainer.available_slots.map((slot, idx) => (
                                <li  className='bg-slate-200 rounded-md' key={idx}>{slot}</li>
                            ))}
                        </ul>

                <div className=" ">
                <button className="btn bg-slate-400 w-full">Know more</button>
             
            </div>
            </div>
        
           </div>
        </div>

    );
};

export default TrainnerCard;