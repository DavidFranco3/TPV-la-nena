// Importaciones de paginas principales
import Dashboard from "../page/Dashboard";
import Productos from "../page/Productos";
import Categorias from "../page/Categorias";
import Ventas from "../page/Ventas";
import Error404 from "../page/Error404";
import TerminalPV from "../page/TerminalPV";
import HistoricoVentasDia from "../page/HistoricoVentasDia";
import HistoricoVentasMes from "../page/HistoricoVentasMes";
import Usuarios from "../page/Usuarios";
import UnidadesMedida from "../page/UnidadesMedida";
import Logs from "../page/Logs";
import Ingredientes from "../page/Ingredientes";

// Importaciones de productos
import RegistraProductos from "../components/Productos/RegistraProductos";
import ModificaProductos from "../components/Productos/ModificaProductos";

const configRouting = [
    {
        path: "/HistoricoVentasMes",
        page: HistoricoVentasMes
    },    
    {
        path: "/HistoricoVentasDia",
        page: HistoricoVentasDia
    },
    {
        path: "/Productos",
        page: Productos
    },
    {
        path: "/RegistraProductos",
        page: RegistraProductos
    },
    {
        path: "/ModificaProductos/:id",
        page: ModificaProductos
    },
    {
        path: "/Categorias",
        page: Categorias
    },
    {
        path: "/Ventas",
        page: Ventas
    },
    {
        path: "/TerminalPV",
        page: TerminalPV
    },
    {
        path: "/Usuarios",
        page: Usuarios
    },
    {
        path: "/UnidadesMedida",
        page: UnidadesMedida
    },
    {
        path: "/Logs",
        page: Logs
    },
    {
        path: "/Ingredientes",
        page: Ingredientes
    },
    {
        path: "/",
        page: Dashboard,
        default: true
    },
    {
        path: "*",
        page: Error404
    }
]

export default configRouting;
