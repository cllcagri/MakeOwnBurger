import React from "react";
import Input from "../components/UI/Input/Input";
import Button from "../components/UI/Button/Button";
import "./Auth.css";
import * as actions from "../store/actions/index";
import {connect} from "react-redux";
import Spinner from "../components/UI/Spinner/Spinner";
import {Redirect} from "react-router-dom";

class Auth extends React.Component {
    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Mail Address'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true,
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            }
        },

        isSignUp: true
    }

    componentDidMount() {
        if(!this.props.buildingBurger && this.props.authRedirectPath !== '/'){
            this.props.onSetAuthRedirectPath();
        }
    }

    inputChangeHandler = (event, controlName) => {
        const updatedControls = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: this.checkValidity(event.target.value, this.state.controls[controlName].validation),
                touched: true
            }
        }
        this.setState({controls: updatedControls})
    }

    checkValidity = (value, rules) => {
        let isValid = true;
        if (!rules) {
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

    submitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignUp);

    }

    switchAuthModeHandler = () => {
        this.setState(prevState => {
            return {
                isSignUp: !prevState.isSignUp
            }
        })
    }

    render() {
        const formElementsArray = [];
        for (let key in this.state.controls) {
            formElementsArray.push({
                id: key,
                config: this.state.controls[key]
            });
        }

        let form = formElementsArray.map(formElement => (
            <Input key={formElement.id}
                   elementType={formElement.config.elementType}
                   elementConfig={formElement.config.elementConfig}
                   value={formElement.config.value}
                   changed={(event) => this.inputChangeHandler(event, formElement.id)}
                   shouldValidate={formElement.config.validation}
                   touched={formElement.config.touched}
                   invalid={!formElement.config.valid}/>
        ));

        if (this.props.loading) {
            form = <Spinner/>;
        }

        const errorMessage = this.props.error ? <p>{this.props.error.message}</p> : null;

        let authRedirect = null;
        debugger;
        if (this.props.isAuthenticated) {
            authRedirect = <Redirect to={this.props.authRedirectPath}/>;
        }

        return (
            <div className="Auth">
                {authRedirect}
                <form onSubmit={this.submitHandler}>
                    {form}
                    <Button buttonType="Button Success">Submit</Button>
                </form>
                <Button clicked={this.switchAuthModeHandler} buttonType="Button Danger">SWITCH
                    TO {this.state.isSignUp ? 'SIGN IN' : 'SIGN UP'}</Button>

                {errorMessage}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        buildingBurger: state.burgerBuilder.building,
        authRedirectPath: state.auth.authRedirectPath
    }
}


const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignUp) => dispatch(actions.auth(email, password, isSignUp)),
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath("/"))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Auth);