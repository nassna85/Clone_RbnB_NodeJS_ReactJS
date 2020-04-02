import axios from "axios";
import { AUTH_URL } from "../config";

function registration(user){
    return axios.post(AUTH_URL + "/registration", user)
        .then(response => response.data);
}

export default {
    registration
}