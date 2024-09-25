
import { useState } from "react";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";
import {useQuery }from "@tanstack/react-query"

const useRole = () => {
    const {user , loading} = useAuth() 
     console.log(user)
    const axiosSecure  = useAxiosSecure()
    
    console.log(user)
    // Fetched user info using logged in user email   
    const {data:role, isLoading} = useQuery({
        queryKey :['role', user?.email] ,
        enabled : !loading && !!user?.email ,
        queryFn : async () => {
            const {data} = await axiosSecure(`/users/${user?.email}`)
            console.log(role)  
            console.log((data))
            return data.role 
          
        },
      
    })
    return  [role , isLoading]
    
};

export default useRole;

