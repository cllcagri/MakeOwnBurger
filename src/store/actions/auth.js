import * as actionTypes from "./actionTypes";
import axios from '../../axios-orders';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}


export const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token: token,
        userId: userId
    }
}

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}

export const logout = () => {
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000);
    }
}

export const auth = (email, password, isSignUp) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        };
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDKTzHkEUg1ryWmWXBse7AKf2nF7GoBtPQ'

        if (!isSignUp) {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDKTzHkEUg1ryWmWXBse7AKf2nF7GoBtPQ'
        }

        if (authData.email !== '' && authData.password !== '') {
            axios.post(url, authData)
                .then((response) => {
                    console.log(response);
                    dispatch(authSuccess(response.data.idToken, response.data.localId));
                    dispatch(checkAuthTimeout(response.data.expiresIn));
                })
                .catch(err => {
                    //console.log(err);
                    dispatch(authFail(err.response.data.error));
                });
        }
    }
}


export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    }
}