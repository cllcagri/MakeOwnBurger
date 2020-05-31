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

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    componentDidMount() {
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        for(let param of query.entries()){
            ingredients[param[0]]= +param[1];
        }

        this.setState({ingredients : ingredients});
    }

    render() {
        return (
            <div>
                <CheckoutSummary ingredients={this.state.ingredients}
                                 checkoutCancelled={this.checkoutCancelledHandler}
                                 checkoutContinued={this.checkoutContinuedHandler}/>
            </div>
        );
    }
}

export default Checkout;
