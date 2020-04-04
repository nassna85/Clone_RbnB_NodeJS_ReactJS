import axios from "axios";
import { COMMENT_URL } from "../config";

function findCommentsByAd(id) {
  return axios.get(COMMENT_URL + "/ads/" + id).then(response => response.data);
}

function create(comment, id) {
  return axios
    .post(COMMENT_URL + "/ads/" + id, comment)
    .then(response => response.data);
}

export default {
  findCommentsByAd,
  create
};
