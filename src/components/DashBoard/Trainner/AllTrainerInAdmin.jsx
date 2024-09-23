import React from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import LoadingSpinner from '../../Shared/LoadingSpinner';
import UserDataRow from '../TableRows/UserDataRow';
import TrainnerRow from '../TableRows/TrainnerRow';

const AllTrainerInAdmin = () => {
    const axiosSecure = useAxiosSecure()
    const { data: trainners = [], isLoading, refatch } = useQuery({
        queryKey: ['trainners'],
        queryFn: async () => {
            const { data } = await axiosSecure('/trainners')
            return data
        }
    })
    console.log(trainners)
    if (isLoading) return <LoadingSpinner></LoadingSpinner>
    return (
        <div>
           { trainners.map((trainner , idx  )=> (<TrainnerRow
           key={trainner._id} 
           trainner={trainner} 
           idx={idx}
           ></TrainnerRow>))}
        </div>
    );
};

export default AllTrainerInAdmin;