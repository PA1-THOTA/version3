import React,{useContext} from 'react'
import { usercontext } from "./usecontext_imp_router";
import { useNavigate } from 'react-router-dom';

const Logout_improuter = () => {
    const {userdetails,setuserdetails}=useContext(usercontext)
    const navigate=useNavigate()
    const logout=()=>{
        setuserdetails([])
        navigate("/home")
    }

  return (
    <div className="logout" style={{ position: "relative", top: "200px" }}>
          <h1>
        ARE YOU SURE YOU WANT TO LOGOUT ?
          </h1>
          <h2><button onClick={logout} style={{padding:"10px"}}>YES</button></h2>
        </div>
  )
}

export default Logout_improuter