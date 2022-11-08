import { useState, useEffect, Suspense } from 'react';
import LayoutPrincipal from "../../layout/layoutPrincipal";
import { listarPaginacionVentas, totalVentas } from "../../api/ventas";
import { withRouter } from "react-router-dom";
import "./Ventas.scss";
import {Alert, Col, Row, Spinner} from "react-bootstrap";
import ListVentas from "../../components/Ventas/ListVentas";
import {getTokenApi, isExpiredToken, logoutApi} from "../../api/auth";
import {toast} from "react-toastify";
import Lottie from "react-lottie-player";
import AnimacionLoading from "../../assets/json/loading.json";
        function Ventas(props) {
        const { setRefreshCheckLogin, location, history } = props;
                // Cerrado de sesión automatico
                useEffect(() => {
                if (getTokenApi()) {
                if (isExpiredToken(getTokenApi())) {
                toast.warning("Sesión expirada");
                        toast.success("Sesión cerrada por seguridad");
                        logoutApi();
                        setRefreshCheckLogin(true);
                }
                }
                }, [setRefreshCheckLogin]);
                // Termina cerrado de sesión automatico

                // Para almacenar las ventas realizadas
                const [listVentas, setListVentas] = useState(null);
                // Para controlar la paginación

                const [rowsPerPage, setRowsPerPage] = useState(10);
                const [page, setPage] = useState(1);
                const [noTotalVentas, setNoTotalVentas] = useState(1);
                useEffect(() => {
                try {
                totalVentas().then(response => {
                const { data } = response;
                        setNoTotalVentas(data)
                }).catch(e => {
                console.log(e)
                })

                        if (page === 0) {
                setPage(1)

                        listarPaginacionVentas(page, rowsPerPage).then(response => {
                const { data } = response;
                        if (!listVentas && data) {
                setListVentas(formatModelVentas(data));
                } else {
                const datosVentas = formatModelVentas(data);
                        setListVentas(datosVentas)
                }
                }).catch(e => {
                console.log(e)
                })
                } else {
                listarPaginacionVentas(page, rowsPerPage).then(response => {
                const { data } = response;
                        //console.log(data)

                        if (!listVentas && data) {
                setListVentas(formatModelVentas(data));
                } else {
                const datosVentas = formatModelVentas(data);
                        setListVentas(datosVentas)
                }
                }).catch(e => {
                console.log(e)
                })
                }
                } catch (e) {
                console.log(e)
                }

                }, [location, page, rowsPerPage]);
                return (
                        <>
<LayoutPrincipal setRefreshCheckLogin={setRefreshCheckLogin}>
    <Alert className="fondoPrincipalAlert">
        <Row>
            <Col xs={12} md={4} className="titulo">
            <h1 className="font-bold">Historial general</h1>
            </Col>
        </Row>
    </Alert>

    {
                        listVentas ?
                        (
                                <>
    <Suspense fallback={ < Spinner / > }>
        <ListVentas   
            listVentas={listVentas}
            location={location}
            history={history}
            setRefreshCheckLogin={setRefreshCheckLogin}
            setRowsPerPage={setRowsPerPage}
            rowsPerPage={rowsPerPage}
            page={page}
            setPage={setPage}
            noTotalVentas={noTotalVentas}
            />
    </Suspense>
    </>
    )
    :
    (
    <>
    <Lottie loop={true} play={true} animationData={AnimacionLoading} />
    </>
    )
    }
</LayoutPrincipal>
</>
);
}

function formatModelVentas(ventas) {
                                const tempVentas = []
                                ventas.forEach((venta) => {
                                tempVentas.push({
                                id: venta._id,
                                        numeroTiquet: venta.numeroTiquet,
                                        cliente: venta.cliente,
                                        productosVendidos: venta.productos.length,
                                        articulosVendidos: venta.productos,
                                        detalles: venta.detalles,
                                        tipoPago: venta.tipoPago,
                                        efectivo: venta.efectivo,
                                        cambio: venta.cambio,
                                        total: parseFloat(venta.total),
                                        subtotal: parseFloat(venta.subtotal),
                                        iva: parseFloat(venta.iva),
                                        comision: parseFloat(venta.comision),
                                        hacerPedido: venta.hacerPedido,
                                        tipoPedido: venta.tipoPedido,
                                        estado: venta.estado,
                                        fechaCreacion: venta.createdAt,
                                        fechaActualizacion: venta.updatedAt
                                });
                                });
                                return tempVentas;
}

export default withRouter(Ventas);
