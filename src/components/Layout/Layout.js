import React from "react";
import Aux from "../../hoc/Aux";
import "./Layout.css";

const Layout = (props) => {
  return(
    <Aux>
        <div>Toolbar, sideDrawer, Backdrop</div>
        <main className="Content">
            {props.children}
        </main>
    </Aux>
)};

export default Layout;