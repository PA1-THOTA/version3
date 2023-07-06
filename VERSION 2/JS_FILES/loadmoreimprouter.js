import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { usercontext } from "./usecontext_imp_router";

function A() {
  // ALL USESTATES
  var Symboll = "«";
  var Symbolr = "«";
  const {
    productcategory,
    setproductcategory,
    searchstate,
    setproductname,
    setsearchstate,
    fetched_tablenames,
    setfetched_tablenames,
  } = useContext(usercontext);
  // const [fetched_tablenames, setfetched_tablenames] = useState([]);
  const [load, setload] = useState(false);
  const [normalload, setnormalload] = useState(false);
  const [all, setall] = useState([]);
  const [empty, setempty] = useState(false);
  const [low, setlow] = useState(0);
  const [high, sethigh] = useState(8);
  const [error, seterror] = useState("false");
  const [sliders, setsliders] = useState([]);
  // const [kids,setkids]=useState([1,2,3,4,5,6])
  const [skeleton, setskeleton] = useState([
    [1, 2, 3, 4],
    [6, 7, 8, 9],
    [11, 12, 13,14],
    [16, 17, 18, 19],
    [21, 22, 23, 24],
    [11, 12, 13,14],
    [16, 17, 18, 19],
    [21, 22, 23, 24],
    [1, 2, 3, 4],
    [6, 7, 8, 9],
    [11, 12, 13,14],
    [16, 17, 18, 19],
    [21, 22, 23, 24],
    [11, 12, 13,14],
    [16, 17, 18, 19],
    [21, 22, 23, 24]
  ]);

  //ALL USEEFFECTS

  useEffect(() => {
    tablenames_fetching_function();
  }, []);

  useEffect(() => {
    function sliding() {
      var a = document.querySelector(".slidecontainer");
      var b = document.querySelector(".right");
      var s=document.body
      var d = setInterval(e, 2000);
      // var i=setTimeout(function(){},)
      b.onclick = function () {
        // console.log(window.innerWidth);
        // console.log(s.offsetWidth - s.clientWidth);
        a.scrollBy(window.innerWidth, 0);
      };
      var c = document.querySelector(".left");
      c.onclick = function () {
        a.scrollBy(-window.innerWidth, 0);
      };

      var f = document.querySelectorAll(".kids");

      function e() {
        var g = f[f.length - 1].getBoundingClientRect().left;
        var h = (5 / 100) * window.innerWidth;
        // console.log(g,h)
        if (g > h) {
          a.scrollBy(window.innerWidth, 0);
        } else if (g < h) {
          clearInterval(d);
          a.scrollTo(0, 0);
        }
      }
    }
    sliding();
    // return ()=>{
    //   sliding()
    // }
  }, [sliders]);

  //ALL URLS

  const tablenames_url =
    "https://pavanthota.000webhostapp.com/WEBSITE%20PHP%20FILES/tablenames.php";
  const category_names_url =
    "https://pavanthota.000webhostapp.com/WEBSITE%20PHP%20FILES/";

  // ALL FETCHING FUNCTIONS

  async function tablenames_fetching_function() {
    setload(true);
    seterror(false);
    await axios
      .post(
        tablenames_url,
        {
          tablename: "",
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        const main = response.data;
        setfetched_tablenames(response.data);
        var random = [];
        for (let c = 0; c < 6; c += 1) {
          let b = Math.floor(Math.random() * 41);
          while (random.includes(b)) {
            b = Math.floor(Math.random() * 41);
          }
          random.push(b);
        }
        console.log(random);
        var slidingElements = [];
        for (let indexElement of random) {
          slidingElements.push(response.data[indexElement].backgroundimage);
        }
        console.log(slidingElements);
        setsliders(slidingElements);
        var li = [];
        async function first9lists() {
          var start = low;
          var end = high;
          for (start; start <= end; start++) {
            await axios
              .post(
                category_names_url + response.data[start].tablename + ".php",
                {
                  tablename: response.data[start].tablename,
                },
                {
                  headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                  },
                }
              )
              .then((response) => {
                // console.log(main[start].backgroundimage,response.data);
                li.push([main[start].backgroundimage, response.data]);
              })
              .catch((error) => {
                seterror(true);
                console.log(error);
              });
          }
          // console.log(li)
          setall([...all, ...li]);
          setload(false);
          setlow(low + 9);
          sethigh(high + 9);
        }
        first9lists();
      })
      .catch((error) => {
        seterror(true);
        console.log(error);
      });
  }

  async function fetchingonclicking_function(low, high) {
    setnormalload(true);
    // console.log("pavan")
    // console.log(low,high)
    var li = [];
    var start = low;
    var end = high;
    // console.log(fetched_tablenames[start].tablename)
    for (start; start <= end; start++) {
      await axios
        .post(
          category_names_url + fetched_tablenames[start].tablename + ".php",
          {
            tablename: fetched_tablenames[start].tablename,
          },
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        )
        .then((response) => {
          //   console.log(response.data);
          li.push([fetched_tablenames[start].backgroundimage, response.data]);
        });
    }
    // console.log(li)
    setall([...all, ...li]);
    setnormalload(false);

    // console.log("pavan")
  }

  // ALL NORMAL FUNCTIONS

  const next9lists = () => {
    if (high + 9 < fetched_tablenames.length - 1) {
      fetchingonclicking_function(low, high);
      setlow(low + 9);
      sethigh(high + 9);
      //console.log("ifblock")
    } else if (high == fetched_tablenames.length - 1) {
      fetchingonclicking_function(low, high);
      sethigh(fetched_tablenames.length + 9);
      setempty(true);
      // console.log("elseifblock")
    } else if (high + 1 < fetched_tablenames.length - 1) {
      fetchingonclicking_function(low, high);
      setlow(low + 9);
      sethigh(fetched_tablenames.length - 1);
      // console.log("2ndelseblock")
    }
  };

  // MAIN COMPONENT

  return (
    <>
      {!sliders.length? (
        <div className="slidecontainer">
          <button className="left">{Symboll}</button>
          <div className="kids">1</div>
          <div className="kids">2</div>
          <div className="kids">3</div>
          <div className="kids">4</div>
          <div className="kids">5</div>
          <div className="kids">6</div>
          <button className="right">{Symbolr}</button>
        </div>
      ) : (
        <div className="slidecontainer">
          <button className="left">{Symboll}</button>
          {sliders.map((each, index) => {
            return (
              <div
                className="kids"
                style={{
                  overflow: "hidden",
                  backgroundImage: `url(${each})`,
                }}
                key={index}
              >
                {/* <img src={each} alt="" /> */}
              </div>
            );
          })}
          <button className="right">{Symbolr}</button>
        </div>
      )}

      {
      !error && 
      !
      all.length? (
        <>
          {/* <h1>loading....</h1> */}
          <div className="skeleton_categorys">
            {skeleton.map((each, index) => {
              return (
                <div className="skeleton_whole_container" key={index}>
                    <h2>HI</h2>
                <div key={index} className="skeleton_products_container">
                  {each.map((item, index) => (
                    <div className="skeleton_product" key={index}>
                      <div className="b" />
                      <div className="imgdiv" src={item} alt="product" />
                    </div>
                  ))}
                </div>
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <>
          <div className="skeleton_categorys" onClick={() => setsearchstate(0)}>
            {all.map((each, i) => {
              if((i+1)%9!=0){
                return (
                    <Link to={`/products/${each[1][1].categoryname}`}  className="skeleton_whole_container" key={i} onClick={() => {
                     
                      setproductname(each[1][1].categoryname);
                    }}>
                      <h2>{each[1][1].categoryname.toUpperCase()}</h2>
                      <div
                        className="skeleton_products_container"
                        style={{background: `url(${each[0]})`,/* backgroundAttachment: "fixed",*/backgroundSize: "cover",backgroundPosition: "center",
                        }}
                      >
                        {each[1].map((item, index) => {
                          if(index<4)
                          {
                            return (
                          <Link className="skeleton_product"
                            to="/item"
                            key={index}
                            onClick={() => setproductcategory(item)}
                          >
                              {/* <div className="b" /> */}
                              <img className="imgdiv" src={item.image} alt="product" />
                          </Link>)}
              })}
                      </div>
                      <h2>EXCITING OFFERS /-</h2>
                    </Link>
                )}else{
                  return (
                    <Link to={`/products/${each[1][1].categoryname}`}  className="skeleton_whole_container" key={i} onClick={() => {
                     
                      setproductname(each[1][1].categoryname);
                    }}>
                      <h2>{each[1][1].categoryname.toUpperCase()}</h2>
                      <div
                        className="skeleton_products_container"
                        style={{background: `url(${each[0]})`, backgroundAttachment: "fixed",backgroundSize: "cover",backgroundPosition: "center",
                        }}
                      >
                        {each[1].map((item, index) => {
                            return (
                          <Link className="skeleton_product"
                            to="/item"
                            key={index}
                            onClick={() => setproductcategory(item)}
                          >
                              {/* <div className="b" /> */}
                              <img className="imgdiv" src={item.image} alt="product" />
                          </Link>)
              })}
                      </div>
                    </Link>
                )
                }
            })}
          </div>
        </>
      )}
      {!error && !empty && normalload && (
        <h1 className="lastone">loading...</h1>
      )}
      {!error && empty && normalload && (
        <h1 className="lastone">loading...</h1>
      )}
      {!error && !empty && !normalload && !load && (
        <button className="lastsecond" onClick={next9lists}>
          <h1>LOAD MORE</h1>
        </button>
      )}
      {!error && empty && !normalload && (
        <h1 className="lastthird">YOU ARE ALL CAUGHT UP</h1>
      )}
      {error && (
        <div className="errorclass">
          <h1>SOMETHING WENT WRONG</h1>
          <h2>PLEASE try again</h2>
        </div>
      )}
    </>
  );
}
export default A;
