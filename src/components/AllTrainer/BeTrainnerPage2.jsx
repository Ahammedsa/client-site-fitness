import React, { useEffect, useState } from 'react';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import toast from 'react-hot-toast';
import { imageUpload } from '../../api/index';
import Select from 'react-select';
import HostModal from "../Modal/HostModal";
import LoadingSpinner from "../Shared/LoadingSpinner";
import useAxiosCommon from "../../hooks/useAxiosCommon"
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const BeTrainnerPage2 = () => {
    const [loading, setLoading] = useState(false);
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const axioscommon = useAxiosCommon()
    const [imagePreview, setImagePreview] = useState();
    const [imageText, setImageText] = useState('Upload image');
    const [isOpen, setIsOpen] = useState(false)
    const [isModalOpen, setisModalOpen] = useState(false)
    const closeModal = () => {
        setisModalOpen(false)
    }

    const [formData, setFormData] = useState({
        fullName: '',
        email: user?.email,
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
                profileImage: e.target.files[0],
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
            availableDays: selectedOptions
                ? selectedOptions.map((option) => option.value)
                : [],
        }));
    };

    const handleImages = (image) => {
        setImagePreview(URL.createObjectURL(image));
        setImageText(image.name);
        setFormData((prevState) => ({
            ...prevState,
            profileImage: image,
        }));
    };


    const { data: users = [], isLoading } = useQuery({
        queryKey: ['users', user?.email],
        queryFn: async () => {
            const { data } = await axiosSecure(`/users?email=${user?.email}`);
            return data;
        },
        enabled: !!user?.email,
    });
    console.log(users)
    if (isLoading) return <LoadingSpinner />;

    // const modalHandler = async (e) => {
    //     e.preventDefault();
    //     setLoading(true);
    //     try {
    //         const image = formData?.profileImage;
    //         const image_url = await imageUpload(image);
    //         const saveFormData = {
    //             fullName: formData?.fullName,
    //             email: user?.email,
    //             age: formData?.age,
    //             profileImage: image_url,
    //             skills: formData?.skills,
    //             role: user?.role,
    //             availableDays: formData?.availableDays,
    //             availableTime: formData?.availableTime,
    //             otherInfo: formData?.otherInfo,
    //             status: 'Requested',
    //         };
       

    //         const { data } = await axiosSecure.patch(`/changes/update?email=${user?.email}`, saveFormData);
           

    //         if (data.modifiedCount > 0) {
    //             toast.success('Success! Please wait for admin confirmation');
    //         } else {
    //             toast.success('Please wait for admin approval');
    //         }
    //     } catch (err) {
    //         toast.error(err.message);
    //     } finally {
    //         closeModal();
    //         setLoading(false);
    //     }
    // };
    const modalHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const image = formData?.profileImage;
            const image_url = await imageUpload(image);
            const saveFormData = {
                fullName: formData?.fullName,
                email: user?.email,
                age: formData?.age,
                profileImage: image_url,
                skills: formData?.skills,
                role: user?.role,
                availableDays: formData?.availableDays,
                availableTime: formData?.availableTime,
                otherInfo: formData?.otherInfo,
                status: 'Requested',
            };
    
            // Corrected URL
            const { data } = await axioscommon.patch(`/changes/update/${user?.email}`, saveFormData);
    
            if (data.modifiedCount > 0) {
                toast.success('Success! Please wait for admin confirmation');
            } else {
                toast.success('Please wait for admin approval');
            }
        } catch (err) {
            toast.error(err.message);
        } finally {
            closeModal();
            setLoading(false);
        }
    };
    return (
        <div className="container mx-auto my-10">
            <div className="card bg-base-100 shadow-xl p-8 w-7/12 mx-auto">
                <h2 className="text-3xl font-bold mb-8 text-center">Be a Trainer</h2>
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
                            required
                        />
                    </div>

                    {/* Other Information */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Other Information</span>
                        </label>
                        <textarea
                            name="otherInfo"
                            value={formData.otherInfo}
                            onChange={handleInputChange}
                            className="textarea textarea-bordered w-full"
                            placeholder="Tell us more about yourself"
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        onClick={() => setisModalOpen(true)}
                        // disabled={!user}
                        className='disabled:cursor-not-allowed cursor-pointer hover:bg-neutral-100 py-3 px-4 text-sm font-semibold rounded-full  transition'
                    >
                        Be A Trainner
                    </button>
                </form>
            </div>

            {/* Modal */}
            <HostModal
                isOpen={isModalOpen}
                closeModal={closeModal}
                modalHandler={modalHandler}
            ></HostModal>
        </div>
    );
};

export default BeTrainnerPage2;
