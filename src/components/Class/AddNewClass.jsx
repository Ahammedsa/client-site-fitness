import React from 'react';

const AddNewClass = () => {
    return (

        <div className="container mx-auto p-6">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Add New Class</h1>
          <a href="/admin/classes" className="btn btn-outline">Back</a>
        </div>
  
        {/* Class Form */}
        <form className="bg-white p-8 rounded-lg shadow-md space-y-6">
          {/* Class Name */}
          <div>
            <label className="label">
              <span className="label-text">Class Name</span>
            </label>
            <input
              type="text"
              name="className"
              placeholder="Enter class name"
              className="input input-bordered w-full"
            />
          </div>
  
          {/* Class Image */}
          <div>
            <label className="label">
              <span className="label-text">Upload Class Image</span>
            </label>
            <input
              type="file"
              name="classImage"
              className="file-input file-input-bordered w-full"
            />
          </div>
  
          {/* Class Details */}
          <div>
            <label className="label">
              <span className="label-text">Class Details</span>
            </label>
            <textarea
              name="details"
              placeholder="Enter class details"
              className="textarea textarea-bordered w-full"
            />
          </div>
  
          {/* Additional Info */}
          <div>
            <label className="label">
              <span className="label-text">Additional Information</span>
            </label>
            <textarea
              name="additionalInfo"
              placeholder="Enter any additional information"
              className="textarea textarea-bordered w-full"
            />
          </div>
  
          {/* Form Actions */}
          <div className="flex justify-end space-x-4">
            <button type="reset" className="btn btn-outline">Cancel</button>
            <button type="submit" className="btn btn-primary">Add Class</button>
          </div>
        </form>
      </div>


    );
};

export default AddNewClass;

