import React from "react";
import "./Burger.css";
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";
import {withRouter} from "react-router";

const Burger = (props) => {
  //turned object to array with object key
    let transformedIngredients = Object.keys(props.ingredients).map(igKey => {
        return [...Array(props.ingredients[igKey])].map((_,i) => {
            return <BurgerIngredient type={igKey} key={igKey + i} />
        });
    }).reduce((arr,el) => {
        return arr.concat(el)
    },[]);

    if(transformedIngredients.length === 0){
        transformedIngredients = <p>Please add some ingredients</p>
    }

  return(
      <div className="Burger">
          <BurgerIngredient type="bread-top" />
          {transformedIngredients}
          <BurgerIngredient type="bread-bottom" />
      </div>
  );
};
export default withRouter(Burger);
