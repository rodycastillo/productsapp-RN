import axios from "axios";

const baseURL = 'http://192.168.1.50:8080/api'

const api = axios.create({ baseURL });


export default api;