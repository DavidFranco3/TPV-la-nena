import {useEffect} from 'react';
import LayoutPrincipal from "../../layout/layoutPrincipal";
import {Redirect} from "react-router-dom";
import {getTokenApi, isExpiredToken, logoutApi} from "../../api/auth";
import {toast} from "react-toastify";

function Error404(props) {
    const { setRefreshCheckLogin } = props;

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

    return (
        <>
            <LayoutPrincipal setRefreshCheckLogin={setRefreshCheckLogin}>
                <Redirect to="/"/>
            </LayoutPrincipal>
        </>
    );
}

export default Error404;
