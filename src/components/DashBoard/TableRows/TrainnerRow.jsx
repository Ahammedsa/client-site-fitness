import React from 'react';

const TrainnerRow = ({trainner , idx}) => {  
    console.log(trainner)
    return (
        <div className="overflow-x-auto">
        <table className="table">
            {/* head */}
            <thead>
                <tr>
                    <th></th>
                    <th>Name</th>
                    <th>Job</th>
                    <th>role</th>
                </tr>
            </thead>
            <tbody>
                {/* row 1 */}
                <tr>
                    <th>{idx+1}</th>
                    <td>{trainner?.fullName}</td>
                    <td>{trainner?.category}</td>
                    <td>{trainner?.role}</td>
                </tr>
               
            </tbody>
        </table>
    </div>
    );
};

export default TrainnerRow;
