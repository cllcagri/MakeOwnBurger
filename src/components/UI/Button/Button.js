import React from "react";
import "./Button.css";

const Button = (props) => {
    return (
        <button className={props.buttonType}
                disabled={props.disabled}
                onClick={props.clicked}>{props.children}</button>
    );

};

export default Button;