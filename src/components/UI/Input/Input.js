import React from "react";
import "./Input.css";

const Input = (props) => {
    let inputElement = null;
    let validationError = null;
    let classStyle = "InputElement";

    if(props.invalid && props.shouldValidate && props.touched){
        classStyle = "InputElement Invalid";
        validationError = <p>Please enter a valid {props.elementType}</p>;
    }

    switch (props.elementType) {
        case('input'):
            inputElement = <input className={classStyle} {...props.elementConfig} value={props.value} onChange={props.changed}/>;
            break;
        case('textArea'):
            inputElement = <textarea className={classStyle}  {...props.elementConfig} value={props.value} onChange={props.changed}/>;
            break;
        case('select'):
            inputElement = (
                <select className={classStyle}  value={props.value} onChange={props.changed}>
                    {props.elementConfig.options.map(option => (
                        <option key={option.value} value={option.value}>
                            {option.displayValue}
                        </option>
                    ))}
                </select>
            );
            break;
        default:
            inputElement = <input className={classStyle}  {...props.elementConfig} value={props.value} onChange={props.changed}/>;
            break;
    }

    return (
        <div className="Input">
            <label className="Label">{props.label}</label>
            {inputElement}
            {validationError}
        </div>
    );
};

export default Input;