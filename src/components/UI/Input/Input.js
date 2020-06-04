import React from "react";
import "./Input.css";

const Input = (props) => {
    let inputElement = null;

    switch (props.elementType) {
        case('input'):
            inputElement = <input className="InputElement" {...props.elementConfig} value={props.value}/>;
            break;
        case('textArea'):
            inputElement = <textarea className="InputElement" {...props.elementConfig}/>;
            break;
        case('select'):
            inputElement = (
                <select className="InputElement" {...props.elementConfig}>
                    <option value={props.elementConfig.option[0].value}>{props.elementConfig.option[0].value}</option>
                    <option value={props.elementConfig.option[1].value}>{props.elementConfig.option[1].value}</option>
                </select>
            );
            break;
        default:
            inputElement = <input className="InputElement" {...props.elementConfig}/>;
            break;
    }

    return (
        <div className="Input">
            <label className="Label">{props.label}</label>
            {inputElement}
        </div>
    );
};

export default Input;