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
import BeTrainnerFun from"../components/Button/TrainnerFun"
import BeTarainnerPage  from '../components/AllTrainer/BeTarainnerPage'
import PaymentPage from '../components/Payment/PaymentPage'
import DashBoardLayout from '../components/DashBoard/DashBoardLayout'

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
   {path : "/dashboard",
     element : <DashBoardLayout></DashBoardLayout>  ,
     children : [
      
     ]
  },
  { path: '/add-class', element: <AddNewClass></AddNewClass> },
  { path: '/all-trainer', element:<AllTrainer></AllTrainer> },
  { path: '/trainer-details/:id', element:<TrainnerDetails></TrainnerDetails> },
  { path: '/trainner-book/:id', element:<TrainnerBook></TrainnerBook> },
  {path: "/beTrainner-fun" , element: <BeTrainnerFun></BeTrainnerFun>},
  {path: "/be-trainner-page" , element: <BeTarainnerPage></BeTarainnerPage>},
  {path : "/payment/:id" , element :  <PaymentPage></PaymentPage>},
  { path: '/login', element: <Login /> },
  { path: '/signup', element: <SignUp /> },
]) ;
 
