import axios from "axios";

const connection = axios.create({
  baseURL: "https://notify.circle-up.online/api",
});

export default connection;
