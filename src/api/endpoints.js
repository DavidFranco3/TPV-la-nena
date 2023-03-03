// Rutas de la API

// Login
export const ENDPOINTLoginAdministrador = "/login";

// Usuarios
export const ENDPOINTRegistroUsuarios = "/usuarios/registro";
export const ENDPOINTListarUsuarios = "/usuarios/listar";
export const ENDPOINTListarUsuariosCajeros = "/usuarios/listarCajeros";
export const ENDPOINTListarPaginandoUsuarios = "/usuarios/listarPaginando";
export const ENDPOINTListarPaginandoUsuariosActivos = "/usuarios/listarPaginandoActivos";
export const ENDPOINTTotalUsuariosActivos = "/usuarios/totalUsuariosActivos";
export const ENDPOINTListarPaginandoUsuariosCancelados = "/usuarios/listarPaginandoCancelados";
export const ENDPOINTTotalUsuariosCancelados = "/usuarios/totalUsuariosCancelados";
export const ENDPOINTObtenerUsuarios = "/usuarios/obtenerUsuario";
export const ENDPOINTEliminarUsuarios = "/usuarios/eliminar";
export const ENDPOINTDeshabilitarUsuarios = "/usuarios/deshabilitar";
export const ENDPOINTActualizarUsuarios = "/usuarios/actualizar";

// Categorías
export const ENDPOINTRegistroCategorias = "/categorias/registro";
export const ENDPOINTListarCategorias = "/categorias/listar";
export const ENDPOINTListarPaginandoCategoriasActivas = "/categorias/listarPaginandoActivas";
export const ENDPOINTTotalCategoriasActivas = "/categorias/totalCategoriasActivas";
export const ENDPOINTListarPaginandoCategoriasCanceladas = "/categorias/listarPaginandoCanceladas";
export const ENDPOINTTotalCategoriasCanceladas = "/categorias/totalCategoriasCanceladas";
export const ENDPOINTObtenerCategorias = "/categorias/obtener";
export const ENDPOINTEliminarCategorias = "/categorias/eliminar";
export const ENDPOINTActualizarCategorias = "/categorias/actualizar";
export const ENDPOINTCancelarCategorias = "/categorias/cancelar";

// Productos
export const ENDPOINTRegistroProductos = "/productos/registro";
export const ENDPOINTListarProductos = "/productos/listar";
export const ENDPOINTListarPaginandoProductosActivos = "/productos/listarPaginandoActivos";
export const ENDPOINTTotalProductosActivos = "/productos/totalProductosActivos";
export const ENDPOINTListarPaginandoProductosCancelados = "/productos/listarPaginandoCancelados";
export const ENDPOINTTotalProductosCancelados = "/productos/totalProductosCancelados";
export const ENDPOINTListarProductosCategoria = "/productos/listarFiltroCategoria";
export const ENDPOINTObtenerProductos = "/productos/obtener";
export const ENDPOINTEliminarProductos = "/productos/eliminar";
export const ENDPOINTActualizarProductos = "/productos/actualizar";
export const ENDPOINTCancelarProductos = "/productos/cancelar";

// Ventas
export const ENDPOINTRegistroVentas = "/ventas/registro";
export const ENDPOINTListarVentas = "/ventas/listar";
export const ENDPOINTListarVentasDia = "/ventas/listarVentasDia";
export const ENDPOINTListarVentasMes = "/ventas/listarVentasMes";
export const ENDPOINTListarPaginandoVentas = "/ventas/listarPaginando";
export const ENDPOINTTotalVentas = "/ventas/totalVentas";
export const ENDPOINTListarPaginandoVentasActivas = "/ventas/listarPaginandoActivas";
export const ENDPOINTTotalVentasActivas = "/ventas/totalVentasActivas";
export const ENDPOINTListarPaginandoVentasCanceladas = "/ventas/listarPaginandoCanceladas";
export const ENDPOINTTotalVentasCanceladas = "/ventas/totalVentasCanceladas";
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

