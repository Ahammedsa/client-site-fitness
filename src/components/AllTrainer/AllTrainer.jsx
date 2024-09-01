import React, { useEffect, useState } from 'react';
import TrainnerCard from './TrainnerCard';

const AllTrainer = () => {
   const [trainner, setTrainner] = useState([]);
 // Initialize as an empty array

 useEffect(() => {
    // Fetch trainers from the API when the component mounts
    fetch('/trainner.json')
        .then(response => response.json())
        .then(data => {
            setTrainner(data); // Assuming the data is an array
           
        })
       
}, []);
console.log('Fetched data:', trainner); // Log the data when it is fetched
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5 m-5 pt-5">
        
          {
            // trainner.map((item) => <h1>{item}</h1>)
            trainner.map((item , index) => (
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
