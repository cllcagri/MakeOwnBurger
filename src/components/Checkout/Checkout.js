import React from "react";
import CheckoutSummary from "../Order/CheckoutSummary/CheckoutSummary";
import ContactData from "./ContactData/ContactData";
import {Route} from "react-router";

class Checkout extends React.Component {
    state = {
        ingredients: null,
        price: 0
    }

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    componentWillMount() {
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        let totalPrice = 0;
        for (let param of query.entries()) {
            if (param[0] === 'price') {
                totalPrice = param[1];
            } else {
                ingredients[param[0]] = +param[1];
            }
        }

        this.setState({ingredients: ingredients, totalPrice: totalPrice});
    }

    render() {
        return (
            <div>
                <CheckoutSummary ingredients={this.state.ingredients}
                                 checkoutCancelled={this.checkoutCancelledHandler}
                                 checkoutContinued={this.checkoutContinuedHandler}/>
                <Route exact path="/checkout/contact-data"
                       render={() => (
                           <ContactData ingredients={this.state.ingredients} price={this.state.totalPrice} {...this.props}/>)}/>
            </div>
        );
    }
}

export default Checkout;
