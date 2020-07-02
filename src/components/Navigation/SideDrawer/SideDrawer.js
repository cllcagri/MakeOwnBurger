import React from "react";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import "./SideDrawer.css";
import Aux from "../../../hoc/Aux";
import Backdrop from "../../UI/Backdrop/Backdrop";
import Toolbar from "../Toolbar/Toolbar";

const SideDrawer = (props) => {
    let attachedClassed = props.open ? "SideDrawer Open" : "SideDrawer Close";

    return (
        <Aux>
            <Backdrop show={props.open} clicked={props.closed}/>
            <div className={attachedClassed}>
                <Logo height="9%"/>
                <nav>
                    <NavigationItems isAuthenticated={props.isAuth} />
                </nav>
            </div>
        </Aux>
    );
};

export default SideDrawer;