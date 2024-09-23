import React, { useState } from 'react';
import Select from 'react-select';
import useAuth from '../../hooks/useAuth';

const BeTrainner= ({
  daysOptions,
  formData,
  setFormData,
  handleSelectChange,
  loading,
  setLoading,
  handleSubmit,
  imagePreview,
  handleImages,
  iamgeText
}) => {
  const {user} = useAuth()
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setFormData((prevState) => ({
        ...prevState,
        skills: checked
          ? [...prevState.skills, value]
          : prevState.skills.filter((skill) => skill !== value),
      }));

    } else if (type === 'file') {
      setFormData((prevState) => ({
        ...prevState,
        [name]: e.target.files[0],
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
    setLoading(false)
  };

  return (
    <div className="container mx-auto my-10  ">
      <div className="card bg-base-100 shadow-xl p-8 w-7/12 mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center">Be a Trainer</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">

          {/* Full Name */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Full Name</span>
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              className="input input-bordered w-full"
              required
            />
          </div>

          {/* Email (Read-only) */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              name="email"
              value={user?.email}
              readOnly
              className="input input-bordered w-full"
            />
          </div>

          {/* Age */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Age</span>
            </label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleInputChange}
              className="input input-bordered w-full"
              required
            />
          </div>

          {/* Profile Image Upload */}
          <div className='p-4 bg-white w-full m-auto rounded-lg flex justify-between items-center'>
            <div className='file_upload px-5 py-3 relative border-4 border-dotted border-gray-300 rounded-lg'>
              <div className='flex flex-col w-max mx-auto text-center'>
                <label>
                  <input
                    className='text-sm cursor-pointer w-36 hidden'
                    type='file'
                    name='profileImage'
                    onChange={e => handleImages(e.target.files[0])}
                    id='image'
                    accept='image/*'
                    hidden
                  />
                  <div className='bg-rose-500 text-white border border-gray-300 rounded font-semibold cursor-pointer p-1 px-3 hover:bg-rose-500'>
                    {/* Ensure iamgeText is always a string */}
                    {iamgeText?.length > 20 ? iamgeText.split('.')[0].slice(0, 15) + '...' + iamgeText.split('.')[1] : iamgeText || "Upload image"}
                  </div>
                </label>
              </div>
            </div>
            <div className='h-16 w-16 object-cover overflow-hidden flex items-center'>
              {imagePreview && <img src={imagePreview} alt="" />}
            </div>
          </div>

          {/* Skills (Checkboxes) */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Skills</span>
            </label>
            <div className="flex flex-wrap gap-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="skills"
                  value="Bodybuilding"
                  onChange={handleInputChange}
                  className="checkbox checkbox-success"
                />
                <span className="ml-2">Bodybuilding</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="skills"
                  value="Yoga"
                  onChange={handleInputChange}
                  className="checkbox checkbox-success"
                />
                <span className="ml-2">Yoga</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="skills"
                  value="Fitness Running"
                  onChange={handleInputChange}
                  className="checkbox checkbox-success"
                />
                <span className="ml-2">Fitness Running</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="skills"
                  value="Weight Lifting"
                  onChange={handleInputChange}
                  className="checkbox checkbox-success"
                />
                <span className="ml-2">Weight Lifting</span>
              </label>
            </div>
          </div>
          {/* Membership CheckBox (Checkboxes) */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Membership Plan</span>
            </label>
            <div className="flex flex-wrap gap-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="memberShipPlan"
                  value="Basic"
                  onChange={handleInputChange}
                  className="checkbox checkbox-success"
                />
                <span className="ml-2">Standard</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="memberShipPlan"
                  value="Standard"
                  onChange={handleInputChange}
                  className="checkbox checkbox-success"
                />
                <span className="ml-2">Standard</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="memberShipPlan"
                  value="Fitness Running"
                  onChange={handleInputChange}
                  className="checkbox checkbox-success"
                />
                <span className="ml-2">Premimum</span>
              </label>
              
            </div>
          </div>

          {/* Available Days (React Select) */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Available Days</span>
            </label>
            <Select
              isMulti
              name="availableDays"
              options={daysOptions}
              className="basic-multi-select"
              classNamePrefix="select"
              onChange={handleSelectChange}
            />
          </div>

          {/* Available Time */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Available Time</span>
            </label>
            <input
              type="text"
              name="availableTime"
              value={formData.availableTime}
              onChange={handleInputChange}
              className="input input-bordered w-full"
              placeholder="e.g., 10:00 AM - 2:00 PM"
              required
            />
          </div>

          {/* Other Info */}
        
        

          {/* Submit Button */}
          <button type="submit" className="btn btn-primary">
            {loading ? 'Submitting...' : 'Submit'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default BeTrainner;
