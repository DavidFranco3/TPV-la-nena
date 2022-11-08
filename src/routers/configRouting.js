import Dashboard from "../page/Dashboard";
import Productos from "../page/Productos";
import Categorias from "../page/Categorias";
import Ventas from "../page/Ventas";
import Error404 from "../page/Error404";
import TerminalPV from "../page/TerminalPV";
import HistoricoVentas from "../page/HistoricoVentas";
import HistoricoVentasMes from "../page/HistoricoVentasMes";

const configRouting = [
    {
        path: "/HistoricoVentasMes",
        exact: true,
        page: HistoricoVentasMes
    },    
    {
        path: "/HistoricoVentas",
        exact: true,
        page: HistoricoVentas
    },
    {
        path: "/Productos",
        exact: true,
        page: Productos
    },
    {
        path: "/Categorias",
        exact: true,
        page: Categorias
    },
    {
        path: "/Ventas",
        exact: true,
        page: Ventas
    },
    {
        path: "/",
        exact: true,
        page: Dashboard,
        default: true
    },
    {
        path: "/TerminalPV",
        exact: true,
        page: TerminalPV
    },
    {
        path: "*",
        exact: true,
        page: Error404
    }
]

export default configRouting;
