import React from "react";
import "./NavigationItems.css";
import NavigationItem from "./NavigationItem/NavigationItem";

const NavigationItems = () => (
    <ul className="NavigationItems">
        <NavigationItem link="/" name="Burger Builder"/>
        <NavigationItem link="/orders" name="Checkout"/>
    </ul>
);

export default NavigationItems;