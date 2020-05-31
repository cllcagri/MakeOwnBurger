import React from "react";
import Burger from "../../Burger/Burger";
import Button from "../../UI/Button/Button";
import "./CheckoutSummary.css";
const CheckoutSummary = (props) => {
    return (
        <div className="CheckoutSummary">
            <h1>We will make it taste is perfect !</h1>
            <div style={{width: '100%', margin: 'auto'}}>
                <Burger ingredients={props.ingredients}/>
            </div>
            <Button buttonType="Button Danger" clicked={props.checkoutCancelled}>CANCEL</Button>
            <Button buttonType="Button Success" clicked={props.checkoutContinued}>CONTINUE</Button>
        </div>
    );
};

export default CheckoutSummary;