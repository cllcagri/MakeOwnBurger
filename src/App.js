import React from 'react';
import './App.css';
import Layout from "./components/Layout/Layout";
import BurgerBuilder from "./components/BurgerBuilder/BurgerBuilder";

class App extends React.Component {
    render() {
        return (
            <div>
                <Layout>
                    <BurgerBuilder />
                </Layout>
            </div>
        );
    }
}


export default App;
