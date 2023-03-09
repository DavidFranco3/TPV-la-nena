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

const Routing = ({ setRefreshCheckLogin, userRole }) => (
    console.log(userRole),
    userRole === "administrador" ? (
        <Router>
            <Routes>
                {map(adminRoutes, (route, index) => (
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
    ) : (
        userRole === "vendedor" ? (
            <Router>
                <Routes>
                    {map(sellerRoutes, (route, index) => (
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
        ) : (
            userRole === "cliente" ? (
                <Router>
                    <Routes>
                        {map(clientRoutes, (route, index) => (
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
            ) : (
                <></>
            )
        )
    )
)

export default Routing;