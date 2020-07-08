import React from "react";
import "./NavigationItems.css";
import NavigationItem from "./NavigationItem/NavigationItem";

const NavigationItems = (props) => (
    <ul className="NavigationItems">
        <NavigationItem link="/" name="Burger Builder"/>
        {props.isAuthenticated ?
            <div style={{display: "inline-flex",padding: "0"}}>
                <NavigationItem link="/orders" name="Checkout"/>
                <NavigationItem link="/logout" name="Logout"/>
            </div> :
            <NavigationItem link="/auth" name="Login"/>}
    </ul>
);

export default NavigationItems;