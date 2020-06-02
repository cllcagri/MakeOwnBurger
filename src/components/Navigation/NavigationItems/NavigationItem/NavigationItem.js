import React from "react";
import "./NavigationItem.css";
import {NavLink} from "react-router-dom";

const NavigationItem = (props) => {
    return (
        <li className="NavigationItem">
            <NavLink exact  activeClassName="active"
                to={props.link}>{props.name}</NavLink>
        </li>
    );

};

export default NavigationItem;