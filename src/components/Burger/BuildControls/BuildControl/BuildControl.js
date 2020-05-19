import React from "react";
import "./BuildControl.css";

const BuildControl = (props) => (
    <div className="BuildControl">
        <div>{props.totalPrice}</div>
        <div className="Label">{props.label}</div>
        <button className="Less" onClick={props.removed} disabled={props.disabled}>-</button>
        <button className="More" onClick={props.added}>+</button>
    </div>
);

export default BuildControl;