import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { usercontext } from "./usecontext_imp_router";

function A() {
  // ALL USESTATES
  var Symboll="<"
  var Symbolr=">"
  const {
    productcategory,
    setproductcategory,
    searchstate,
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
  const [high, sethigh] = useState(4);
  const [error, seterror] = useState("false");
  const [sliders,setsliders]=useState([]);
  // const [kids,setkids]=useState([1,2,3,4,5,6])
  const [skeleton, setskeleton] = useState([
    [1, 2, 3, 4, 5],
    [6, 7, 8, 9, 10],
    [11, 12, 13, 14, 15],
    [16, 17, 18, 19, 20],
    [21, 22, 23, 24, 25],
  ]);

  //ALL USEEFFECTS

  useEffect(()=>{
    tablenames_fetching_function();
  },[])

  useEffect(() => {
    function sliding(){
      var a = document.querySelector(".slidecontainer");
    var b = document.querySelector(".right");
    var d = setInterval(e, 2000);
    // var i=setTimeout(function(){},)
    b.onclick = function () {
      a.scrollBy(window.innerWidth - 13.5, 0);
    };
    var c = document.querySelector(".left");
    c.onclick = function () {
      a.scrollBy(-window.innerWidth + 13.5, 0);
    };

    var f = document.querySelectorAll(".kids");

    function e() {
      var g = f[f.length-1].getBoundingClientRect().left;
      var h = (5 / 100) * window.innerWidth;
      // console.log(g,h)
      if (g > h) {
        a.scrollBy(window.innerWidth - 13.5, 0);
       
      } else if (g < h) {
        clearInterval(d);
        a.scrollTo(0, 0);
      }
    }
    }
    sliding()
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
        var slidingElements=[]
        for (let indexElement of random){
            slidingElements.push(response.data[indexElement].backgroundimage)
        }
        console.log(slidingElements)
        setsliders(slidingElements)
        var li = [];
        async function first5lists() {
          var start = low;
          var end = high;
          for (start; start <= end; start++) {
            await axios
              .post(
                category_names_url + response.data[start].tablename + ".php",
                {
                  tablename:response.data[start].tablename,
                },
                {
                  headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                  },
                }
              )
              .then((response) => {
                // console.log(main[start].backgroundimage,response.data);
                li.push([main[start].backgroundimage,response.data]);
              }).catch((error)=>{seterror(true);console.log(error)});
          }
          // console.log(li)
          setall([...all, ...li]);
          setload(false);
          setlow(low + 5);
          sethigh(high + 5);
        }
        first5lists();
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

  const next5lists = () => {
    if (high + 5 < fetched_tablenames.length - 1) {
      fetchingonclicking_function(low, high);
      setlow(low + 5);
      sethigh(high + 5);
      //console.log("ifblock")
    } else if (high == fetched_tablenames.length - 1) {
      fetchingonclicking_function(low, high);
      sethigh(fetched_tablenames.length + 5);
      setempty(true);
      // console.log("elseifblock")
    } else if (high + 1 < fetched_tablenames.length - 1) {
      fetchingonclicking_function(low, high);
      setlow(low + 5);
      sethigh(fetched_tablenames.length - 1);
      // console.log("2ndelseblock")
    }
  };

  // MAIN COMPONENT
  
  return (
    <>
      {!sliders.length?
        <div className="slidecontainer">
            <button className="left">{Symboll}</button>
            <div className="kids">1</div>
            <div className="kids">2</div>
            <div className="kids">3</div>
            <div className="kids">4</div>
            <div className="kids">5</div>
            <div className="kids">6</div>
            <button className="right">{Symbolr}</button>
        </div>:
        <div className="slidecontainer">
            <button className="left">{Symboll}</button>
            {sliders.map((each,index)=>{
              return (
                <div className="kids" style={{overflow:"hidden",backgroundImage:`linear-gradient(0deg,rgba(255,255,255),rgba(255,255,255,0.5), rgb(255, 255, 255,0),rgb(255, 255, 255,0)),url(${each})`}} key={index}>
                    {/* <img src={each} alt="" /> */}
                </div>
              )
            })}
            <button className="right">{Symbolr}</button>
        </div>
      }

      {!error && !all.length ? (
        <>
          {/* <h1>loading....</h1> */}
          <div className="skeleton_categorys">
            {skeleton.map((each, index) => {
              return (
                <div key={index} className="skeleton_products_container">
                  {each.map((item, index) => (
                    <div className="skeleton_product" key={index}>
                      <div className="b" />
                      <div className="imgdiv" src={item} alt="product" />
                      <div className="h1div">{item}</div>
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <>
          <div className="homepage_categorys" onClick={() => setsearchstate(0)}>
            {all.map((each, i) => {
              return (
                <div key={i}>
                  <h1>{each[1][1].categoryname.toUpperCase()}</h1>
                  <div
                    className="homepage_products_container"
                    style={{
                      background: `url(${each[0]})`,
                      backgroundAttachment: "fixed",
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  >
                    {each[1].map((item, index) => (
                      <Link
                        to="/item"
                        key={index}
                        onClick={() => setproductcategory(item)}
                      >
                        <div className="homepage_product" key={index}>
                          <img src={item.image} alt="product" />
                          <h1 className="name">{item.itemname}</h1>
                          <h1> ₹ {item.price}</h1>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
      {!error && !empty && normalload && (
        <h1 className="lastone">loading...</h1>
      )}
      {!error && !empty && !normalload && !load && (
        <button className="lastsecond" onClick={next5lists}>
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
