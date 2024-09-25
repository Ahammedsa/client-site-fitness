import React, { useEffect, useState } from 'react';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import toast from 'react-hot-toast';
import { imageUpload } from '../../api/index';
import BeTrainerPageForm from './BeTrainerPageForm';
import { useQuery } from '@tanstack/react-query';
import LoadingSpinner from "../Shared/LoadingSpinner";

const BeATrainerPage = () => {
  const [loading, setLoading] = useState(false);
  const { user } = useAuth(); 
  const axiosSecure = useAxiosSecure();
  const [imagePreview, setImagePreview] = useState();
  const [imageText, setImageText] = useState('Upload image');
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setisModalOpen] = useState(false);

  console.log(user?.email);

  const closeModal = () => {
    setisModalOpen(false);
  };

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

  console.log(users);

  if (isLoading) return <LoadingSpinner />;

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
      
      const { data } = await axiosSecure.put(`/user`, saveFormData);
      console.log(data);
  
      if (data.modifiedCount > 0) {
        toast.success('Success! Please wait for admin confirmation');
      } else {
        toast.success('Please wait for admin approval');
      }
  
      return data;
    } catch (err) {
      toast.error(err.message);
    } finally {
      closeModal();
      setLoading(false);
    }
  };

  const applyForTrainer = () => {
    setLoading(true);
    mutation.mutate();
  };

  return (
    <div className="container mx-auto my-10">
      <div className="card bg-base-100 shadow-xl p-8 w-7/12 mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center">Be a Trainer</h2>

        {/* Render the form and pass necessary props */}
        <BeTrainerPageForm
          formData={formData}
          loading={loading}
          imagePreview={imagePreview}
          imageText={imageText}
          daysOptions={daysOptions}
          handleInputChange={handleInputChange}
          handleSelectChange={handleSelectChange}
          handleImages={handleImages}
          applyForTrainer={applyForTrainer}
          closeModal={closeModal}
          isOpen={isModalOpen}
          isModalOpen={isModalOpen}
          setisModalOpen={setisModalOpen}
          modalHandler={modalHandler}
          users={users}
       
        />
      </div>
    </div>
  );
};

export default BeATrainerPage;




// import React, { useEffect, useState } from 'react';
// import useAuth from '../../hooks/useAuth';
// import useAxiosSecure from '../../hooks/useAxiosSecure';

// import toast from 'react-hot-toast';
// import { imageUpload } from '../../api/index';
// import BeTrainerPageForm from './BeTrainerPageForm'; // Import the form component
// import {useQuery} from '@tanstack/react-query'
// import LoadingSpinner from "../Shared/LoadingSpinner"
// const BeATrainerPage = () => {
//   const [loading, setLoading] = useState(false);
//   const { user } = useAuth();
//   const axiosSecure = useAxiosSecure();
//   const [imagePreview, setImagePreview] = useState();
//   const [imageText, setImageText] = useState('Upload image');
//   const [isOpen, setIsOpen] = useState(false)
//   const [isModalOpen , setisModalOpen] = useState(false)
//   console.log(user)
//    const closeModal = () => {
//     setisModalOpen(false)
//    }

//   const [formData, setFormData] = useState({
//     fullName: '',
//     email: user?.email, // Assuming email is read-only and fetched from the user context
//     age: '',
//     profileImage: null,
//     skills: [],
//     availableDays: [],
//     availableTime: '',
//     otherInfo: '',
//     status: 'pending',
//   });

//   const daysOptions = [
//     { value: 'Sunday', label: 'Sunday' },
//     { value: 'Monday', label: 'Monday' },
//     { value: 'Tuesday', label: 'Tuesday' },
//     { value: 'Wednesday', label: 'Wednesday' },
//     { value: 'Thursday', label: 'Thursday' },
//     { value: 'Friday', label: 'Friday' },
//     { value: 'Saturday', label: 'Saturday' },
//   ];

//   const handleInputChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     if (type === 'checkbox') {
//       setFormData((prevState) => ({
//         ...prevState,
//         skills: checked
//           ? [...prevState.skills, value]
//           : prevState.skills.filter((skill) => skill !== value),
//       }));
//     } else if (type === 'file') {
//       setFormData((prevState) => ({
//         ...prevState,
//         profileImage: e.target.files[0],
//       }));
//     } else {
//       setFormData((prevState) => ({
//         ...prevState,
//         [name]: value,
//       }));
//     }
//   };

//   const handleSelectChange = (selectedOptions) => {
//     setFormData((prevState) => ({
//       ...prevState,
//       availableDays: selectedOptions ? selectedOptions.map(option => option.value) : [],
//     }));
//   };

//   const handleImages = (image) => {
//     setImagePreview(URL.createObjectURL(image));
//     setImageText(image.name);
//     setFormData((prevState) => ({
//       ...prevState,
//       profileImage: image,
//     }));
//   };
  
//   const { data: users = [], isLoading } = useQuery({
//     queryKey: ['users', email],  
//     queryFn: async () => {
//       const { data } = await axiosSecure(`/users?email=${user?.email}`);  
//       return data;
//     },
//     enabled: !!email,  
//   });
  
//   console.log(users)
//   if (isLoading) return <LoadingSpinner></LoadingSpinner>
//   const modalHandler = async (e) => {
//     console.log("i want to be")
//     e.preventDefault();
//     setLoading(true);
//     try {
//       const image = formData?.profileImage;
//       const image_url = await imageUpload(image);
//       const saveformData = {
//         fullName: formData?.fullName,
//         email: users?.email,
//         age: formData?.age,
//         profileImage: image_url,
//         skills: formData?.skills,
//         role : users?.role ,
//         availableDays: formData?.availableDays,
//         availableTime: formData?.availableTime,
//         otherInfo: formData?.otherInfo,
//         // email : user?.email ,
//         role : users?.role,
//         status : "Requested"
//       };
//       console.log(email , )
//       const {data} = await axiosSecure.put(`/user` , saveformData)
//       console.log(data) 
//       if(data.modifiedCount > 0) {
//         toast.success("Success! Please wait for admin confirmation")
//       } else{
//         toast.success("please!!, Wait for admin approval")
//       }
//       return data 
//     }catch(err) {
//       toast.error(err.message)
//     } finally{
//      closeModal() 
//     } 
//   };

//   const applyForTrainer = () => {
//     setLoading(true);
//     mutation.mutate();
//   };
 
//   return (
//     <div className="container mx-auto my-10">
//       <div className="card bg-base-100 shadow-xl p-8 w-7/12 mx-auto">
//         <h2 className="text-3xl font-bold mb-8 text-center">Be a Trainer</h2>

//         {/* Render the form and pass necessary props */}
//         <BeTrainerPageForm 
//           formData={formData}
//           loading={loading}
//           imagePreview={imagePreview}
//           imageText={imageText}
//           daysOptions={daysOptions}
//           handleInputChange={handleInputChange}
//           handleSelectChange={handleSelectChange}
        
//           handleImages={handleImages}
//           applyForTrainer={applyForTrainer}
//           closeModal={closeModal}
//           isOpen={isOpen}
//           isModalOpen={isModalOpen}
//           setisModalOpen={setisModalOpen}
//           modalHandler={modalHandler}
//         />
//       </div>
//     </div>
//   );
// };

// export default BeATrainerPage;