// Unidades medida
export const ENDPOINTRegistraUM = "/unidadesMedida/registro";
export const ENDPOINTListarUM = "/unidadesMedida/listar";
export const ENDPOINTListarUMPorTipo = "/unidadesMedida/listarPorTipo";
export const ENDPOINTObtenerUM = "/unidadesMedida/obtener";
export const ENDPOINTEliminarUM = "/unidadesMedida/eliminar";
export const ENDPOINTActualizarUM = "/unidadesMedida/actualizar";
export const ENDPOINTDeshabilitaUM = "/unidadesMedida/deshabilitar";
export const ENDPOINTListarUMPaginacion = "/unidadesMedida/listarPaginando";
export const ENDPOINTTotalUM = "/unidadesMedida/total";
export const ENDPOINTListarPaginandoUMActivas = "/unidadesMedida/listarPaginandoActivos";
export const ENDPOINTTotalUMActivas = "/unidadesMedida/totalUMActivos";
export const ENDPOINTListarPaginandoUMCanceladas = "/unidadesMedida/listarPaginandoCancelados";
export const ENDPOINTTotalUMCanceladas = "/unidadesMedida/totalUMCancelados";

// Logs generales
export const ENDPOINTRegistroLogs = "/logs/registro";
export const ENDPOINTListarLogs = "/logs/listar";
export const ENDPOINTObtenerNoLogs = "/logs/obtenerNoLog";
export const ENDPOINTListarPaginandoLogs = "/logs/listarPaginando";
export const ENDPOINTObtenerLogs = "/logs/obtener";
export const ENDPOINTEliminarLogs = "/logs/eliminar";
export const ENDPOINTActualizarLogs = "/logs/actualizar";
export const ENDPOINTTotalLogs = "/logs/total";

// Ingrediente
export const ENDPOINTRegistroIngredientes = "/ingredientes/registro";
export const ENDPOINTListarIngredientes = "/ingredientes/listar";
export const ENDPOINTListarPaginandoIngredientesActivos = "/ingredientes/listarPaginandoActivos";
export const ENDPOINTTotalIngredientesActivos = "/ingredientes/totalIngredientesActivos";
export const ENDPOINTListarPaginandoIngredientesCancelados = "/ingredientes/listarPaginandoCancelados";
export const ENDPOINTTotalIngredientesCancelados = "/ingredientes/totalIngredientesCancelados";
export const ENDPOINTObtenerIngredientes = "/ingredientess/obtener";
export const ENDPOINTEliminarIngredientes = "/ingredientes/eliminar";
export const ENDPOINTActualizarIngredientes = "/ingredientes/actualizar";
export const ENDPOINTCancelarIngredientes = "/ingredientes/cancelar";

// Cajas
export const ENDPOINTRegistroCajas = "/cajas/registro";
export const ENDPOINTListarCajas = "/cajas/listar";
export const ENDPOINTListarPaginandoCajas = "/cajas/listarPaginando";
export const ENDPOINTTotalCajas = "/cajas/totalCajas";
export const ENDPOINTListarPaginandoCajasActivas = "/cajas/listarPaginandoActivas";
export const ENDPOINTTotalCajasActivas = "/cajas/totalCajasActivas";
export const ENDPOINTListarPaginandoCajasCanceladas = "/cajas/listarPaginandoCanceladas";
export const ENDPOINTTotalCajasCanceladas = "/cajas/totalCajasCanceladas";
export const ENDPOINTObtenerCajas = "/cajas/obtener";
export const ENDPOINTEliminarCajas = "/cajas/eliminar";
export const ENDPOINTActualizarCajas = "/cajas/actualizar";
export const ENDPOINTCancelarCajas = "/cajas/cancelar";
export const ENDPOINTObtenerUltimaCajaCajero = "/cajas/obtenerUltimaCajaCajero";

// Movimientos cajas
export const ENDPOINTRegistroMovimientosCajas = "/movimientosCajas/registro";
export const ENDPOINTListarMovimientosCajas = "/movimientosCajas/listar";
export const ENDPOINTListarPaginandoMovimientosCajas = "/movimientosCajas/listarPaginando";
export const ENDPOINTTotalMovimientosCajas = "/movimientosCajas/totalMovimientos";
export const ENDPOINTListarPaginandoMovimientosCajasActivas = "/movimientosCajas/listarPaginandoActivas";
export const ENDPOINTTotalMovimientosCajasActivas = "/movimientosCajas/totalMovimientosActivas";
export const ENDPOINTListarPaginandoMovimientosCajasCanceladas = "/movimientosCajas/listarPaginandoCanceladas";
export const ENDPOINTTotalMovimientosCajasCanceladas = "/movimientosCajas/totalMovimientosCanceladas";
export const ENDPOINTObtenerMovimientosCajas = "/movimientosCajas/obtener";
export const ENDPOINTEliminarMovimientosCajas = "/movimientosCajas/eliminar";
export const ENDPOINTActualizarMovimientosCajas = "/movimientosCajas/actualizar";
export const ENDPOINTCancelarMovimientosCajas = "/movimientosCajas/cancelar";
