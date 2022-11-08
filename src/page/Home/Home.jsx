import { useState, useEffect } from 'react';
import {obtenerUsuario} from "../../api/usuarios";
import {getTokenApi, isExpiredToken, logoutApi, obtenidusuarioLogueado} from "../../api/auth";
import {toast} from "react-toastify";
import { Redirect} from "react-router-dom";
import LayoutPrincipal from "../../layout/layoutPrincipal";

function Home(props) {
    const { setRefreshCheckLogin } = props;

    const [estadoUsuario, setEstadoUsuario] = useState("");

    // Cerrado de sesión automatico
    useEffect(() => {
        if(getTokenApi()) {
            if(isExpiredToken(getTokenApi())) {
                toast.warning("Sesión expirada");
                toast.success("Sesión cerrada por seguridad");
                logoutApi();
                setRefreshCheckLogin(true);
            }
        }
    }, [setRefreshCheckLogin]);
    // Termina cerrado de sesión automatico

    useEffect(() => {
        try {
            obtenerUsuario(obtenidusuarioLogueado(getTokenApi())).then(response => {
                const { data } = response;
                //console.log(data)
                setEstadoUsuario(data.admin);
                if(data.admin === "true") {
                    //console.log("entra en true")
                }
                if(data.admin === "false") {
                    //console.log("entra en false")
                }
            }).catch((e) => {
                if(e.message === "Request failed with status code 400") {
                }
                if(e.message === 'Network Error') {
                    //console.log("No hay internet")
                    toast.error("Conexión al servidor no disponible");

                }
            })
        } catch (e) {

        }
    }, []);

    return (
        <>
            <LayoutPrincipal setRefreshCheckLogin={setRefreshCheckLogin}>
                {
                    estadoUsuario === "true" ?
                        (
                            <Redirect to="/Dashboard"/>
                        )
                        :
                        (
                            estadoUsuario === "false" &&
                                ( <Redirect to="/Dashboard"/> )
                        )
                }
            </LayoutPrincipal>
        </>
    );
}

export default Home;
