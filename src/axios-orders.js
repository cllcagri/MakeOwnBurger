import React from "react";
import axios from "axios";

const Axios = axios.create({
    baseURL: "https://make-own-burger.firebaseio.com"
});

export default Axios;