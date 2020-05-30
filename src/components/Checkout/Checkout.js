import React from "react";
import CheckoutSummary from "../Order/CheckoutSummary/CheckoutSummary";

class Checkout extends React.Component {
    state = {
        ingredients: {
            salad: 1,
            meat: 2,
            cheese: 3,
            bacon: 1
        }
    }
    render() {
        return (
            <div>
                <CheckoutSummary ingredients={this.state.ingredients} />
            </div>
        );
    }
}

export default Checkout;
