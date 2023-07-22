import React, { useContext, useEffect, useState } from "react";
import { usercontext } from "./usecontext_imp_router";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CART = () => {
  const { userdetails, setuserdetails, setproductcategory } =
    useContext(usercontext);
  const [cartitems, setcartitems] = useState([]);
  const [load, setload] = useState(false);

  useEffect(() => {
    async function cartitemsfetchingfunction() {
      setload(true);
      console.log("pavan");
      await axios
        .post(
          "https://pavanthota.000webhostapp.com/WEBSITE%20PHP%20FILES/cart%20items%20fetching.php",
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
          setload(false);
          console.log(response.data);
          setcartitems(response.data);
        });
    }
    cartitemsfetchingfunction();
  }, []);

  const navigate = useNavigate();

  const remove = async (each) => {
    console.log(each);
    setload(true);
    await axios
      .post(
        "https://pavanthota.000webhostapp.com/WEBSITE%20PHP%20FILES/cart%20items%20deleting.php",
        {
          id: each.id,
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      )
      .then((response) => {
        setload(false);
        console.log(response.data);
        const l = cartitems.filter((e) => each.id != e.id);
        setcartitems(l);
      });
  };

  return (
    <>
      {userdetails[0].username ? (
        !load ? (
          cartitems.length ? (
            <div
              className="cartitemsproducts carting"
            >
              {cartitems.map((each, index) => {
                return (
                  <div key={index}>
                    <Link
                      to="/item"
                      key={index}
                      onClick={() => setproductcategory(each)}
                    >
                      <img src={each.image} alt="" />
                      <h1 className="name">{each.itemname}</h1>
                      <h1>Price :- ₹ {each.price}</h1>
                    </Link>
                    <button onClick={() => remove(each)}>
                      REMOVE FROM CART
                    </button>
                  </div>
                );
              })}
            </div>
          ) : (
            <div
              className="cart carting"
              style={{ position: "relative", top: "200px" }}
            >
              <h1>
                YOUR CART IS EMPTY{" "}
                <span
                  style={{
                    color: "green",
                    border: "2px solid",
                    cursor: "pointer",
                  }}
                  onClick={() => navigate("/")}
                >
                  EXPLORE
                </span>
              </h1>
            </div>
          )
        ) : (
          <div className="carting"><h1 style={{ position: "relative", top: "200px" }}>
            LOADING . . . .{" "}
          </h1></div>
        )
      ) : (
        <div className="carting" style={{ position: "relative", top: "200px" }}>
          <h1>
            <span>
              <Link to="/login">LOGIN</Link>
            </span>{" "}
            TO VIEW YOUR CART
          </h1>
        </div>
      )}
    </>
  );
};

export default CART;
