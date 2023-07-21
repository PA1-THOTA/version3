import React from "react";
import ReactDOM from "react-dom/client";

// VERSION 2  START
           

            import VERSION2 from "./VERSION 2/JS_FILES/app_improuter";
            import { BrowserRouter } from "react-router-dom";
            import { Usecontext } from "./VERSION 2/JS_FILES/usecontext_imp_router";


            // css files

            import "./VERSION 2/CSS_FILES/index_imp.css";
            import "./VERSION 2/CSS_FILES/common_imp.css";
            import "./VERSION 2/CSS_FILES/header1_imp.css";
            import "./VERSION 2/CSS_FILES/header2_imp.css";
            import "./VERSION 2/CSS_FILES/home_imp.css";
            import "./VERSION 2/CSS_FILES/product_imp.css";
            import "./VERSION 2/CSS_FILES/buynowpage_imp.css";
            import "./VERSION 2/CSS_FILES/itemspage_imp.css";
            import "./VERSION 2/CSS_FILES/cart_imp.css";
            import "./VERSION 2/CSS_FILES/order_imp.css";
            import "./VERSION 2/CSS_FILES/login_imp.css";
            import "./VERSION 2/CSS_FILES/logout_imp.css";




            const root = ReactDOM.createRoot(document.getElementById("root"));
            root.render(
              <Usecontext>
                <BrowserRouter>
                  <VERSION2 />
                </BrowserRouter>
              </Usecontext>
            );
        


// VERSION 2 END 

