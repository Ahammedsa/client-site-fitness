import React from 'react';

const JoinNow = ({ planName, price }) => {
    return (
        <div>
            <h1>{planName}</h1>
            <p>{price}</p>
        </div>
    );
};

export default JoinNow;