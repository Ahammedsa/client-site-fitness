import React from 'react';
import { TbFidgetSpinner } from 'react-icons/tb';
const AddNewClassForm = ({   handleSubmit, imagePreview, handleImages, iamgeText, loading }) => {
    return (
        <div className="container mx-auto p-6">
        {/* Header Section */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold">Add New Class</h1>
         
        </div>
  
        {/* Class Form */}
        <form  onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md space-y-6">
          {/* Class Name */}
          <div>
            <label className="label">
              <span className="label-text">Class Name</span>
            </label>
            <input
              type="text"
              name="classNames" 
              id="classNames"
              placeholder="Enter class name"
              className="input input-bordered w-full"
            />
          </div>
  
          {/* Class Image */}
          <div className=' p-4 bg-white w-full  m-auto rounded-lg flex justify-between items-center'>
              <div className='file_upload px-5 py-3 relative border-4 border-dotted border-gray-300 rounded-lg'>
                <div className='flex flex-col w-max mx-auto text-center'>
                  <label>
                    <input
                      className='text-sm cursor-pointer w-36 hidden'
                      type='file'
                      name='image'
                      onChange={e => {
                        handleImages(e.target.files[0])
                      }}
                      id='image'
                      accept='image/*'
                      hidden
                    />
                    <div className='bg-green-500 text-white border border-gray-300 rounded font-semibold cursor-pointer p-1 px-3 hover:bg-rose-500'>
                      {iamgeText.length > 20 ? iamgeText.split('.')[0].slice(0, 15) + '...' + iamgeText.split('.')[1] : iamgeText}
                    </div>
                  </label>
                </div>

              </div>
              <div className='h-16 w-16  object-cover overflow-hidden flex items-center '>
                {imagePreview && <img src={imagePreview} alt="" />}
              </div>
            </div>
  
          {/* Class Details */}
          <div>
            <label className="label">
              <span className="label-text">Class Details</span>
            </label>
            <textarea
              name="details"
              id="details"
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
              id="additionalInfo"
              placeholder="Enter any additional information"
              className="textarea textarea-bordered w-full"
            />
          </div>
  
          {/* Form Actions */}
          <button
          disabled={loading}
          type='submit'
          className='w-full p-3 mt-5 text-center font-medium text-white transition duration-200 rounded shadow-md bg-green-500'
        >
          {loading ? (
            <TbFidgetSpinner className='animate-spin m-auto'></TbFidgetSpinner>
          ) : (
            '   Saved and continue'
          )}
        </button>
        </form>
      </div>
    );
};

export default AddNewClassForm;