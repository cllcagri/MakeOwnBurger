import React from "react";
import Aux from "../../hoc/Aux";
import Burger from "../Burger/Burger";
import BuildControls from "../Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../OrderSummary/OrderSummary";
import Spinner from "../UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import {connect} from "react-redux";
import axios from '../../axios-orders';
import * as burgerBuilderActions from "../../store/actions/index";
import * as OrderActions from "../../store/actions/order";
import * as AuthActions from "../../store/actions/auth";


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
        if(this.props.isAuthenticated){
            this.setState({purchasePopup: true});
        }else {
            this.props.onSetAuthRedirectPath('/checkout');
            this.props.history.push("/auth");
        }
    }

    purchasePopupCancelHandler = () => {
        this.setState({purchasePopup: false});
    }

    //modal popup continue
    purchaseContinueHandler = () => {
        this.props.onInitPurchase();
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
                               isAuth={this.props.isAuthenticated}
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
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuthenticated: state.auth.token !== null
    };
}

const mapDispatchToProps = dispatch => {
    return {
        addIngredientHandler: (ingName) => dispatch(burgerBuilderActions.addIngredient(ingName)),
        removeIngredientHandler: (ingName) => dispatch(burgerBuilderActions.removeIngredient(ingName)),
        onInitIngredients : () => dispatch(burgerBuilderActions.initIngredients()),
        onInitPurchase : () => dispatch(OrderActions.purchaseInit()),
        onSetAuthRedirectPath: (path) => dispatch(AuthActions.setAuthRedirectPath(path))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));