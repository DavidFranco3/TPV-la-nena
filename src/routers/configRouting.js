import Dashboard from "../page/Dashboard";
import Productos from "../page/Productos";
import Categorias from "../page/Categorias";
import Ventas from "../page/Ventas";
import Error404 from "../page/Error404";
import TerminalPV from "../page/TerminalPV";
import HistoricoVentasDia from "../page/HistoricoVentasDia";
import HistoricoVentasMes from "../page/HistoricoVentasMes";

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
        path: "/Categorias",
        page: Categorias
    },
    {
        path: "/Ventas",
        page: Ventas
    },
    {
        path: "/",
        page: Dashboard,
        default: true
    },
    {
        path: "/TerminalPV",
        page: TerminalPV
    },
    {
        path: "*",
        page: Error404
    }
]

export default configRouting;
