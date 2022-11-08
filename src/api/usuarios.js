import { API_HOST } from "../utils/constants";
import {
    ENDPOINTRegistroUsuarios,
    ENDPOINTListarUsuarios,
    ENDPOINTListarPaginandoUsuarios,
    ENDPOINTObtenerUsuarios,
    ENDPOINTEliminarUsuarios,
    ENDPOINTDeshabilitarUsuarios,
    ENDPOINTActualizarUsuarios
} from "./endpoints";
import axios from 'axios';
import { getTokenApi } from "./auth";

// Registra usuarios
export async function registraUsuarios(data) {
    //console.log(data)

    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getTokenApi()}`
        }
    };

    return await axios.post(API_HOST + ENDPOINTRegistroUsuarios, data, config);
}

// Para obtener todos los datos del usuario
export async function obtenerUsuario(params) {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getTokenApi()}`
        }
    };
    return await axios.get(API_HOST + ENDPOINTObtenerUsuarios + `/${params}`, config);
}

// Para listar todos los usuarios
export async function listarUsuarios(params) {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getTokenApi()}`
        }
    };
    return await axios.get(API_HOST + ENDPOINTListarUsuarios, config);
}

// Listar los usuarios paginandolos
export async function listarPaginacionUsuarios(pagina, limite) {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getTokenApi()}`
        }
    };
    return await axios.get(API_HOST + ENDPOINTListarPaginandoUsuarios + `/?pagina=${pagina}&&limite=${limite}`, config);
}

// Elimina cliente fisicamente de la bd
export async function eliminaUsuario(id) {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getTokenApi()}`
        }
    };

    return await axios.delete(API_HOST + ENDPOINTEliminarUsuarios + `/${id}`, config);
}

// Deshabilita el usuario
export async function deshabilitaUsuario(id, data) {
    //console.log(data)
    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getTokenApi()}`
        }
    };

    return await axios.put(API_HOST + ENDPOINTDeshabilitarUsuarios + `/${id}`, data, config);
}

// Modifica datos del usuario
export async function actualizaUsuario(id, data) {

    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getTokenApi()}`
        }
    };

    return await axios.put(API_HOST + ENDPOINTActualizarUsuarios + `/${id}`, data, config);
}
