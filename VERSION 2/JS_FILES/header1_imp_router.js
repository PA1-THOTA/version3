import React, { useState, useEffect, useContext } from "react";
import threelinesicon from "../IMAGE_FILES/threelinesicon.png";
import { NavLink, Link } from "react-router-dom";
import axios from "axios";
import { usercontext } from "./usecontext_imp_router";

// import { NavLink } from 'react-router-dom'

const Header1_imp = () => {
  const {
    productname,
    setproductname,
    fetched_tablenames,
    setfetched_tablenames,searchstate, setsearchstate,userdetails,setuserdetails
  } = useContext(usercontext);
  const [inputtextfield, setinputtextfield] = useState("");
  const [searchitem, setsearchitem] = useState("");
  // const [fetched_tablenames, setfetched_tablenames] = useState([]);
  const [filtered_tablenames, setfiltered_tablenames] = useState([]);
  // const [pricesfilter, setpricesfilter] = useState([]);
  // const [fetchedproducts, setfetchedproducts] = useState([]);
  // const [filt, setfilt] = useState({ backgroundimage: "", products: [] });
  // const [loginstate, setloginstate] = useState(0);
  // const [searchstate, setsearchstate] = useState(0);
  const [load, setload] = useState(false);
  console.log(userdetails)
  const tablenames_url =
    "https://pavanthota.000webhostapp.com/WEBSITE%20PHP%20FILES/tablenames.php";
  console.log(productname, setproductname);

  // style

  // useEffect(() => {
  //   tablenames_fetching_function();
  // }, []);

  // async function tablenames_fetching_function() {
  //   setload(true);
  //   await axios
  //     .post(
  //       tablenames_url,
  //       {
  //         tablename: "",
  //       },
  //       {
  //         headers: {
  //           "Content-Type": "application/x-www-form-urlencoded",
  //         },
  //       }
  //     )
  //     .then((response) => {
  //       setload(false);
  //       console.log(response.data);
  //       setfetched_tablenames(response.data);
  //     });
  // }

  const change = (e) => {
    setinputtextfield(e.target.value.toLowerCase());
    var d = fetched_tablenames.filter((each) => {
      return each.tablename.includes(e.target.value.toLowerCase());
    });
    setfiltered_tablenames(d);
  };

  const inputclick = (e) => {
    setinputtextfield(e.target.value);
    setsearchstate(1);
    var d = fetched_tablenames.filter((each) => {
      return each.tablename.includes(e.target.value);
    });
    setfiltered_tablenames(d);
  };

  const searchitemsfunction = (each) => {
    setsearchitem(each.tablename);
    setsearchstate(0);
    setinputtextfield(each.tablename);
  };

  function Search() {
    return (
      <>
        {inputtextfield.length ? (
          <div className="search">
            {filtered_tablenames.length ? (
              filtered_tablenames.map((each, index) => {
                return (
                  <Link to={`/products/${each.tablename}`} key={index}>
                    <button 
                      onClick={() => {
                        searchitemsfunction(each);
                        setproductname(each.tablename);
                      }}>
                      {each.tablename.slice(
                        0,
                        each.tablename.indexOf(inputtextfield)
                      )}
                      <b>{inputtextfield}</b>
                      {each.tablename.slice(
                        each.tablename.indexOf(inputtextfield) +
                          inputtextfield.length
                      )}
                    </button>
                  </Link>
                );
              })
            ) : (
              <div className="noresults">NO RESULTS FOUND</div>
            )}
          </div>
        ) : (
          <></>
        )}
      </>
    );
  }

  return (
    <div className="header1">
      <div className="header1element header1element1">PAVANzon</div>
      <div className="header1element header1element2">
        <input
          type="text"
          value={inputtextfield}
          onChange={(e) => change(e)}
          onClick={(e) => {
            inputclick(e);
          }}
          // onBlur={()=>{
          // setsearchstate(0)  }}
        />
      </div>
      {/* <div
        className="searchfield"
        style={{
          position: "fixed",
          width: "100%",
          zIndex: "10",
          backgroundColor: "orange",
        }}>
        <div>
          
        </div>
        <hr />
      </div> */}
      {searchstate ? <Search /> : <></>}

      <div className="header1elementnav header1element3">
        <NavLink id="link" to="/home">
          HOME
        </NavLink>
      </div>
      <div className="header1elementnav header1element4">
        {!userdetails[0].username?<NavLink id="link" to="/login">
          LOGIN
        </NavLink>:<NavLink id="link" to="/logout">
          LOGOUT
        </NavLink>}
      </div>
      <div className="header1elementnav header1element5">
        <NavLink id="link" to="/cart">
          CART
        </NavLink>
      </div>
      <div className="header1elementnav header1element6">
        <NavLink id="link" to="/orders">
          ORDERS
        </NavLink>
      </div>
      <div className="header1element threelines">
        <img src={threelinesicon} alt="" />
      </div>
    </div>
  );
};

export default Header1_imp;
