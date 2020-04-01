import axios from "axios";
import { ADS_URL } from "../config";

function findAll(){
    return axios.get(ADS_URL)
        .then(response => response.data);
}

function findById(id) {
    return axios.get(ADS_URL + "/" + id)
        .then(response => response.data);
}

function findLast(){
    return axios.get(ADS_URL + "/last/ads")
        .then(response => response.data);
}

function findBest(){
    return axios.get(ADS_URL + "/best/ads")
        .then(response => response.data);
}

export default {
    findAll,
    findLast,
    findBest,
    findById
}