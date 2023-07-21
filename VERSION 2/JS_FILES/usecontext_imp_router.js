import React, { useState } from "react";
import axios from "axios";

export const usercontext = React.createContext();
export const Usecontext = ({ children }) => {
  const [productname, setproductname] = useState("");
  const [fetched_tablenames, setfetched_tablenames] = useState([]);
  const [productcategory, setproductcategory] = useState([]);
  const [searchstate, setsearchstate] = useState(0);
  const [searchhistory, setsearchhistory] = useState([]);
  const [recentlyvisitedproducts, setrecentlyvisitedproducts] = useState([]);
  const [userdetails, setuserdetails] = useState([
    {
      cityname: "",
      country: "",
      email: "",
      password: "",
      phonenumber: "",
      pincode: "",
      streetname: "",
      username: "",
    },
  ]);
  const recentlyvisited = async (categoryname,
   itemname,
    price,
    image,
    des,) => {
    if (userdetails[0].username.length != 0) {
      
      await axios
        .post(
          "https://pavanthota.000webhostapp.com/WEBSITE%20PHP%20FILES/recentlyvisited%20adding.php",
          {
            username: userdetails[0].username,
            email: userdetails[0].email,
            password: userdetails[0].password,
            categoryname: categoryname,
            itemname: itemname,
            price: price,
            image: image,
            des: des,
          },
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        )
        .then((response) => {
          console.log(response.data);
        });
    }
  };

  return (
    <usercontext.Provider
      value={{
        productname,
        setproductname,
        fetched_tablenames,
        setfetched_tablenames,
        productcategory,
        setproductcategory,
        searchstate,
        setsearchstate,
        userdetails,
        setuserdetails,
        searchhistory,
        setsearchhistory,
        recentlyvisited,recentlyvisitedproducts,setrecentlyvisitedproducts
      }}
    >
      {children}
    </usercontext.Provider>
  );
};
