import React from 'react';
import './App.css';
import Layout from "./components/Layout/Layout";
import BurgerBuilder from "./components/BurgerBuilder/BurgerBuilder";
import Checkout from "./components/Checkout/Checkout";
import {Route, Switch} from "react-router";
import Orders from "./components/Orders/Orders";

class App extends React.Component {
    render() {
        return (
            <div>
                <Layout>
                    <Switch>
                        <Route exact path="/" component={BurgerBuilder}/>
                        <Route exact path="/orders" component={Orders}/>
                        <Route path="/checkout" component={Checkout}/>
                    </Switch>
                </Layout>
            </div>
        );
    }
}


export default App;
