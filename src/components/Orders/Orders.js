import React from "react";
import Order from "../Order/Order";
import Axios from "../../axios-orders";
import WithErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

class Orders extends React.Component {

    state = {
        orders: [],
        loading: true
    }

    componentDidMount() {
        let fetchOrder = [];
        Axios.get('/orders.json')
            .then(res => {
                for (let key in res.data) {
                    fetchOrder.push({
                        ...res.data[key],
                        id: key
                    });
                }
                this.setState({
                    orders: fetchOrder,
                    loading: false
                });
            })
            .catch(error => {
                this.setState({loading: false});
                console.log(error);
            });

    }

    render() {
        return (
            <div>
                {this.state.orders.map(order => (
                    <Order key={order.id}
                           ingredients={order.ingredients}
                           price={order.totalPrice}/>
                ))}
            </div>
        );
    }
}

export default WithErrorHandler(Orders, Axios);