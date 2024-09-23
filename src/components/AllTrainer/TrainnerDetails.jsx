import React, { useState } from 'react';
import Container from '../Shared/Container';
import useAxiosCommon from '../../hooks/useAxiosCommon';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import LoadingSpinner from "../Shared/LoadingSpinner"
// import TrainnerBook from './TrainnerBook';
import Button from '../Button/Button';

// import { Helmet } from 'react-helmet-async'
// import useAuth from '../../../hooks/useAuth';

const TrainnerDetails = () => {
    const [select , setSelected] = useState(null)
    const { id } = useParams()
    console.log(id)
    const axiosCommon = useAxiosCommon()
    const { data: trainner = {}, isLoading } = useQuery({
        // 35 number id is a dependecy id  if  it will late or change id you call full 
        queryKey: ['trainner', id],
        queryFn: async () => {
            const { data } = await axiosCommon.get(`/trainnerDetails/${id}`)
            return data
        }
    })
    if (isLoading) return < LoadingSpinner
    />
 
    console.log(trainner)
    console.log(trainner?.name)
    return (
        <div>
            <Container>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2   mt-10 gap-1 '>
                    {/* <div className='bg-slate-200 p-5 rounded-md font-semibold text-lg'>
                        <h1 className='text-center'>Triner Info</h1>
                        
                    </div> */}
                    <div className="card bg-base-100 image-full  shadow-xl">
                        <figure>
                            <img
                                src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                                alt="Shoes" />
                        </figure>
                        <div className="card-body">
                            <h2 className="card-title">Triner Info!</h2>
                            <p>Hello i am {trainner?.trainer?.name}</p>

                            <p>Hello i am {trainner?.trainer?.description}</p>
                            {/* <div className="card-actions justify-end">
                                <button className="btn btn-primary">Buy Now</button>
                            </div> */}
                            <div className=''>
                                <Link to='/be-trainner-page' className='btn btn-success w-6/12 '>Be a trainner</Link>
                            </div>
                        </div>

                    </div>
                    <div className='bg-lime-600 shadow-xl rounded-md font-semibold text-lg text-white'>
                        <h1 className='text-center p-5'>Available Slot</h1>
                        <ul className='flex flex-col gap-2'>
                            {trainner.trainer.available_slots.map((slot, idx) => (
                                <li key={idx}><Button     slot={slot} idx={idx} trainner={trainner} ></Button></li>
                                
                            ))}
                        </ul>
                    </div>
                </div>
            </Container>

        </div>
    );
};
export default TrainnerDetails;