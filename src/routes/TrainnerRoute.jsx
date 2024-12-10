import { Navigate } from "react-router-dom";
import LoadingSpinner from "../components/Shared/LoadingSpinner";
import useRole from "../hooks/useRole";
import PropTypes from 'prop-types'

const TrainnerRoute = ({children}) => { 
    const [role , isLoading] = useRole() 
    console.log(role)
    if(isLoading) return <LoadingSpinner></LoadingSpinner> 
    if(role === "trainer") return children
    return  <Navigate to='/dashboard'></Navigate>
};
TrainnerRoute.propTypes = {
    children: PropTypes.element,
  }
export default TrainnerRoute;