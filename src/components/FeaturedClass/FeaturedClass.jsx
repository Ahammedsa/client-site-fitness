import React, { useEffect, useState } from 'react';
import Card from '../Shared/Card';

const FeaturedClass = () => {
  const [data, setData] = useState(null); // Initialize with null to represent no data

  useEffect(() => {
      // Fetch trainers from the API when the component mounts
      fetch('class.json')
          .then(response => response.json())
          .then(data => {
              setData(data); // Assuming the data is an array
              console.log('Fetched data:', data); // Log the data when it is fetched
          })
          .catch(error => console.error('Error fetching trainers:', error));
  }, []);

  // Log data when it is available
  console.log(data);

  return (
      <div className='container px-6 py-10 mx-auto  grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3'>
        {data?.map((item, index) => (
          <Card
            key={index}
            item={item}
          />
        ))}
      </div>
  );
};

export default FeaturedClass;
