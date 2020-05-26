import React from "react";
import Aux from "../../hoc/Aux";
import Button from "../UI/Button/Button";

const OrderSummary = (props) => {
    const ingredientSummary = Object.keys(props.ingredients)
        .map(igKey => {
            return <li key={igKey}><span
                style={{textTransform: 'capitalize'}}>{igKey}: {props.ingredients[igKey]}</span></li>
        });
    return (
        <Aux>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients :</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p>Current Price: <strong>{props.price.toFixed(2)} TL </strong></p>
            <p>Continue for Checkout ? </p>
            <Button buttonType="Button Danger" clicked={props.purchaseCancel}>CANCEL</Button>
            <Button buttonType="Button Success" clicked={props.purchasedContinue}>CONTINUE</Button>
        </Aux>
    );
}

export default OrderSummary;