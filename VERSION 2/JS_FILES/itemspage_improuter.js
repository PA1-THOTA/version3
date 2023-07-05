import React, { useState } from "react";
import { usercontext } from "./usecontext_imp_router";
import { useContext } from "react";
import { Link,useNavigate } from "react-router-dom";
import axios from "axios";

function A() {
  const {productcategory,userdetails,setuserdetails}=useContext(usercontext)
  const [addedtocart,setaddedtocart]=useState(false)
  console.log(productcategory,userdetails)
  const navigate=useNavigate()

  const image = "https://m.media-amazon.com/images/I/61jQim6YPnL._SL1500_.jpg";
  const first = () => {
    const b = document.querySelector(".displayimage");
    b.style.width = "200%";
    b.style.height = "auto";
    b.style.top = "0%";
    b.style.left = "0%";
    b.style.right = "auto";
    b.style.bottom = "auto";
    console.log("first");
  };
  const second = () => {
    const b = document.querySelector(".displayimage");
    b.style.width = "200%";
    b.style.height = "auto";
    b.style.bottom = "0%";
    b.style.left = "0%";
    b.style.top = "auto";
    b.style.right = "auto";
    console.log("second");
  };
  const third = () => {
    const b = document.querySelector(".displayimage");
    b.style.width = "200%";
    b.style.height = "auto";
    b.style.top = "0%";
    b.style.right = "0%";
    b.style.bottom = "auto";
    b.style.left = "auto";
    console.log("third");
  };
  const fourth = () => {
    const b = document.querySelector(".displayimage");
    b.style.width = "200%";
    b.style.height = "auto";
    b.style.bottom = "0%";
    b.style.right = "0%";
    b.style.top = "auto";
    b.style.left = "auto";
    console.log("fourth");
  };
  const fifth = () => {
    const b = document.querySelector(".displayimage");
    b.style.width = "100%";
    b.style.height = "100%";
    console.log("fifth");
  };


  const addtocart=async()=>{
    if(userdetails.length==0){
           alert("YOU HAVE TO LOGIN FIRST....!")
    }else{
    console.log("pavan")
    await axios
    .post(
      "https://pavanthota.000webhostapp.com/WEBSITE%20PHP%20FILES/cart%20items.php",
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
        setaddedtocart(true)
    })
  };
  }

  const buynow=()=>{
    if(userdetails.length==0){
           alert("YOU HAVE TO LOGIN FIRST....!")
    }else{
      navigate("/buynow")
    }
  }

  return (
    <div className="itemspage">
      <div className="totalcontainer">
        <div className="imagescontainercontainer">
          <div className="imagescontainer">
            <div className="sideimages">
              <div className="img1">
                <img onClick={first} className="image1" src={productcategory.image} alt="" />
              </div>
              <div className="img2">
                <img onClick={second} className="image2" src={productcategory.image} alt="" />
              </div>
              <div className="img3">
                <img onClick={third} className="image3" src={productcategory.image} alt="" />
              </div>
              <div className="img4">
                <img onClick={fourth} className="image4" src={productcategory.image} alt="" />
              </div>
              <div className="img5">
                <img onClick={fifth} className="image5" src={productcategory.image} alt="" />
              </div>
            </div>
            <div className="mainimage">
              <div className="mainimg">
                <img className="displayimage" src={productcategory.image} alt="" />
              </div>
            </div>
          </div>
        </div>
        <div className="contentcontainer">
          <div className="name">
            <h1 style={{padding:"10px"}}>
              {productcategory.itemname}
            </h1>
          </div>
          <div className="price">
            <h1  style={{padding:"10px"}}>PRICE :- ₹{productcategory.price}</h1>
          </div>
          <div className="desc">
            <h3  style={{padding:"10px"}}>
              DESCRIPTION :- {productcategory.des}
            </h3>
          </div>
        </div>
      </div>
      <div className="buynow">
      <button onClick={buynow}>BUY NOW</button>
      </div>
      <div className="addtocart">
        {!addedtocart?<button onClick={addtocart}>ADD TO CART</button>:<button>ADDED</button>}
      </div>
    </div>
  );
}
export default A;
