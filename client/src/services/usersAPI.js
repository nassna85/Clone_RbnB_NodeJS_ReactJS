import axios from "axios";
import { USER_URL } from "../config";

function find(id){
    return axios.get(USER_URL + "/" + id)
        .then(response => response.data);
}

export default {
    find
}