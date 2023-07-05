import React from "react";
import Header from "./headerimprouter";
import Home from "./loadmoreimprouter";
import Product from "./product_improuter";
import Item from "./itemspage_improuter";
import Buynow from "./buynowpage_imp_router";
import Login from "./login_improuter";
import Logout from "./logout_improuter";
import Cart from "./cart_improuter";
import Orders from "./orders_improuter";
import Pagenotfoundrouter from "./pagenotfoundrouter";
import { Routes, Route } from "react-router-dom";

function A() {
  return (
    <>
      
      <Routes>
        <Route path="/" element={<Header />}>
          <Route index element={<Home />} />
          <Route path="home" element={<Home />} />
          <Route path="item" element={<Item />} />
          <Route path="buynow" element={<Buynow />} />
          <Route path="login" element={<Login />} />
          <Route path="logout" element={<Logout />} />
          <Route path="cart" element={<Cart />} />
          <Route path="orders" element={<Orders />} />
          <Route path="/products/:products" element={<Product />} />
          <Route path="*" element={<Pagenotfoundrouter />} />
        </Route>
      </Routes>
    </>
  );
}
export default A;
