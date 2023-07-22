import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { usercontext } from "./usecontext_imp_router";
import { Link } from "react-router-dom";

const Productrouterimp = () => {
  const {
    productname,
    setproductname,
    fetched_tablenames,
    productcategory,
    setproductcategory,recentlyvisited
  } = useContext(usercontext);

  const { products } = useParams();
  console.log(products);
  const [inputtextfield, setinputtextfield] = useState("");
  const [searchitem, setsearchitem] = useState(productname);
  const [pricesfilter, setpricesfilter] = useState([]);
  const [fetchedproducts, setfetchedproducts] = useState([]);
  const [filt, setfilt] = useState({ backgroundimage: "", products: [] });
  const [searchstate, setsearchstate] = useState(0);
  const [load, setload] = useState(false);

  useEffect(() => {
    productname && products_fetching_function();
  }, [productname]);

  console.log(productname);

  const category_names_url =
    "https://pavanthota.000webhostapp.com/WEBSITE%20PHP%20FILES/";

  const products_fetching_function = async () => {
    setload(true);
    await axios
      .post(
        category_names_url + productname + ".php",
        {
          tablename: productname,
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      )
      .then((response) => {
        const n = response.data;
        const backgroundimagesearch = fetched_tablenames.filter(
          (each) => each.tablename == productname
        );
        console.log(backgroundimagesearch[0].backgroundimage);
        setfilt({
          backgroundimage: backgroundimagesearch[0].backgroundimage,
          products: response.data,
        });
        setfetchedproducts(response.data);
        setload(false);
        const pricefilter = [];
        const differentpricelist = n.map((each) => {
          return each.price;
        });
        console.log(differentpricelist);
        for (var d of differentpricelist) {
          if (!pricefilter.includes(d)) {
            pricefilter.push(d);
          }
        }
        pricefilter.sort((x, y) => {
          return x - y;
        });
        productname.length && setpricesfilter(["ALL", ...pricefilter]);
      });
  };

  const pricefilterer = (low, high) => {
    var filtered = fetchedproducts.filter(
      (each) =>
        Number(each.price) >= Number(low) && Number(each.price) <= Number(high)
    );
    setfilt({ ...filt, products: filtered });
  };

  const searchitemsfunction = (each) => {
    setsearchitem(each.tablename);
    setsearchstate(0);
    setinputtextfield(each.tablename);
  };

  function Prices() {
    return (
      <div className="prices">
        <h2 className="pricefilterhead">PRICE FILTER</h2>
        <hr />
        {pricesfilter.map((each, index, array) => {
          if (index == 0) {
            return (
              <>
                <h2
                  key={index}
                  onClick={() =>
                    pricefilterer(array[1], array[array.length - 1])
                  }
                >
                  {array[index]}
                </h2>
                <hr />
              </>
            );
          } else if (index + 1 < array.length) {
            return (
              <>
                <h2
                  onClick={() => pricefilterer(array[index], array[index + 1])}
                  key={index}
                >
                  {array[index]}-{array[index + 1]}
                </h2>
                <hr />
              </>
            );
          } else {
            return (
              <>
                <h2
                  onClick={() =>
                    pricefilterer(array[index], array[index] + 1000)
                  }
                  key={index}
                >
                  {array[index]}-ABOVE
                </h2>
                <hr />
              </>
            );
          }
        })}
      </div>
    );
  }

  function PRODUCTS() {
    return (
      <>
        {
          <div
            className="products"
            style={{
              background: fetchedproducts.length
                ? `url(${filt.backgroundimage})`
                : "",
              backgroundAttachment: "fixed",
              backgroundSize: "cover",
              backgroundPosition:"center"
            }}
          >
            {filt.products.map((each, index) => {
              return (
                <Link
                  to="/item"
                  key={index}
                  onClick={() => {setproductcategory(each);recentlyvisited(
                    each.categoryname,
                    each.itemname,
                    each.price,
                    each.image,
                    each.des
                  );}}
                >
                  <div className="firstdiv" key={index}>
                    <img src={each.image} alt="" />
                    <hr />
                    <h1 className="name">{each.itemname}</h1>
                    <h1>Price :- ₹ {each.price}</h1>
                  </div>
                </Link>
              );
            })}
          </div>
        }
      </>
    );
  }

  return (
    <div className="productspage">
      {load ? (
        <div
          className="loading"
          style={{
            background: `url("https://images.unsplash.com/photo-1580793241553-e9f1cce181af?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1032&q=80")`,
            backgroundAttachment: "fixed",
            backgroundSize: "cover",
          }}
        >
          <h1 className="loadingtext">loading...</h1>
        </div>
      ) : (
        <>
          <Prices />
          <PRODUCTS />
        </>
      )}
    </div>
  );
};

export default Productrouterimp;
