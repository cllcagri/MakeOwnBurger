import React from 'react';
import './App.css';
import Layout from "./components/Layout/Layout";
import BurgerBuilder from "./components/BurgerBuilder/BurgerBuilder";
import Checkout from "./components/Checkout/Checkout";
import {Route, Switch, withRouter, Redirect} from "react-router";
import Orders from "./components/Orders/Orders";
import Auth from "./Auth/Auth";
import Logout from "./Auth/Logout/Logout";
import {connect} from "react-redux";
import * as actions from "./store/actions/index";

class App extends React.Component {

    componentDidMount() {
        this.props.onTryAutoSignUp();
    }

    render() {

        let routes = (
            <Switch>
                <Route exact path="/" component={BurgerBuilder}/>
                <Route exact path="/auth" component={Auth}/>
                <Redirect to="/" />
            </Switch>
        );

        if (this.props.isAuthenticated) {
            routes = (<Switch>
                    <Route exact path="/" component={BurgerBuilder}/>
                    <Route exact path="/auth" component={Auth}/>
                    <Route exact path="/orders" component={Orders}/>
                    <Route exact path="/logout" component={Logout}/>
                    <Route path="/checkout" component={Checkout}/>
                    <Redirect to="/" />
                </Switch>
            );
        }


        return (
            <div>
                <Layout>
                    {routes}
                </Layout>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onTryAutoSignUp: () => dispatch(actions.authCheckState())
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
