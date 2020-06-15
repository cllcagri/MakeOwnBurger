import React from "react";
import Aux from "../../hoc/Aux";
import Burger from "../Burger/Burger";
import BuildControls from "../Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../OrderSummary/OrderSummary";
import Spinner from "../UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import {connect} from "react-redux";
import * as actionTypes from "../../store/actions";
import axios from '../../axios-orders';



const INGREDIENT_PRICES = {
    salad: 0.5,
    meat: 2,
    bacon: 3,
    cheese: 1
}


class BurgerBuilder extends React.Component {

    state = {
        ingredients: {
            salad: 0,
            meat: 0,
            cheese: 0,
            bacon: 0
        },
        totalPrice: 3,
        purchasable: false,
        purchasePopup: false,
        loading: false
    };

    updatePurchaseState(updatedIngredients) {

        const sum = Object.keys(updatedIngredients)
            .map(igKey => {
                return updatedIngredients[igKey];
            }).reduce((sum, el) => {
                return sum + el;
            }, 0);

        this.setState({purchasable: sum > 0});

    }

/*    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        }

        updatedIngredients[type] = updatedCount;
        const newPrice = this.state.totalPrice + INGREDIENT_PRICES[type];

        this.setState({
            ingredients: updatedIngredients,
            totalPrice: newPrice
        });

        this.updatePurchaseState(updatedIngredients);
    };*/

    /*removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if (oldCount <= 0) {
            return;
        }
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] = updatedCount;
        const newPrice = this.state.totalPrice - INGREDIENT_PRICES[type];

        this.setState({
            ingredients: updatedIngredients,
            totalPrice: newPrice
        });

        this.updatePurchaseState(updatedIngredients);
    };*/

    purchasePopupHandler = () => {
        this.setState({purchasePopup: true});
    }

    purchasePopupCancelHandler = () => {
        this.setState({purchasePopup: false});
    }

    //modal popup continue
    purchaseContinueHandler = () => {
        let queryParams = [];
        for (let i in this.state.ingredients) {
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
        }
        queryParams.push('price=' + this.state.totalPrice);
        const queryString = queryParams.join('&');
        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString
        });

        console.log(queryString);
    };

    render() {
        debugger;
        const disabledInfo = {
            ...this.props.ings
        };

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }


        let orderSummary = null;
        if (this.state.loading) {
            orderSummary = <Spinner/>;
        }
        if (this.props.ings) {
            orderSummary = <OrderSummary purchasedContinue={this.purchaseContinueHandler}
                                         purchaseCancel={this.purchasePopupCancelHandler}
                                         ingredients={this.props.ings}
                                         price={this.state.totalPrice}/>;
        }
        let burger = <Spinner/>;
        if (this.props.ings) {
            burger = (<div>
                <Burger ingredients={this.props.ings}/>
                <BuildControls ingredientAdded={this.props.addIngredientHandler}
                               ingredientRemove={this.props.removeIngredientHandler}
                               disableControl={disabledInfo}
                               purchasable={this.state.purchasable}
                               ordered={this.purchasePopupHandler}
                               price={this.state.totalPrice}/>
            </div>);
        }

        return (
            <Aux>
                <Modal show={this.state.purchasePopup} modalClosed={this.purchasePopupCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}


const mapStateToProps = state => {
     console.log(state);
    return {
        ings: state.ingredients,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        addIngredientHandler: (ingName) => dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName: ingName}),
        removeIngredientHandler: (ingName) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName})
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler( BurgerBuilder, axios ));