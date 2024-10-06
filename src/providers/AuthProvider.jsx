/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from 'react'
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from 'firebase/auth'
import axios from "axios"
import { app } from '../firebase/firebase.config'

export const AuthContext = createContext(null)
const auth = getAuth(app)
const googleProvider = new GoogleAuthProvider()

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true) 
  const [indexNumberOFsolt , setindexNumberOFsolt] = useState(null)

  const createUser = (email, password) => {
    setLoading(true)
    return createUserWithEmailAndPassword(auth, email, password)
  }

  const signIn = (email, password) => {
    setLoading(true)
    return signInWithEmailAndPassword(auth, email, password)
  }

  const signInWithGoogle = () => {
    setLoading(true)
    return signInWithPopup(auth, googleProvider)
  }

  const resetPassword = email => {
    setLoading(true)
    return sendPasswordResetEmail(auth, email)
  }

  const logOut = () => {
    setLoading(true)
    return signOut(auth)
  }

  const updateUserProfile = (name, photo) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    })
  }
   // get token from the  server  
   const getToken = async email => {
    const {data} = await axios.post(
      `${import.meta.env.VITE_API_URL}/jwt` ,
      {email} ,
      {withCredentials : true}
    )
    return data
  }

   // save user 
   const saveUser = async user => {
    try {
      const currentUser  = {
        email : user?.email ,
        name : user?.displayName,
        role :"member" ,
        status : "Verified"
      }
      const { data } = await axios.put(`https://the-fitness-server.vercel.app/new-user`, currentUser);
      return data;
    } catch (error) {
      console.error('Error in saveUser:', error.response?.data || error.message);
      throw error;
    }
  }
  // onAuthStateChange
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      console.log("currentUser" , currentUser)
      setUser(currentUser)
       if(currentUser) {
        getToken(currentUser.email)
        saveUser(currentUser)
       }
    
      setLoading(false)
    })
    return () => {
      return unsubscribe()
    }
  }, [])

  const authInfo = {
    user,
    loading,
    setLoading,
    createUser,
    signIn,
    signInWithGoogle,
    resetPassword,
    logOut,
    updateUserProfile,
    indexNumberOFsolt,
    setindexNumberOFsolt , 
 

  }

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  )
}

export default AuthProvider
