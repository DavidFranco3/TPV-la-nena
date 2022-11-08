import { API_HOST } from "../utils/constants";
import {
    ENDPOINTRegistroVentas,
    ENDPOINTListarVentas,
    ENDPOINTListarPaginandoVentas,
    ENDPOINTListarPaginandoVentasDia,
    ENDPOINTListarPaginandoVentasMes,
    ENDPOINTObtenerVentas,
    ENDPOINTEliminarVentas,
    ENDPOINTActualizarVentas,
    ENDPOINTCancelarVentas,
    ENDPOINTObtenerNumeroVenta,
    ENDPOINTListarVentasPorDia,
    ENDPOINTListarVentasPorMes,
    ENDPOINTListarDetalles,
    ENDPOINTListarDetallesVentasDia,
    ENDPOINTListarDetallesVentasMes,
    ENDPOINTListarDetallesProductosVendidosDia,
    ENDPOINTListarDetallesProductosVendidosMes,
    ENDPOINTTotalVentas,
    ENDPOINTTotalVentasDia

} from "./endpoints";
import axios from 'axios';
import { getTokenApi } from "./auth";

// Registra ventas
export async function registraVentas(data) {
    //console.log(data)

    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getTokenApi()}`
        }
    };

    return await axios.post(API_HOST + ENDPOINTRegistroVentas, data, config);
}

// Para obtener una venta
export async function obtenerVentas(params) {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getTokenApi()}`
        }
    };
    return await axios.get(API_HOST + ENDPOINTObtenerVentas + `/${params}`, config);
}

// Para listar todas las ventas
export async function listarVentas(params) {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getTokenApi()}`
        }
    };
    return await axios.get(API_HOST + ENDPOINTListarVentas, config);
}

// Para listar todas las ventas
export async function totalVentas(params) {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getTokenApi()}`
        }
    };
    return await axios.get(API_HOST + ENDPOINTTotalVentas, config);
}

// Para listar todas las ventas
export async function totalVentasDia(dia) {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getTokenApi()}`
        }
    };
    return await axios.get(API_HOST + ENDPOINTTotalVentasDia + `?dia=${dia}`, config);
}

// Listar ventas por dia
export async function listarVentasPorDia(dia) {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getTokenApi()}`
        }
    };
    return await axios.get(API_HOST + ENDPOINTListarVentasPorDia + `?dia=${dia}`, config);
}

// Listar ventas por dia
export async function listarVentasPorMes(dia) {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getTokenApi()}`
        }
    };
    return await axios.get(API_HOST + ENDPOINTListarVentasPorMes + `?dia=${dia}`, config);
}

// Listar las ventas paginandolas
export async function listarPaginacionVentas(pagina, limite) {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getTokenApi()}`
        }
    };
    return await axios.get(API_HOST + ENDPOINTListarPaginandoVentas + `/?pagina=${pagina}&&limite=${limite}`, config);
}

// Listar las ventas paginandolas
export async function listarPaginacionVentasDia(pagina, limite, dia) {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getTokenApi()}`
        }
    };
    return await axios.get(API_HOST + ENDPOINTListarPaginandoVentasDia + `/?pagina=${pagina}&&limite=${limite}&&dia=${dia}`, config);
}

// Listar las ventas paginandolas
export async function listarPaginacionVentasMes(pagina, limite, dia) {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getTokenApi()}`
        }
    };
    return await axios.get(API_HOST + ENDPOINTListarPaginandoVentasMes + `/?pagina=${pagina}&&limite=${limite}&&dia=${dia}`, config);
}

// Listar los detalles de las ventas del dia
export async function listarDetallesVentasPorMes(dia) {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getTokenApi()}`
        }
    };
    return await axios.get(API_HOST + ENDPOINTListarDetallesVentasMes + `?dia=${dia}`, config);
}

// Listar los detalles de las ventas del dia
export async function listarDetallesVentasPorDia(dia) {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getTokenApi()}`
        }
    };
    return await axios.get(API_HOST + ENDPOINTListarDetallesVentasDia + `?dia=${dia}`, config);
}

// Listar detalles de las ventas de cada usuario indicando usuario y dia -- ENDPOINTListarDetalles
export async function listarDetalles(usuario, dia) {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getTokenApi()}`
        }
    };
    return await axios.get(API_HOST + ENDPOINTListarDetalles + `?dia=${dia}&&usuario=${usuario}`, config);
}

// Listar solo los productos que se vendieron en el día solicitado -- ENDPOINTListarDetallesProductosVendidosDia
export async function listarDetallesProductosVentasPorDia(dia) {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getTokenApi()}`
        }
    };
    return await axios.get(API_HOST + ENDPOINTListarDetallesProductosVendidosDia + `?dia=${dia}`, config);
}

// Listar solo los productos que se vendieron en el día solicitado -- ENDPOINTListarDetallesProductosVendidosDia
export async function listarDetallesProductosVentasPorMes(dia) {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getTokenApi()}`
        }
    };
    return await axios.get(API_HOST + ENDPOINTListarDetallesProductosVendidosMes + `?dia=${dia}`, config);
}

// Elimina ventas
export async function eliminaVentas(id) {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getTokenApi()}`
        }
    };

    return await axios.delete(API_HOST + ENDPOINTEliminarVentas + `/${id}`, config);
}

// Modifica el tiquet que se ha registrado
export async function actualizaVenta(id, data) {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getTokenApi()}`
        }
    };

    return await axios.put(API_HOST + ENDPOINTActualizarVentas + `/${id}`, data, config);
}

// Cancelar ventas
export async function cancelarVenta(id, data) {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getTokenApi()}`
        }
    };

    return await axios.put(API_HOST + ENDPOINTCancelarVentas + `/${id}`, data, config);
}

// Obtener el numero del ultimo tiquet
export async function obtenUltimoNoTiquet() {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getTokenApi()}`
        }
    };
    return await axios.get(API_HOST + ENDPOINTObtenerNumeroVenta, config);
}
