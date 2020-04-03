import axios from "axios";
import { BOOKING_URL } from "../config";

function findAllByUser(id){
    return axios.get(BOOKING_URL + "/users/" + id)
        .then(response => response.data);
}

export default {
    findAllByUser
}