import React, { useState, useEffect, useContext } from "react";
import threelinesicon from "../IMAGE_FILES/threelinesicon.png";
import { NavLink, Link } from "react-router-dom";
import axios from "axios";
import { usercontext } from "./usecontext_imp_router";

const Header1_imp = () => {
  const {
    productname,
    setproductname,
    fetched_tablenames,
    setfetched_tablenames,searchstate, setsearchstate,userdetails,setuserdetails,searchhistory
  } = useContext(usercontext);
  const [inputtextfield, setinputtextfield] = useState("");
  const [searchitem, setsearchitem] = useState("");
  const [historystate,sethistorystate]=useState(0)
  const [filtered_tablenames, setfiltered_tablenames] = useState([]);
  const [load, setload] = useState(false);
  const tablenames_url =
    "https://pavanthota.000webhostapp.com/WEBSITE%20PHP%20FILES/tablenames.php";



 
  const change = (e) => {
    if(e.target.value.length>0){
      sethistorystate(0);
    }else{
      sethistorystate(1)
    }
    {setinputtextfield(e.target.value.toLowerCase());
    var d = fetched_tablenames.filter((each) => {
      return each.tablename.includes(e.target.value.toLowerCase());
    });
    setfiltered_tablenames(d);}
  };

  const inputclick = (e) => {
    console.log("it is clicked zyx")
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

  const searchitemsfunction2 = (each) => {
    setsearchitem(each);
    setsearchstate(0);
    setinputtextfield(each);
  }; 

  const searchhistoryadding = async (searchhistory) => {
    if (userdetails[0].username.length != 0) {
      console.log(searchhistory);
      await axios
        .post(
          "https://pavanthota.000webhostapp.com/WEBSITE%20PHP%20FILES/searchhistory%20adding.php",
          {
            username: userdetails[0].username,
            email: userdetails[0].email,
            password: userdetails[0].password,
            searchhistory:searchhistory
          },
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        )
    }
  };
   
  function Searchhistory(){
    if(searchhistory.length){return (<div className="searchhistory">
      <button style={{fontWeight:"bold"}}>SEARCH HISTORY</button>
      {searchhistory.map((each,index)=>{
        return (
          <Link to={`/products/${each}`} key={index}>
            <button 
              onClick={() => {
                searchitemsfunction2(each);
                setproductname(each);
              }}>{each}
            </button>
          </Link>
        )
      })}
    </div>)}
    else{
      return <></>
    }
  }

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
                        searchhistoryadding(each.tablename)
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
            inputtextfield.length?sethistorystate(0):sethistorystate(1)
          }}
          onBlur={()=>sethistorystate(0)}
          placeholder="SEARCH HERE"
        />
      </div>
      {searchstate ?<Search />: <></>}
      {historystate?<Searchhistory/>:<></>}

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
        <div className="dropdown" >
        {!userdetails[0].username?<NavLink  id="link" to="/login">
          LOGIN
        </NavLink>:<NavLink  id="link" to="/logout">
          LOGOUT
        </NavLink>}
        <NavLink  id="link" to="/cart">
          CART
        </NavLink>
        <NavLink  id="link" to="/orders">
          ORDERS
        </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Header1_imp;
