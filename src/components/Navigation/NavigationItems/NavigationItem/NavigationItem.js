import React from "react";
import "./NavigationItem.css";

const NavigationItem = (props) => {
    let activeStyle;
    if(props.active){
        activeStyle = "active";
    }
    return (
        <li className="NavigationItem">
            <a className={activeStyle}
               href={props.link}>{props.name}</a>
        </li>
    );

};

export default NavigationItem;