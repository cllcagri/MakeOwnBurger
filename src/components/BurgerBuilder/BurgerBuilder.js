import React from "react";
import Aux from "../../hoc/Aux";
import Burger from "../Burger/Burger";
import BuildControls from "../Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../OrderSummary/OrderSummary";
import Spinner from "../UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import {connect} from "react-redux";
import * as actionTypes from "../../store/actions/actionTypes";
import axios from '../../axios-orders';
import * as burgerBuilderActions from "../../store/actions/index";


class BurgerBuilder extends React.Component {

    state = {
        purchasePopup: false
    };


    componentDidMount() {
        this.props.onInitIngredients();
    }

    updatePurchaseState(updatedIngredients) {

        const sum = Object.keys(updatedIngredients)
            .map(igKey => {
                return updatedIngredients[igKey];
            }).reduce((sum, el) => {
                return sum + el;
            }, 0);

        return sum > 0;

    }

    purchasePopupHandler = () => {
        this.setState({purchasePopup: true});
    }

    purchasePopupCancelHandler = () => {
        this.setState({purchasePopup: false});
    }

    //modal popup continue
    purchaseContinueHandler = () => {
        this.props.history.push('/checkout');
    };

    render() {
        const disabledInfo = {
            ...this.props.ings
        };

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }


        let orderSummary = null;
        if (this.props.ings) {
            orderSummary = <OrderSummary purchasedContinue={this.purchaseContinueHandler}
                                         purchaseCancel={this.purchasePopupCancelHandler}
                                         ingredients={this.props.ings}
                                         price={this.props.price}/>;
        }
        let burger = <Spinner/>;
        if (this.props.ings) {
            burger = (<div>
                <Burger ingredients={this.props.ings}/>
                <BuildControls ingredientAdded={this.props.addIngredientHandler}
                               ingredientRemove={this.props.removeIngredientHandler}
                               disableControl={disabledInfo}
                               purchasable={this.updatePurchaseState(this.props.ings)}
                               ordered={this.purchasePopupHandler}
                               price={this.props.price}/>
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
    return {
        ings: state.ingredients,
        price: state.totalPrice,
        error: state.error
    };
}

const mapDispatchToProps = dispatch => {
    return {
        addIngredientHandler: (ingName) => dispatch(burgerBuilderActions.addIngredient(ingName)),
        removeIngredientHandler: (ingName) => dispatch(burgerBuilderActions.removeIngredient(ingName)),
        onInitIngredients : () => dispatch(burgerBuilderActions.initIngredients())
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));