import React, { useContext, useEffect, useState } from "react";
import { usercontext } from "./usecontext_imp_router";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CART = () => {
  const { userdetails, setuserdetails,setproductcategory} = useContext(usercontext);
  const [orderitems, setorderitems] = useState([]);
  const [load,setload]=useState(false)

  useEffect(() => {
    async function orderitemsfetchingfunction() {
      setload(true)
      console.log("pavan");
      await axios
        .post(
          "https://pavanthota.000webhostapp.com/WEBSITE%20PHP%20FILES/order%20items%20fetching.php",
          {
            username: userdetails[0].username,
            email: userdetails[0].email,
            password: userdetails[0].password,
          },
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        )
        .then((response) => {
          setload(false)
          console.log(response.data);
          setorderitems(response.data);
        });
    }
    orderitemsfetchingfunction();
  }, []);

  const navigate=useNavigate()

  return (
    <>
      {userdetails.length ? (
       !load?( orderitems.length ? (
            <div
            className="orderitemsproducts"
            style={{
            //   background: fetchedproducts.length
            //     ? `url(${filt.backgroundimage})`
            //     : "",
            //   backgroundAttachment: "fixed",
            //   backgroundSize: "cover",
            }}>
            {orderitems.map((each, index) => {
              return (
                <Link to="/item" key={index} onClick={()=>setproductcategory(each)}>
                <div
                  key={index}
                  style={{
                    width: "90%",
                    height: "300px",
                    border: "2px solid red",
                    backgroundColor: "rgb(72, 173, 207)",
                  }}>
                  <img
                    style={{
                      height: "70%",
                      width: "100%",
                      objectFit: "contain",
                    }}
                    src={each.image}
                    alt=""
                  />
                     <h1 className="name">{each.itemname}</h1>
                  <h1>Price :- ₹ {each.price}</h1>
                </div>
                </Link>
              );
            })}
          </div>
        )
        : 
        (
          <div className="cart" style={{ position: "relative", top: "200px" }}>
            <h1>YOU HAVEN'T ORDERED ANYTHING <span style={{color:"green",border:"2px solid",cursor:"pointer"}} onClick={()=>navigate("/")}>EXPLORE</span></h1>
          </div>
        )
      ) :<h1 style={{position:"relative",top:"200px"}}>LOADING . . . . </h1>)
      :
      (
        <div style={{ position: "relative", top: "200px" }}>
          <h1>
            <span>
              <Link to="/login">LOGIN</Link>
            </span>{" "}
            TO VIEW YOUR ORDERS
          </h1>
        </div>
      )}
    </>
  );
};

export default CART;
