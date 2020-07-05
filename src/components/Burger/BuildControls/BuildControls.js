import React from "react";
import BuildControl from "./BuildControl/BuildControl";
import "./BuildControls.css";

const control = [
    {label: 'Salad', type: 'salad'},
    {label: 'Meat', type: 'meat'},
    {label: 'Bacon', type: 'bacon'},
    {label: 'Cheese', type: 'cheese'}
];


const BuildControls = (props) => (
    <div className="BuildControls">
        <p>Current Price: <strong>{props.price.toFixed(2)} TL </strong></p>
        {control.map(ctrl => (
            <BuildControl label={ctrl.label} key={ctrl.type} added={() => props.ingredientAdded(ctrl.type)}
                          type={ctrl.type} removed={() => props.ingredientRemove(ctrl.type)}
                          disabled={props.disableControl[ctrl.type]}/>
        ))}
        <button className="OrderButton" onClick={props.ordered} disabled={!props.purchasable}>{props.isAuth ? 'ORDER NOW': 'SIGN UP TO ORDER'}</button>
    </div>
);

export default BuildControls;