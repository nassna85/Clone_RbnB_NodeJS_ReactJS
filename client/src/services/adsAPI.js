import axios from "axios";
import { ADS_URL } from "../config";

function findAll(){
    return axios.get(ADS_URL)
        .then(response => response.data);
}

export default {
    findAll
}