import React, { useState } from 'react';
import Select from 'react-select';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

const BeATrainerPage = () => {
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [formData, setFormData] = useState({
    fullName: '',
    email: user?.email, // Assuming email is read-only and fetched from the user context
    age: '',
    profileImage: null,
    skills: [],
    availableDays: [],
    availableTime: '',
    otherInfo: '',
    status: 'pending',
  });

  const daysOptions = [
    { value: 'Sunday', label: 'Sunday' },
    { value: 'Monday', label: 'Monday' },
    { value: 'Tuesday', label: 'Tuesday' },
    { value: 'Wednesday', label: 'Wednesday' },
    { value: 'Thursday', label: 'Thursday' },
    { value: 'Friday', label: 'Friday' },
    { value: 'Saturday', label: 'Saturday' },
  ];

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
  };

  const handleSelectChange = (selectedOptions) => {
    setFormData((prevState) => ({
      ...prevState,
      availableDays: selectedOptions ? selectedOptions.map(option => option.value) : [],
    }));
  };

  const { mutateAsync } = useMutation({
    mutationFn: async (trainerData) => {
      const { data } = await axiosSecure.post(`/trainners`, trainerData);
      return data;
    },
    onSuccess: () => {
      console.log("Data Saved Successfully");
      toast.success("Application Submitted Successfully");
      setLoading(false);
    },
    onError: (error) => {
      toast.error(`Error: ${error.message}`);
      setLoading(false);
    }
  });

  const imageUpload = async (imageFile) => {
    const formData = new FormData();
    formData.append('file', imageFile);
    formData.append('upload_preset', 'your_upload_preset'); // Replace with your upload preset
    formData.append('cloud_name', 'your_cloud_name'); // Replace with your Cloudinary cloud name
    const response = await fetch('https://api.cloudinary.com/v1_1/your_cloud_name/image/upload', {
      method: 'POST',
      body: formData,
    });
  
    if (!response.ok) {
      throw new Error('Image upload failed');
    }
    const data = await response.json();
    return data.secure_url; // Return the URL of the uploaded image
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const image_url = await imageUpload(formData?.profileImage);
      const saveformData = {
        fullName: formData?.fullName,
        email: formData?.email,
        age: formData?.age,
        profileImage: image_url,
        skills: formData?.skills,
        availableDays: formData?.availableDays,
        availableTime: formData?.availableTime,
        otherInfo: formData?.otherInfo,
        status: 'pending',
      };

      console.table(saveformData);
      await mutateAsync(saveformData);
    } catch (err) {
      toast.error(err.message);
      console.log(err);
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto my-10">
      <div className="card bg-base-100 shadow-xl p-8 w-7/12 mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center">Be a Trainer</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">

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

          <div className="form-control">
            <label className="label">
              <span className="label-text">Profile Image</span>
            </label>
            <input
              type="file"
              name="profileImage"
              onChange={handleInputChange}
              className="file-input file-input-bordered w-full input-success"
              required
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Skills</span>
            </label>
            <div className="flex flex-wrap gap-4">
              {/* Checkbox inputs for skills */}
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

          <div className="form-control">
            <label className="label">
              <span className="label-text">Other Info</span>
            </label>
            <textarea
              name="otherInfo"
              value={formData.otherInfo}
              onChange={handleInputChange}
              className="textarea textarea-bordered w-full"
              placeholder="Enter any additional information"
            />
          </div>

          <button type="submit" className="btn btn-success w-full text-white">
            {loading ? 'Submitting...' : 'Apply'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default BeATrainerPage;
