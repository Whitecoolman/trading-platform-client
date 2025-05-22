import { env } from "@/config/env";
import axios from "axios";
const ActTraderapi = axios.create({
    baseURL : `${env.BASE_URL}`,
    headers : {
        "Content-Type" : "application/json",
        "ngrok-skip-browser-warning" : true,
    }
})

ActTraderapi.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("jwtToken");
        if(token){
            config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        if(error.response.status === 401){
            localStorage.removeItem("jwtToken");
            window.location.href = "";
        }
        return Promise.reject(error);
    }
);

export default ActTraderapi;