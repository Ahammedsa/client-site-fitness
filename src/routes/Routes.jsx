import { createBrowserRouter } from 'react-router-dom'
import Main from '../layouts/Main'
import Home from '../pages/Home/Home'
import ErrorPage from '../pages/ErrorPage'
import Login from '../pages/Login/Login'
import SignUp from '../pages/SignUp/SignUp'
import AddNewClass from '../components/Class/AddNewClass'
import AllTrainer from '../components/AllTrainer/AllTrainer'
import TrainnerDetails from '../components/AllTrainer/TrainnerDetails'
import TrainnerBook from '../components/AllTrainer/TrainnerBook'


import PaymentPage from '../components/Payment/PaymentPage'
import DashBoardLayout from '../components/DashBoard/DashBoardLayout'
import Profile from '../components/DashBoard/Profile'
import AllClass from '../components/Class/AllClass'
import ManageUsers from '../components/DashBoard/Admin/ManageUsers'
import AdminRoute from './AdminRoute'
import AllTrainerInAdmin from '../components/DashBoard/Trainner/AllTrainerInAdmin'
import AppliedTrainner from '../components/DashBoard/Trainner/AppliedTrainner'
import Details from '../components/DashBoard/Admin/Details'
import BeTrainnerPage2 from '../components/AllTrainer/BeTrainnerPage2'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <DashBoardLayout></DashBoardLayout>,
    children: [
      {
        path: 'profile',
        element: <Profile></Profile>
      },
      {
        path: 'manage-users',
        element: <ManageUsers></ManageUsers>
      },
      {
        path: 'add-class',
        element: <AdminRoute>  <AddNewClass></AddNewClass> </AdminRoute>
      },
      {
        path: 'all-trainner-admin-page',
        element: <AdminRoute>  <AllTrainerInAdmin></AllTrainerInAdmin>  </AdminRoute>
      } ,
      {
        path: 'applied-trainner',
        element: <AdminRoute> <AppliedTrainner></AppliedTrainner> </AdminRoute>
      },
      {
        path: "user-details/:id" ,
        element : <AdminRoute> <Details></Details></AdminRoute> 
     
      }
    ]
  },

  { path: '/all-trainer', element: <AllTrainer></AllTrainer> },
  { path: '/trainer-details/:id', element: <TrainnerDetails></TrainnerDetails> },
  { path: '/trainner-book/:id', element: <TrainnerBook></TrainnerBook> },
  // { path: "/beTrainner-fun", element: <BeTrainnerFun></BeTrainnerFun> },
  { path: "/be-trainner-page", element: <BeTrainnerPage2></BeTrainnerPage2> },
  { path: "/all-class",
     element: <AllClass></AllClass> ,
     loader :() => fetch('https://the-fitness-server.vercel.app/classCount')
    },
  {
    path: "/payment/:id",
    element: <PaymentPage></PaymentPage> 
   
  },

  { path: '/login', element: <Login /> },
  { path: '/signup', element: <SignUp /> },
]);

