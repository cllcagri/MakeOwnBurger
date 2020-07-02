import React from "react";
import Order from "../Order/Order";
import Axios from "../../axios-orders";
import WithErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import {connect} from "react-redux";
import * as OrderActions from "../../store/actions/index";
import Spinner from "../UI/Spinner/Spinner";

class Orders extends React.Component {

    componentDidMount() {
        this.props.onFetchOrders(this.props.token);
    }

    render() {
        let orders = <Spinner/>;
        if (!this.props.loading) {
            orders = (
                <div>
                    {this.props.orders.map(order => (
                        <Order key={order.id}
                               ingredients={order.ingredients}
                               price={order.totalPrice}/>
                    ))}
                </div>
            );
        }

        return (
            <div>
                {orders}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading,
        token: state.auth.token
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: (token) => dispatch(OrderActions.fetchOrders(token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WithErrorHandler(Orders, Axios));