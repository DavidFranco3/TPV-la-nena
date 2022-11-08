import { API_HOST, TOKEN } from "../utils/constants";
import { ENDPOINTLoginAdministrador } from "./endpoints";
import jwtDecode from "jwt-decode";
import axios from 'axios';

export async function login(data) {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    };
    return await axios.post(API_HOST + ENDPOINTLoginAdministrador, data, config);
}

export function setTokenApi(token) {
    localStorage.setItem(TOKEN, token);
}

export function getTokenApi() {
    return localStorage.getItem(TOKEN);
}

export function logoutApi() {
    return localStorage.removeItem(TOKEN);
}

export function isUserLogedApi() {
    const token = getTokenApi();
    if(!token){
        logoutApi();
        return null;
    }
    if(isExpired(token)){
        logoutApi();
    }
    return jwtDecode(token);
}

function isExpired(token) {
    const {exp} = jwtDecode(token);
    const expire = exp * 1000;
    const timeout = expire - Date.now()

    if (timeout < 0){
        return true;
    }
    return false;
}

export function isExpiredToken(token) {
    const {exp} = jwtDecode(token);
    const expire = exp * 1000;
    const timeout = expire - Date.now()

    if (timeout < 0){
        return true;
    }
    return false;
}

export function obtenidusuarioLogueado(token) {
    const { _ } = jwtDecode(token);

    return _;
}
