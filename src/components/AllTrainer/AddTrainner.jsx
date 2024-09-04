import React from 'react';
import { useMutation } from 'react-query';
import BeATrainerPage from './BeATrainerPage';

const AddTrainer = () => {
 

  return (
    <div>
      <h1>Add Trainer</h1>
      <BeATrainerPage daysOptions={daysOptions} />
    </div>
  );
};

export default AddTrainer;
