import React from "react";
import Aux from "../../hoc/Aux";
import Burger from "../Burger/Burger";
import BuildControls from "../Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../OrderSummary/OrderSummary";
import Axios from "../../axios-orders";
import Spinner from "../UI/Spinner/Spinner";
import WithErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

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

    addIngredientHandler = (type) => {
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
    };

    removeIngredientHandler = (type) => {
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
    };

    purchasePopupHandler = () => {
        this.setState({purchasePopup: true});
    }

    purchasePopupCancelHandler = () => {
        this.setState({purchasePopup: false});
    }

    //modal popup continue
    purchaseContinueHandler = () => {
        /*this.setState({loading: true});
        const order = {
            ingredients: this.state.ingredients,
            totalPrice: this.state.totalPrice,
            customer: {
                name: "Tony Kroos",
                address: {
                    street: "Madrid St.",
                    zipCode: 1234,
                    country: "Germany"
                },
                email: "tonyKross@gmail.com"
            },
            deliveryMethod: "fastest"
        }
        Axios.post("/orders.json", order)
            .then(response => {
                this.setState({loading: false, purchasePopup: false});
            })
            .catch(error => {
                this.setState({loading: false, purchasePopup: false});
                console.log(error);
            }); */
        this.props.history.push('/checkout');
    };

    render() {
        const disabledInfo = {
            ...this.state.ingredients
        };

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }


        let orderSummary = null;
        if (this.state.loading) {
            orderSummary = <Spinner/>;
        }
        if (this.state.ingredients) {
            orderSummary = <OrderSummary purchasedContinue={this.purchaseContinueHandler}
                                         purchaseCancel={this.purchasePopupCancelHandler}
                                         ingredients={this.state.ingredients}
                                         price={this.state.totalPrice}/>;
        }
        let burger = <Spinner/>;
        if (this.state.ingredients) {
            burger = (<div>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls ingredientAdded={this.addIngredientHandler}
                               ingredientRemove={this.removeIngredientHandler}
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


export default WithErrorHandler(BurgerBuilder, Axios);