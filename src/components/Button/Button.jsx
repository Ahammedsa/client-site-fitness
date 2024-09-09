import { useContext } from "react"
import { Link } from "react-router-dom"
import { AuthContext } from "../../providers/AuthProvider"


/* eslint-disable react/prop-types */
const Button = ({ slot, idx ,trainner }) => {
  const {indexNumberOFsolt  , setindexNumberOFsolt} = useContext(AuthContext)
  console.log(trainner)
  const handeSelect = (parame) => {
    setindexNumberOFsolt(parame)
    console.log(indexNumberOFsolt)
  }
  return (
    <div>
      <Link
        to={`/trainner-book/${trainner?._id}`}
        className='rounded-md text-center bg-lime-900 w-9/12 mx-auto'
        state={{ slot: slot, trainer: trainner }}
      >
       <button onClick={() => handeSelect(idx)}>{slot}</button>
      </Link>
    </div>
  )
}
export default Button
