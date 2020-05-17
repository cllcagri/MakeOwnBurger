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
        {control.map(ctrl => (
            <BuildControl label={ctrl.label} key={ctrl.type} added={() => props.ingredientAdded(ctrl.type)}
                          type={ctrl.type} removed={() => props.ingredientRemove(ctrl.type)}
                          disabled={props.disableControl[ctrl.type]}/>
        ))}

    </div>
);

export default BuildControls;