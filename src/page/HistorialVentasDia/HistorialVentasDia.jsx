import { useState, useEffect, Suspense } from 'react';
import { listarDetallesVentasPorDia, listarPaginacionVentasDia } from "../../api/ventas";
import ListHistorialVentasDia from "../../components/HistorialVentasDia/ListHistorialVentasDia";
import moment from "moment";
import {getTokenApi, isExpiredToken, logoutApi} from "../../api/auth";
import {toast} from "react-toastify";
import "./HistorialVentasDia.scss";
import {Spinner} from "react-bootstrap";
import Lottie from "react-lottie-player";
import AnimacionLoading from "../../assets/json/loading.json";

function HistorialVentasDia(props) {
    const { dia, setRefreshCheckLogin, location, history } = props;

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

    //console.log(dia)
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [page, setPage] = useState(1);
    const [noTotalVentas, setNoTotalVentas] = useState(1);
    
    // Para guardar el listado de detalles de las ventas del dia
    const [listDetallesDia, setListDetallesDia] = useState(null);

                useEffect(() => {
                try {
                listarDetallesVentasPorDia(dia).then(response => {
                const { data } = response;
                        setNoTotalVentas(data)
                }).catch(e => {
                console.log(e)
                })

                        if (page === 0) {
                setPage(1)

                        listarPaginacionVentasDia(page, rowsPerPage, dia).then(response => {
                const { data } = response;
                        if (!listDetallesDia && data) {
                setListDetallesDia(formatModelVentas(data));
                } else {
                const datosVentas = formatModelVentas(data);
                        setListDetallesDia(datosVentas)
                }
                }).catch(e => {
                console.log(e)
                })
                } else {
                listarPaginacionVentasDia(page, rowsPerPage, dia).then(response => {
                const { data } = response;
                        //console.log(data)

                        if (!listDetallesDia && data) {
                setListDetallesDia(formatModelVentas(data));
                } else {
                const datosVentas = formatModelVentas(data);
                        setListDetallesDia(datosVentas)
                }
                }).catch(e => {
                console.log(e)
                })
                }
                } catch (e) {
                console.log(e)
                }

                }, [dia, location, page, rowsPerPage]);


    return (
        <>
            {
                listDetallesDia ?
                    (
                        <>
                <Suspense fallback={ < Spinner / > }>
                            <div className="diaHistorial">
                                {moment(dia).format('LL')}
                            </div>
                            <ListHistorialVentasDia
                                listDetallesDia={listDetallesDia}
                                dia={dia}
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
                                        total: parseInt(venta.total),
                                        subtotal: parseInt(venta.subtotal),
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

export default HistorialVentasDia;