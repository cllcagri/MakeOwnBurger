import React from "react";
import "./Order.css";

const Order = (props) => {
    debugger;
    const ingOrder = Object.keys(props.ingredients)
        .map(igKey => {
            return <a key={igKey}><span
                style={{textTransform: 'capitalize'}}>{igKey}: {props.ingredients[igKey]}<br/></span></a>
        });

    return (
        <div className="Order">
            <h4>YOUR BURGER ORDER </h4>
            {ingOrder}
            <p>Price : <strong>{Number.parseFloat(props.price).toFixed(2)}</strong></p>
        </div>
    );
};

export default Order;