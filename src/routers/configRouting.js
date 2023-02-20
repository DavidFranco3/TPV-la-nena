import Dashboard from "../page/Dashboard";
import Productos from "../page/Productos";
import Categorias from "../page/Categorias";
import Ventas from "../page/Ventas";
import Error404 from "../page/Error404";
import TerminalPV from "../page/TerminalPV";
import HistoricoVentasDia from "../page/HistoricoVentasDia";
import HistoricoVentasMes from "../page/HistoricoVentasMes";
import Usuarios from "../page/Usuarios";

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
        path: "/TerminalPV",
        page: TerminalPV
    },
    {
        path: "/Usuarios",
        page: Usuarios
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
