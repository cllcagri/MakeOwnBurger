import React from "react";
import Button from "../../UI/Button/Button";
import "./ContactData.css";
import Axios from "../../../axios-orders";
import Spinner from "../../UI/Spinner/Spinner";


class ContactData extends React.Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        loading: false
    };

    orderHandler = (event) => {
        event.preventDefault();
        this.setState({loading: true});
        const order = {
            ingredients: this.props.ingredients,
            totalPrice: this.props.price,
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
                this.setState({loading: false});
                this.props.history.push('/');
            })
            .catch(error => {
                this.setState({loading: false});
                console.log(error);
            });

    };

    render() {
        let form = (
            <form>
                <input className="Input" type="text" name="name" placeholder="name"/>
                <input className="Input" type="email" name="email" placeholder="email"/>
                <input className="Input" type="text" name="street" placeholder="street"/>
                <input className="Input" type="text" name="postalCode" placeholder="postalCode"/>
                <Button buttonType="Button Success" clicked={this.orderHandler}>ORDER</Button>
            </form>
        );
        if (this.state.loading) {
            form = <Spinner/>;
        }
        return (
            <div className="ContactData">
                <h2>Please Enter Your Information Address</h2>
                {form}
            </div>
        );
    }
}

export default ContactData;