import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { map } from "lodash";
import LayoutPrincipal from "../layout/layoutPrincipal";
import configRouting from './configRouting';

const adminRoutes = configRouting.filter((route) =>
    route.roles.includes("administrador")
);

const sellerRoutes = configRouting.filter((route) =>
    route.roles.includes("vendedor")
);

const clientRoutes = configRouting.filter((route) =>
    route.roles.includes("cliente")
);

const waitersRoutes = configRouting.filter((route) =>
    route.roles.includes("mesero")
);

const Routing = ({ setRefreshCheckLogin, userRole }) => (
    <Router>
        <Routes>
            {map(userRole === "administrador" ? adminRoutes : userRole === "vendedor" ? sellerRoutes : userRole === "mesero" ? waitersRoutes : clientRoutes, (route, index) => (
                <Route key={index} path={route.path} element={
                    <LayoutPrincipal
                        setRefreshCheckLogin={setRefreshCheckLogin}
                    >
                        <route.page
                            setRefreshCheckLogin={setRefreshCheckLogin}
                        /> </LayoutPrincipal>
                }
                >
                </Route>

            ))}
        </Routes>
    </Router>
)

export default Routing;