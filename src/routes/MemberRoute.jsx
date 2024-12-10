import { Navigate } from "react-router-dom";
import LoadingSpinner from "../components/Shared/LoadingSpinner";
import useRole from "../hooks/useRole";
import PropTypes from 'prop-types'

const MemberRoute = ({children}) => { 
    const [role , isLoading] = useRole() 
    console.log(role)
    if(isLoading) return <LoadingSpinner></LoadingSpinner> 
    if(role === "member") return children
    return  <Navigate to='/dashboard'></Navigate>
};
MemberRoute.propTypes = {
    children: PropTypes.element,
  }
export default MemberRoute;