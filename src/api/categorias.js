import { API_HOST } from "../utils/constants";
import {
    ENDPOINTRegistroCategorias,
    ENDPOINTListarCategorias,
    ENDPOINTListarPaginandoCategorias,
    ENDPOINTObtenerCategorias,
    ENDPOINTEliminarCategorias,
    ENDPOINTActualizarCategorias,
    ENDPOINTTotalCategorias
} from "./endpoints";
import axios from 'axios';
import { getTokenApi } from "./auth";

// Registra categorias
export async function registraCategorias(data) {

    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getTokenApi()}`
        }
    };

    return await axios.post(API_HOST + ENDPOINTRegistroCategorias, data, config);
}

// Para obtener una categoria
export async function obtenerCategoria(params) {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getTokenApi()}`
        }
    };
    return await axios.get(API_HOST + ENDPOINTObtenerCategorias + `/${params}`, config);
}

// Para listar todas las categorias
export async function listarCategorias(params) {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getTokenApi()}`
        }
    };
    return await axios.get(API_HOST + ENDPOINTListarCategorias, config);
}

// Listar las categorias paginandolas
export async function listarPaginacionCategorias(pagina, limite) {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getTokenApi()}`
        }
    };
    return await axios.get(API_HOST + ENDPOINTListarPaginandoCategorias + `/?pagina=${pagina}&&limite=${limite}`, config);
}

// Elimina categoria
export async function eliminaCategoria(id) {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getTokenApi()}`
        }
    };

    return await axios.delete(API_HOST + ENDPOINTEliminarCategorias + `/${id}`, config);
}

// Modifica datos del usuario
export async function actualizaCategoria(id, data) {

    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getTokenApi()}`
        }
    };

    return await axios.put(API_HOST + ENDPOINTActualizarCategorias + `/${id}`, data, config);
}

// Para listar todas las ventas
export async function totalCategorias(params) {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getTokenApi()}`
        }
    };
    return await axios.get(API_HOST + ENDPOINTTotalCategorias, config);
}