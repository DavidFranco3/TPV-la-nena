// Rutas de la API

// Login
export const ENDPOINTLoginAdministrador = "/login";

// Usuarios
export const ENDPOINTRegistroUsuarios = "/usuarios/registro";
export const ENDPOINTListarUsuarios = "/usuarios/listar";
export const ENDPOINTListarPaginandoUsuarios = "/usuarios/listarPaginando";
export const ENDPOINTObtenerUsuarios = "/usuarios/obtenerUsuario";
export const ENDPOINTEliminarUsuarios = "/usuarios/eliminar";
export const ENDPOINTDeshabilitarUsuarios = "/usuarios/deshabilitar";
export const ENDPOINTActualizarUsuarios = "/usuarios/actualizar";

// Categorias
export const ENDPOINTRegistroCategorias = "/categorias/registro";
export const ENDPOINTListarCategorias = "/categorias/listar";
export const ENDPOINTListarPaginandoCategorias = "/categorias/listarPaginando";
export const ENDPOINTObtenerCategorias = "/categorias/obtener";
export const ENDPOINTEliminarCategorias = "/categorias/eliminar";
export const ENDPOINTActualizarCategorias = "/categorias/actualizar";
export const ENDPOINTTotalCategorias = "/categorias/totalCategorias";

// Productos
export const ENDPOINTRegistroProductos = "/productos/registro";
export const ENDPOINTListarProductos = "/productos/listar";
export const ENDPOINTListarPaginandoProductos = "/productos/listarPaginando";
export const ENDPOINTListarProductosCategoria = "/productos/listarFiltroCategoria";
export const ENDPOINTObtenerProductos = "/productos/obtener";
export const ENDPOINTEliminarProductos = "/productos/eliminar";
export const ENDPOINTActualizarProductos = "/productos/actualizar";
export const ENDPOINTTotalProductos = "/productos/totalProductos";

// Ventas
export const ENDPOINTRegistroVentas = "/ventas/registro";
export const ENDPOINTListarVentas = "/ventas/listar";
export const ENDPOINTListarPaginandoVentas = "/ventas/listarPaginando";
export const ENDPOINTListarPaginandoVentasDia = "/ventas/listarPaginandoDia";
export const ENDPOINTListarPaginandoVentasMes = "/ventas/listarPaginandoMes";
export const ENDPOINTObtenerVentas = "/ventas/obtener";
export const ENDPOINTEliminarVentas = "/ventas/eliminar";
export const ENDPOINTActualizarVentas = "/ventas/actualizar";
export const ENDPOINTCancelarVentas = "/ventas/cancelar";
export const ENDPOINTObtenerNumeroVenta = "/ventas/obtenNoTiquet";
export const ENDPOINTListarVentasPorDia = "/ventas/listarTotalVentasDia";
export const ENDPOINTListarVentasPorMes = "/ventas/listarTotalVentasMes";
export const ENDPOINTListarDetallesVentasDia = "/ventas/listarDetallesVentasDia";
export const ENDPOINTListarDetallesVentasMes = "/ventas/listarDetallesVentasMes";
export const ENDPOINTListarDetallesProductosVendidosDia = "/ventas/listarDetallesProductosVendidosDia";
export const ENDPOINTListarDetallesProductosVendidosMes = "/ventas/listarDetallesProductosVendidosMes";
export const ENDPOINTTotalVentas = "/ventas/totalVentas";
export const ENDPOINTTotalVentasDia = "/ventas/totalVentasDia";
export const ENDPOINTTotalVentasMes = "/ventas/totalVentasMes";

// Detalles de venta de cada usuario -- listarDetallesUsuario usuario y dia
export const ENDPOINTListarDetalles = "/ventas/listarDetallesUsuario";
