import React, { useEffect, useState } from 'react';
import TrainnerCard from './TrainnerCard';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import LoadingSpinner from'../Shared/LoadingSpinner';
const AllTrainer = () => {
const axiosSecure = useAxiosSecure()
const {data : trainners = [] , isLoading, refatch} = useQuery({
   queryKey : ['trainners'] , 
   queryFn : async () => {
       const {data} = await axiosSecure('/trainners')
       return data 
   }
})
console.log(trainners) 
if(isLoading) return <LoadingSpinner></LoadingSpinner>
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5 m-5 pt-5">
        
          {
            // trainner.map((item) => <h1>{item}</h1>)
            trainners.map((item , index) => (
              <TrainnerCard
               key={index} 
               item={item}
              ></TrainnerCard>
            ))
          }
        </div>
    );
};

export default AllTrainer;
