import React,{useContext} from 'react'
import { usercontext } from "./usecontext_imp_router";
import { useNavigate } from 'react-router-dom';

const Logout_improuter = () => {
    const {userdetails,setuserdetails}=useContext(usercontext)
    const navigate=useNavigate()
    const logout=()=>{
        setuserdetails([{
          cityname: "",
          country: "",
          email: "",
          password: "",
          phonenumber: "",
          pincode: "",
          streetname: "",
          username: "",
        }])
        navigate("/home")
    }

  return (
    <div className="logout">
          <h1>
        ARE YOU SURE YOU WANT TO LOGOUT ?
          </h1>
          <h2><button onClick={logout}>YES</button></h2>
        </div>
  )
}

export default Logout_improuter