import React, { useState } from 'react';

import useAuth from '../../hooks/useAuth';
import { imageUpload } from '../../api/index';

import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import AddNewClassForm from './AddNewClassForm';

const AddNewClass = () => {
  const navigate  = useNavigate()
  const [loading , setLoading ] = useState(false)
  const axiosSecure = useAxiosSecure()
  const {user} = useAuth() 
  console.log(user)
  const [imagePreview , setImagePreview] = useState()
   const [iamgeText , setImageText] = useState("Upload image")
    // 
    const {mutateAsync} = useMutation({
      mutationFn : async classData => {
        const {data} = await axiosSecure.post(`/class` , classData)
      return data
      } ,
      onSuccess : () => {
        console.log("Data  Shaved Successfully")
         toast.success("Clss Added Successfully")
         navigate('/dashboard')
        setLoading(false)
      }
     })
     // form handler
     const handleSubmit = async e => {
      setLoading(true)
       e.preventDefault()
       const form = e.target 
       const classNames  = form.classNames.value 
       const details = form.details.value 
       const additionalInfo = form.additionalInfo.value  
       const image = form.image.files[0] 
        try{
            const image_url = await imageUpload(image) 
            const classData = {
                 classNames , details , additionalInfo , image  : image_url
            }
            console.table(classData)
            //  Post request to server 
            await mutateAsync((classData))
        }catch(err){
          toast.error(err.message)
            console.log(err)
            setLoading(false)
        }
     }
     // 
       const handleImages = image => {
         setImagePreview(URL.createObjectURL(image))
         setImageText(image.name)
       }
    return (
        <>
         <AddNewClassForm
         handleSubmit={handleSubmit}
         setImagePreview={setImagePreview}
         imagePreview={imagePreview}
         handleImages={handleImages}
         iamgeText={iamgeText}
         loading={loading}
         
         ></AddNewClassForm>
        </>
    );
};

export default AddNewClass;

