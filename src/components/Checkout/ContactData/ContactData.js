import React from "react";
import Button from "../../UI/Button/Button";
import "./ContactData.css";
import Axios from "../../../axios-orders";
import Spinner from "../../UI/Spinner/Spinner";
import Input from "../../UI/Input/Input";


class ContactData extends React.Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your name'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5
                },
                valid: false,
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Zip Code'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your e-mail'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'Cheapest'}
                    ]
                },
                value: 'fastest',
                validation: {},
                valid: true
            }
        },
        formIsValid: false,
        loading: false
    };

    orderHandler = (event) => {
        event.preventDefault();
        this.setState({loading: true});
        const formData = {};
        for (let identifier in this.state.orderForm) {
            formData[identifier] = this.state.orderForm[identifier].value;
        }
        const order = {
            ingredients: this.props.ingredients,
            totalPrice: this.props.price,
            orderData: formData
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

    inputChangeHandler = (event, identifier) => {
        const updatedOrderForm = {
            ...this.state.orderForm
        };
        const updatedFormElement = {
            ...updatedOrderForm[identifier]
        };
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        console.log(updatedFormElement.valid);
        updatedFormElement.touched  = true;
        updatedOrderForm[identifier] = updatedFormElement;

        let formIsValid = true;
        for(let inputIdentifier in updatedOrderForm){
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
        }
        this.setState({orderForm: updatedOrderForm, formIsValid : formIsValid});

    }

    checkValidity = (value, rules) => {
        let isValid = true;
        if(!rules){
            return true;
        }

        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength;
        }

        return isValid;
    }

    render() {
        const formElementsArray = [];
        for (let key in this.state.orderForm) {
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }
        let form = (
            <form onSubmit={this.orderHandler}>
                {
                    formElementsArray.map(formElement => (
                        <Input key={formElement.id}
                               elementType={formElement.config.elementType}
                               elementConfig={formElement.config.elementConfig}
                               value={formElement.config.value}
                               changed={(event) => this.inputChangeHandler(event, formElement.id)}
                               shouldValidate ={formElement.config.validation}
                               touched={formElement.config.touched}
                               invalid={!formElement.config.valid}/>
                    ))
                }
                <Button buttonType="Button Success" disabled={!this.state.formIsValid}>ORDER</Button>

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