import React from "react";
import "./NavigationItems.css";
import NavigationItem from "./NavigationItem/NavigationItem";

const NavigationItems = (props) => (
    <ul className="NavigationItems">
        <NavigationItem link="/" name="Burger Builder"/>
        <NavigationItem link="/orders" name="Checkout"/>
        {props.isAuthenticated ? <NavigationItem link="/logout" name="Logout"/> :
            <NavigationItem link="/auth" name="Login"/>}
    </ul>
);

export default NavigationItems;