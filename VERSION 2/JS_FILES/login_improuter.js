import React, { useState,useContext } from "react";
import axios from "axios";
import { usercontext } from "./usecontext_imp_router";
function Login() {
  const {userdetails,setuserdetails}=useContext(usercontext)
  const [loginstate, setloginstate] = useState(false);
  const [loginsuccessful, setloginsuccessful] = useState(false);
  const [accountcreatestate, setaccountcreatestate] = useState(false);
  const [creating,setcreating]=useState(false)
  const [siginusername, setsigninusername] = useState("");
  const [signinemail, setsigninemail] = useState("");
  const [signinpassword, setsigninpassword] = useState("");
  const [loginemail, setloginemail] = useState("");
  const [loginpassword, setloginpassword] = useState("");
  
  console.log(userdetails)
  const loginstatechanger = () => {
    setloginstate(!loginstate);
  };
  const finduser=async()=>{
    if(!loginemail || !loginpassword){
      alert("enter required fields")
    }else{
    await axios
      .post(
        "https://pavanthota.000webhostapp.com/WEBSITE%20PHP%20FILES/loginauthentication.php",
        {
          email: loginemail,
          password: loginpassword,
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      )
      .then((response) => {console.log(response.data)
        if(response.data.length>0){
            setuserdetails(response.data)
            setloginsuccessful(true)
        }
      });}
  }

  // console.log(!siginusername)
  const usersinserting = async () => {
    if(!siginusername || !signinemail || !signinpassword){
      alert("enter required fields")
    }else{
      setcreating(true)
    await axios
      .post(
        "https://pavanthota.000webhostapp.com/WEBSITE%20PHP%20FILES/userdetails.php",
        {
          username: siginusername,
          email: signinemail,
          password: signinpassword,
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      )
      .then((response) => {
        setcreating(false)
        console.log(response.data);
        setaccountcreatestate(true)
      });}
  };
  // console.log(loginstate);
  return !loginstate ? (

    <div
      className="login"
      style={{
        transform: "translateX(-50%)",
        top: "20vh",
        left: "50%",
        position: "relative",
        width: "350px",
        height: "500px",
        backgroundColor: "grey",
        marginBottom: "50px",
      }}>
      <div className="loginhead" style={{ top: "5%", position: "relative" }}>
        <h1>LOG IN</h1>
        <hr />
      </div>
      <div style={{ top: "10%", position: "relative" }}>
        <h2>
          <label htmlFor="loginemail">email</label>
        </h2>
        <input type="email" id="loginemail" value={loginemail} onChange={(e)=>{setloginemail(e.target.value)}}/>
      </div>
      <div style={{ top: "20%", position: "relative" }}>
        <h2>
          <label htmlFor="loginpassword">password</label>
        </h2>
        <input type="password" id="loginpassword" value={loginpassword}  onChange={(e)=>{setloginpassword(e.target.value)}}/>
      </div>
      <div style={{ top: "30%", position: "relative" }}>
        {!loginsuccessful?<button style={{cursor:"pointer"}}>
          <h1 onClick={()=>{finduser()}}>LOG IN</h1>
        </button>:<h1>LOGIN SUCCESSFUL</h1>}
      </div>
      <div style={{ top: "40%", position: "relative" }}>
        <h2>
          <span style={{ color: "aqua", cursor: "pointer" }}>forgot</span>{" "}
         PASSWORD ?
        </h2>
      </div>
      <div style={{ top: "50%", position: "relative" }}>
        <h1>
          not a member ?{" "}
          <span
            style={{ color: "aqua", cursor: "pointer" }}
            onClick={loginstatechanger}>
            SIGN IN
          </span>
        </h1>
      </div>
    </div>
  ) : (
    <div
      className="signin"
      style={{
        transform: "translateX(-50%)",
        top: "20vh",
        left: "50%",
        position: "relative",
        width: "350px",
        height: "500px",
        backgroundColor: "grey",
        marginBottom: "50px",
      }}>
      <div className="signinhead" style={{ top: "5%", position: "relative" }}>
        <h1>SIGN IN</h1>
        <hr />
      </div>

      <div style={{ top: "10%", position: "relative" }}>
        <h2>
          <label htmlFor="siginusername">username</label>
        </h2>
        <input
          type="text"
          id="siginusername"
          value={siginusername}
          onChange={(e) => setsigninusername(e.target.value)}
        />
      </div>
      <div style={{ top: "20%", position: "relative" }}>
        <h2>
          <label htmlFor="signinemail">email</label>
        </h2>
        <input
          type="email"
          id="signinemail"
          value={signinemail}
          onChange={(e) => setsigninemail(e.target.value)}
        />
      </div>
      <div style={{ top: "30%", position: "relative" }}>
        <h2>
          <label htmlFor="signinpassword">password</label>
        </h2>
        <input
          type="password"
          id="signinpassword"
          value={signinpassword}
          onChange={(e) => setsigninpassword(e.target.value)}
        />
      </div>
      {!accountcreatestate ? (
        <>
          <div style={{ top: "40%", position: "relative" }}>
            <button style={{ color: "brown", cursor: "pointer" }}>
              <h1 onClick={usersinserting}>{!creating? <>CREATE ACCOUNT</>:<>creating... </>}</h1>
            </button>
          </div>
          <div style={{ top: "43%", position: "relative" }}>
            <h1>have an account ? </h1>
            <span style={{ color: "aqua", cursor: "pointer" }}>
              <h2 onClick={loginstatechanger}> LOG IN</h2>
            </span>
          </div>
        </>
      ) : (
        <>
          <div style={{ top: "40%", position: "relative" }}>
            <button style={{ color: "brown", cursor: "pointer" }}>
              <h1>ACCOUNT CREATED SUCCESSFULLY</h1>
            </button>
          </div>
          <div style={{ top: "43%", position: "relative" }}>
            <h1 onClick={()=>{loginstatechanger();setsigninusername("");setsigninemail("");setsigninpassword("");setaccountcreatestate(false)}}>
              LOGIN
              <span style={{ color: "aqua", cursor: "pointer" }}>HERE</span>
            </h1>
          </div>
        </>
      )}
    </div>
   
  );
}
export default Login;
