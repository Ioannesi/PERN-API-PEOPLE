import axios from "axios";

export default axios.create({
  baseURL: "http://192.168.2.6/api",
  headers: {
    "Content-type": "application/json"
  }
});