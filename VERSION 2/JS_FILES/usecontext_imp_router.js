import React, { useState } from "react";

export const usercontext = React.createContext();
export const Usecontext = ({ children }) => {
  const [productname, setproductname] = useState("");
  const [fetched_tablenames, setfetched_tablenames] = useState([]);
  const [productcategory, setproductcategory] = useState([]);
  const [searchstate, setsearchstate] = useState(0);
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
      }}
    >
      {children}
    </usercontext.Provider>
  );
};
