import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { map } from "lodash"
import configRouting from "./configRouting";

function Routing(props) {
    const { setRefreshCheckLogin, estadoDineroInicial, setEstadoDineroInicial, usuarioCurso, setUsuarioCurso } = props;
    return(
        <Router>
            <Switch>
                {map(configRouting, (route, index) => (
                    <Route key={index} path={route.path} exact={route.exact} >
                        <route.page
                            setRefreshCheckLogin={setRefreshCheckLogin}
                            estadoDineroInicial={estadoDineroInicial}
                            setEstadoDineroInicial={setEstadoDineroInicial}
                            setUsuarioCurso={setUsuarioCurso}
                            usuarioCurso={usuarioCurso}
                        />
                    </Route>
                ))}
            </Switch>
        </Router>
    );
}

export default Routing;
