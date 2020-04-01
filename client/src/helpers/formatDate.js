import moment from "moment";

export const formatDate = str => moment(str).format("DD/MM/YYYY");