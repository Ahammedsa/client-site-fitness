
import { useState } from "react";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";
import {useQuery }from "@tanstack/react-query"
import axios from "axios";

const useRole = () => {
    const {user,loading} = useAuth() 
 
    // Fetched user info using logged in user email   
    const {data:role, isLoading} = useQuery({
        queryKey :['role', user?.email] ,
        enabled :!loading && !!user?.email ,
        queryFn : async () => {
            const {data} = await axios.get(`https://the-fitness-server.vercel.app/test?email=${user?.email}`)
            console.log((data))
            return data.role 
        },
    })
    return  [role , isLoading] 
};
export default useRole;

