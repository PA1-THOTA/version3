import React from 'react'
import { useNavigate } from 'react-router-dom'

const Pagenotfoundrouter = () => {
    const navigate=useNavigate()
  return (
    <div style={{position:"relative",top:"200px"}}>
    <h1>PAGE NOT FOUND</h1>
    <button style={{marginTop:"10px",height:"50px",padding:"10px",backgroundColor:"aqua",fontWeight:"bold"}} onClick={()=>navigate("/")}>BACK TO HOME</button>
    </div>)
}

export default Pagenotfoundrouter