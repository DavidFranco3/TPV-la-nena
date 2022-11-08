import { API_HOST } from "../utils/constants";
import {
    ENDPOINTRegistroProductos,
    ENDPOINTListarProductos,
    ENDPOINTListarPaginandoProductos,
    ENDPOINTListarProductosCategoria,
    ENDPOINTObtenerProductos,
    ENDPOINTEliminarProductos,
    ENDPOINTActualizarProductos,
    ENDPOINTTotalProductos
} from "./endpoints";
import axios from 'axios';
import { getTokenApi } from "./auth";

// Registra productos
export async function registraProductos(data) {

    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getTokenApi()}`
        }
    };

    return await axios.post(API_HOST + ENDPOINTRegistroProductos, data, config);
}

// Para obtener una producto
export async function obtenerProductos(params) {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getTokenApi()}`
        }
    };
    return await axios.get(API_HOST + ENDPOINTObtenerProductos + `/${params}`, config);
}

// Para listar todos los productos
export async function listarProductos(params) {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getTokenApi()}`
        }
    };
    return await axios.get(API_HOST + ENDPOINTListarProductos, config);
}

// Listar los productos paginandolos
export async function listarPaginacionProductos(pagina, limite) {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getTokenApi()}`
        }
    };
    return await axios.get(API_HOST + ENDPOINTListarPaginandoProductos + `/?pagina=${pagina}&&limite=${limite}`, config);
}

// Listar productos por categoria
export async function listarProductosCategoria(categoria) {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getTokenApi()}`
        }
    };
    return await axios.get(API_HOST + ENDPOINTListarProductosCategoria + `?categoria=${categoria}`, config);
}

// Elimina productos
export async function eliminaProductos(id) {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getTokenApi()}`
        }
    };

    return await axios.delete(API_HOST + ENDPOINTEliminarProductos + `/${id}`, config);
}

// Modifica datos del producto
export async function actualizaProductos(id, data) {

    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getTokenApi()}`
        }
    };

    return await axios.put(API_HOST + ENDPOINTActualizarProductos + `/${id}`, data, config);
}

// Para listar todas las ventas
export async function totalProductos(params) {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getTokenApi()}`
        }
    };
    return await axios.get(API_HOST + ENDPOINTTotalProductos, config);
}
