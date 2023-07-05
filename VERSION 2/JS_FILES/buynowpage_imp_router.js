import React, { useState } from "react";
import { usercontext } from "./usecontext_imp_router";
import { useContext } from "react";
import axios from "axios";

// import CSS FILE FROM CSS_IMP FOLDER

function A() {
  const image = "https://m.media-amazon.com/images/I/61MLj+sfjrL._SX425_.jpg";
  const name =
    '"boAt Flash Edition Smart Watch with Activity Tracker, Multiple Sports Modes, 1.3" Screen, 170+ Watch Faces, Sleep Monitor, Gesture, Camera & Music Control, IP68 & 7 Days Battery Life(Lightning Black)"';
    const {productcategory,userdetails}=useContext(usercontext)
    const [address,setaddress]=useState(userdetails[0])
    const [load,setload]=useState(false)
    const [save,setsave]=useState(false)
    const [paynowstate,setpaynowstate]=useState(false)
    const [cash,setcash]=useState(false)
    const [upi,setupi]=useState("")
    const [payingload,setpayload]=useState(false)

  console.log(address)

  const saveaddress=async ()=>{
    if(!address.cityname || !address.country || !address.phonenumber || !address.pincode || !address.streetname){
        alert("PLEASE ENTER REQUIRED FIELDS")
    }
    else{
      setload(true)
     await axios
      .post(
        "https://pavanthota.000webhostapp.com/WEBSITE%20PHP%20FILES/useraddressupdating.php",
        {
 
         username: address.username ,
         email: address.email ,
         password: address.password ,
         cityname: address.cityname ,
         country : address.country ,
         phonenumber :address.phonenumber ,
         pincode : address.pincode ,
         streetname :address.streetname
          
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      )
      .then((response) => {
        setload(false)
        setsave(true)
        console.log(response.data)
      }).catch(error=>console.log(error));
    }
  }

  const paynow=()=>{
    if(!address.cityname || !address.country || !address.phonenumber || !address.pincode || !address.streetname){
      alert("PLEASE ENTER REQUIRED FIELDS")
  }else{
    setpaynowstate(true)
  }

  }


  const payment=()=>{
    console.log(upi,cash)
    if(!upi && !cash){
      alert("PLEASE SELECT PAYMENT METHOD")
    }
    else if(upi.length<10 && !cash ){
      alert("PLEASE ENTER VALID UPI PIN")
    }
    else{
      axios
    .post(
      "https://pavanthota.000webhostapp.com/WEBSITE%20PHP%20FILES/order%20items.php",
      {
        username:userdetails[0].username,
        email:userdetails[0].email,
        password:userdetails[0].password,
        categoryname:productcategory.categoryname,
        itemname:productcategory.itemname,
        price	:productcategory.price,
        image:productcategory.image,
        des:productcategory.des
      },
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    )
    .then((response) => {console.log(response.data);
      setpayload(true)
    })
    }
  }
  

  function PAYNOW(){
    return (
      <div className="paynowcontainer" style={{width:"100%",height:"100vh",position:"fixed",top:"0px",backgroundColor:" rgb(52, 52, 52)"}}>
     
     <div className="paynow" style={{width:"300px",height:"300px",border:"5px solid black",position:"absolute",left:"50%",top:"50%",transform:"translate(-50%,-50%)"}}>
         <h1 style={{color:"white"}}>PAY USING</h1>
         <hr />
         <br />
         <h2 style={{color:"white"}}>UPI </h2>
         <input onChange={(e)=>setupi(e.target.value)} value={upi} type="text" placeholder="ENTER UPI ID"/>
         <br />
         <br />
         <button>{cash?<h2 onClick={()=>setcash(!cash)} style={{color:"white",backgroundColor:"green"}}>CASH ON DELIVERY</h2>:<h2 onClick={()=>setcash(!cash)}>CASH ON DELIVERY</h2>}</button>
         <br />
         <br />
         <br />
         <br />
         {!payingload?<button style={{cursor:"pointer"}}><h1 onClick={()=>payment()}>PAY NOW</h1></button>:<button><h1>PROCESSED</h1></button>}
         <div onClick={()=>{setpaynowstate(false);setpayload(false)}} style={{width:"40px",height:"40px",position:"absolute",top:"-20px",right:"-20px",fontSize:"30px",color:"red",border:"2px solid",borderRadius:"50%",cursor:"pointer"}}>X</div>
     </div>
    </div>
    )
  }


    return (
      <>
    <div className="buynowpagecontainer">
      <div className="productcontainer">
        <img className="image" src={productcategory.image} alt="" />
        <h1 className="name">
         {productcategory.itemname}</h1>
        <h1 className="price">Price :- ₹ {productcategory.price}</h1>
      </div>

      <div className="address">
        <h1>ADDRESS : -</h1>
        <div className="inputfields">
          <label htmlFor="street name">
            <h2>street name : - </h2>
          </label>
          <input type="text" value={address.streetname} onChange={(e)=>{
            setaddress({...address,streetname:e.target.value})
          }} id="street name" />
        </div>
        <div className="inputfields">
          <label htmlFor="pincode">
            <h2>pincode : - </h2>
          </label>
          <input type="text"value={address.pincode} onChange={(e)=>{
            setaddress({...address,pincode:e.target.value})
          }}   id="pincode" />
        </div>
        <div className="inputfields">
          <label htmlFor="city name">
            <h2>city name : - </h2>
          </label>
          <input type="text"value={address.cityname} onChange={(e)=>{
            setaddress({...address,cityname:e.target.value})
          }}   id="city name" />
        </div>
        <div className="inputfields">
          <label htmlFor="country">
            <h2>country : - </h2>
          </label>
          <input type="text"value={address.country} onChange={(e)=>{
            setaddress({...address,country:e.target.value})
          }}   id="country" />
        </div>
        <div className="inputfields">
          <label htmlFor="phone number">
            <h2>phone number : - </h2>
          </label>
          <input type="text"value={address.phonenumber} onChange={(e)=>{
            setaddress({...address,phonenumber:e.target.value})
          }}   id="phone number" />
        </div>
      </div>
      <div className="buttons">
        <button onClick={saveaddress}>{!save?!load?<h1>SAVE ADDRESS</h1>:<h1>SAVING....</h1>:<h1>ADDRESS SAVED</h1>}</button>
        
        <button onClick={paynow}><h1>PAY NOW</h1></button>
      </div>
    </div>
    {paynowstate?<PAYNOW/>:<></>}
    </>
  );
}
export default A;
