import axios from "axios";

const connection = axios.create({
  baseURL: "http://notify.circle-up.online/api",
});

export default connection;
