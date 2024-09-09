import React, { useState } from 'react';
import BeTrainner from "../Button/BeTrainner";
import { useMutation } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast'; // Assuming you're using react-hot-toast
import { imageUpload } from '../../../src/api/index';
const TrainnerFun = ({ user }) => { // Ensure user is passed as a prop or fetched from context
    const [availableDays, setAvailableDays] = useState([]);
    const [loading, setLoading] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);
    const [imageText, setImageText] = useState("Upload image");
    const axiosSecure = useAxiosSecure();
    
    const daysOptions = [
        { value: 'Sunday', label: 'Sunday' },
        { value: 'Monday', label: 'Monday' },
        { value: 'Tuesday', label: 'Tuesday' },
        { value: 'Wednesday', label: 'Wednesday' },
        { value: 'Thursday', label: 'Thursday' },
        { value: 'Friday', label: 'Friday' },
        { value: 'Saturday', label: 'Saturday' },
    ];

    const handleSelectChange = selectedOptions => {
        setAvailableDays(selectedOptions); // Set available days in state
    };

    const [formData, setFormData] = useState({
        fullName: '',
        email: user?.email || '', // Assuming email is read-only and fetched from the user context or props
        age: '',
        profileImage: null,
        skills: [],
        availableDays: [],
        availableTime: '',
        otherInfo: '',
        status: 'pending',
    });
    const { mutateAsync } = useMutation({
        mutationFn: async roomData => {
            const { data } = await axiosSecure.post(`/trainner`, roomData);
            return data;
        },
        onSuccess: (data) => {
            if (data?.status) {  // Ensure 'status' exists in the response
                toast.success("Trainer data saved successfully");
            } else {
                toast.success("Trainer data saved successfully, but status is missing in response.");
            }
            setLoading(false);
        },
    });

    const handleSubmit = async e => {
        e.preventDefault();
        setLoading(true);
        const form = e.target;
        const fullName = form.fullName.value;
        const email = form.email.value;
        const age = form.age.value;
        const profileImage = form.profileImage.files[0];
        const availableTime = form.availableTime.value;
        const otherInfo = form.otherInfo.value;
        const  memberShipPlan = form.package.value ;
        const price = form.price.value ;

        // Collect all selected skills (checkboxes)
        const skills = Array.from(form.skills)
            .filter(checkbox => checkbox.checked)
            .map(checkbox => checkbox.value);
        console.log({
            fullName,
            email,
            age,
            profileImage,
            skills,
            availableTime,
            otherInfo,
            availableDays ,
            memberShipPlan ,price
        });


        try {
            const image_url = await imageUpload(profileImage); // Changed image to profileImage
            const formData = {
                fullName,
                email,
                age,
                profileImage: image_url, // Use the image URL returned from imageUpload
                skills,
                availableTime,
                otherInfo,
                availableDays, 
                memberShipPlan ,
                 price ,
                status: 'pending'
            };

            console.table(formData);
            await mutateAsync(formData); // Submit the form data to the server
        } catch (err) {
            toast.error(err.message);
            console.log(err);
            setLoading(false);
        }
    };

    const handleImages = image => {
        setImagePreview(URL.createObjectURL(image));
        setImageText(image.name);
    };

    return (
        <div>
            <BeTrainner
                user={user}
                formData={formData}
                setFormData={setFormData}
                daysOptions={daysOptions}
                handleSelectChange={handleSelectChange}
                loading={loading}
                setLoading={setLoading}
                handleSubmit={handleSubmit}
                setImagePreview={setImagePreview}
                imagePreview={imagePreview}
                handleImages={handleImages}
                imageText={imageText}
            />
        </div>
    );
};

export default TrainnerFun;
