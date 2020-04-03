import axios from "axios";
import jwtDecode from "jwt-decode";
import { AUTH_URL } from "../config";

function registration(user){
    return axios.post(AUTH_URL + "/registration", user)
        .then(response => response.data);
}

function login(credentials){
    return axios.post(AUTH_URL + "/login", credentials)
        .then(response => response.data.token)
        .then(token => {
            window.localStorage.setItem("authToken", token);
            //Set Axios with this token
            setAxiosToken(token);
        });
}

/**
 * Logout => Delete Token in setup Axios
 */
function logout() {
    window.localStorage.removeItem("authToken");
    delete axios.defaults.headers["Authorization"];
}

/**
 * Set Axios with token
 */
function setAxiosToken(token) {
    axios.defaults.headers["Authorization"] = "Bearer " + token;
}

/**
 * Every times refresh page, verify if a token, if a token => set Axios
 */
function setup() {
    //Verify if token
    const token = window.localStorage.getItem("authToken");
    if (token) {
        const jwtData = jwtDecode(token);
        //if token valid
        if (jwtData.exp * 1000 > new Date().getTime()) {
            //Set Axios with this token
            setAxiosToken(token);
        }
    }
}

function isAuthenticated() {
    const token = window.localStorage.getItem("authToken");
    if (token) {
        const jwtData = jwtDecode(token);
        return jwtData.exp * 1000 > new Date().getTime();

    }
    return false;
}

export default {
    registration,
    login,
    setup,
    isAuthenticated,
    logout
}