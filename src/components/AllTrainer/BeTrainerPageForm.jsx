import React from 'react';
import Select from 'react-select';
import HostModal from "../Modal/HostModal"
import { AiOutlineMenu } from 'react-icons/ai';
import useAuth from '../../hooks/useAuth';
const
  BeTrainerPageForm = ({
    formData,
    imagePreview,
    imageText,
    daysOptions,
    handleInputChange,
    handleSelectChange,
    loading,
    handleImages,
    closeModal,
   isModalOpen, setisModalOpen, modalHandler
 

  }) => {
    const { user } = useAuth()
    console.log(user?.email)
    return (
      <form onSubmit={modalHandler} className="flex flex-col gap-6">

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

        {/* Email */}
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

        {/* Profile Image */}
        <div className="p-4 bg-white w-full m-auto rounded-lg flex justify-between items-center">
          <div className="file_upload px-5 py-3 relative border-4 border-dotted border-gray-300 rounded-lg">
            <div className="flex flex-col w-max mx-auto text-center">
              <label>
                <input
                  className="text-sm cursor-pointer w-36 hidden"
                  type="file"
                  name="image"
                  onChange={(e) => handleImages(e.target.files[0])}
                  id="image"
                  accept="image/*"
                  hidden
                />
                <div className="bg-green-500 text-white border border-gray-300 rounded font-semibold cursor-pointer p-1 px-3 hover:bg-rose-500">
                  {imageText.length > 20
                    ? imageText.split('.')[0].slice(0, 15) + '...' + imageText.split('.')[1]
                    : imageText}
                </div>
              </label>
            </div>
          </div>
          <div className="h-16 w-16 object-cover overflow-hidden flex items-center">
            {imagePreview && <img src={imagePreview} alt="" />}
          </div>
        </div>

        {/* Skills */}
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

        {/* Available Days */}
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
        <div className="form-control">
          <label className="label">
            <span className="label-text">Other Info</span>
          </label>
          <textarea
            name="otherInfo"
            value={formData.otherInfo}
            onChange={handleInputChange}
            className="textarea textarea-bordered w-full"
            rows="4"
            placeholder="Any other information you want to provide"
          />
        </div>

        {/* Submit Button */}
        <div className="form-control mt-6">
          {/* {!user && ( */}
          {/* Submit Button */}
          <div className="form-control mt-6">
            {/* Submit Button */}
            <div className="form-control mt-6">
              <button
                onClick={() => setisModalOpen(!isModalOpen)}
                disabled={loading || user?.role === 'requested' || user?.role === 'trainer'}
                className={`py-3 px-4 text-sm font-semibold rounded-full transition ${loading || user?.role === 'requested' || user?.role === 'trainer' ? 'bg-gray-400 cursor-not-allowed' : 'hover:bg-neutral-100 cursor-pointer'}`}
              >
                {user?.role === 'trainer' ? 'You are a Trainer' : user?.role === 'requested' ? 'Waiting for Admin Approval' : 'Be A Trainer'}
              </button>
            </div>

          </div>

          {/* )} */}
        </div>
        {/* Modal */}
        <HostModal
         isOpen={isModalOpen} 
         closeModal={closeModal}
          modalHandler={modalHandler} 
        ></HostModal>
      </form>
    );
  };

export default BeTrainerPageForm;
