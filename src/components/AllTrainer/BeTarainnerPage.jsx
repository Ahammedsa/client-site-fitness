import React, { useState } from 'react';
import Select from 'react-select';

const BeATrainerPage = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: 'user@example.com', // Assuming email is read-only and fetched from the user context or props
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form data submitted:', formData);
    // Add your logic to send data to the backend here
  };

  return (
    <div className="container mx-auto my-10  ">
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
              value={formData.email}
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
              <span className="label-text bg-success">Profile Image</span>
            </label>
            <input
              type="file"
              name="profileImage"
              onChange={handleInputChange}
              className="file-input file-input-bordered w-full input-success "
            />
          </div>

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
              {/* Add more checkboxes as needed */}
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
            Apply
          </button>
        </form>
      </div>
    </div>
  );
};

export default BeATrainerPage;
