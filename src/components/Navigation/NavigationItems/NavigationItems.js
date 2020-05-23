import React from "react";
import "./NavigationItems.css";
import NavigationItem from "./NavigationItem/NavigationItem";

const NavigationItems = () => (
    <ul className="NavigationItems">
        <NavigationItem active="true" link="/" name="Burger Builder"/>
        <NavigationItem link="/checkout" name="Checkout"/>
    </ul>
);

export default NavigationItems;