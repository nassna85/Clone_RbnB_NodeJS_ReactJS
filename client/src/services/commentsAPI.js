import axios from "axios";
import { COMMENT_URL } from "../config";

function findCommentsByAd(id){
    return axios.get(COMMENT_URL + "/ads/" + id)
        .then(response => response.data);
}

export default {
    findCommentsByAd
}