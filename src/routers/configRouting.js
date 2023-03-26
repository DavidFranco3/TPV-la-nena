// Importaciones de paginas principales
import Dashboard from "../page/Dashboard";
import Productos from "../page/Productos";
import Categorias from "../page/Categorias";
import Error404 from "../page/Error404";
import TerminalPV from "../page/TerminalPV";
import Usuarios from "../page/Usuarios";
import Logs from "../page/Logs";
import Ingredientes from "../page/Ingredientes";
import Historiales from "../page/Historiales";
import Cajas from "../page/Cajas";
import MovimientosCajas from "../page/MovimientosCajas";
import PedidosClientes from "../page/PedidosClientes";
import TerminalPedidos from "../page/TerminalPedidos";
import Clientes from "../page/Clientes";

// Importaciones de productos
import RegistraProductos from "../components/Productos/RegistraProductos";
import ModificaProductos from "../components/Productos/ModificaProductos";

const configRouting = [
    {
        path: "/MovimientosCajas/:caja",
        page: MovimientosCajas,
        roles: ["administrador", "vendedor"]
    },
    {
        path: "/PedidosClientes",
        page: PedidosClientes,
        roles: ["administrador", "vendedor", "cliente"]
    },
    {
        path: "/Clientes",
        page: Clientes,
        roles: ["administrador", "vendedor"]
    },
    {
        path: "/TerminalPedidos",
        page: TerminalPedidos,
        roles: ["administrador", "vendedor", "cliente"]
    },
    {
        path: "/Cajas",
        page: Cajas,
        roles: ["administrador", "vendedor"]
    },
    {
        path: "/Productos",
        page: Productos,
        roles: ["administrador"]
    },
    {
        path: "/RegistraProductos",
        page: RegistraProductos,
        roles: ["administrador"]
    },
    {
        path: "/ModificaProductos/:id",
        page: ModificaProductos,
        roles: ["administrador"]
    },
    {
        path: "/Categorias",
        page: Categorias,
        roles: ["administrador"]
    },
    {
        path: "/TerminalPV",
        page: TerminalPV,
        roles: ["administrador", "vendedor", "mesero"]
    },
    {
        path: "/Usuarios",
        page: Usuarios,
        roles: ["administrador"]
    },
    {
        path: "/Logs",
        page: Logs,
        roles: ["administrador"]
    },
    {
        path: "/Ingredientes",
        page: Ingredientes,
        roles: ["administrador"]
    },
    {
        path: "/Historiales",
        page: Historiales,
        roles: ["administrador", "vendedor"]
    },
    {
        path: "*",
        page: Error404,
        roles: ["administrador", "vendedor", "cliente", "mesero"]
    },
    {
        path: "/",
        page: Dashboard,
        default: true,
        roles: ["administrador", "vendedor", "cliente", "mesero"]
    }
]

export default configRouting;
