import { useState, useEffect, Suspense } from 'react';
import { listarPaginacionVentasActivas, totalVentasActivas, listarPaginacionVentasCanceladas, totalVentasCanceladas } from "../../api/ventas";
import { withRouter } from "../../utils/withRouter";
import "../../scss/styles.scss";
import { Alert, Col, Row, Spinner } from "react-bootstrap";
import ListVentas from "../../components/Ventas/ListVentas";
import { getTokenApi, isExpiredToken, logoutApi } from "../../api/auth";
import { toast } from "react-toastify";
import Lottie from "react-lottie-player";
import AnimacionLoading from "../../assets/json/loading.json";
import { Switch } from '@headlessui/react';

function Ventas(props) {
        const { setRefreshCheckLogin, location, navigate } = props;

        // Para definir el estado del switch
        const [estadoSwitch, setEstadoSwitch] = useState(true);

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
        }, []);
        // Termina cerrado de sesión automatico

        // Para almacenar las ventas realizadas
        const [listVentas, setListVentas] = useState(null);

        // Para controlar la paginación
        const [rowsPerPage, setRowsPerPage] = useState(10);
        const [page, setPage] = useState(1);
        const [noTotalVentas, setNoTotalVentas] = useState(1);

        // Para listar las ventas
        useEffect(() => {
                //console.log("Estado del switch ", estadoSwitch)
                try {
                        if (estadoSwitch) {
                                // Lista los productos activos
                                totalVentasActivas().then(response => {
                                        const { data } = response;
                                        setNoTotalVentas(data)
                                }).catch(e => {
                                        console.log(e)
                                })

                                if (page === 0) {
                                        setPage(1)

                                        listarPaginacionVentasActivas(page, rowsPerPage).then(response => {
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
                                        listarPaginacionVentasActivas(page, rowsPerPage).then(response => {
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
                        } else {
                                // Lista los productos obsoletos
                                totalVentasCanceladas().then(response => {
                                        const { data } = response;
                                        setNoTotalVentas(data)
                                }).catch(e => {
                                        console.log(e)
                                })

                                if (page === 0) {
                                        setPage(1)

                                        listarPaginacionVentasCanceladas(page, rowsPerPage).then(response => {
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
                                        listarPaginacionVentasCanceladas(page, rowsPerPage).then(response => {
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
                        }

                } catch (e) {
                        console.log(e)
                }
        }, [location, estadoSwitch, page, rowsPerPage]);

        return (
                <>
                        <Alert className="fondoPrincipalAlert">
                                <Row>
                                        <Col xs={12} md={4} className="titulo">
                                                <h1 className="font-bold">Historial general</h1>
                                        </Col>
                                </Row>
                        </Alert>

                        <Row>
                                <Col xs={12} md={8}>
                                        <h3 className="tituloSwitch">Estado de las ventas</h3>
                                </Col>
                                <Col xs={6} md={4}>
                                        <Switch
                                                title={estadoSwitch === true ? "Ver ventas canceladas" : "Ver ventas activas"}
                                                checked={estadoSwitch}
                                                onChange={setEstadoSwitch}
                                                className={`${estadoSwitch ? 'bg-teal-900' : 'bg-red-600'}
          relative inline-flex flex-shrink-0 h-[38px] w-[74px] border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
                                        >
                                                <span className="sr-only">Use setting</span>
                                                <span
                                                        aria-hidden="true"
                                                        className={`${estadoSwitch ? 'translate-x-9' : 'translate-x-0'}
            pointer-events-none inline-block h-[34px] w-[34px] rounded-full bg-white shadow-lg transform ring-0 transition ease-in-out duration-200`}
                                                />
                                        </Switch>
                                </Col>
                        </Row>

                        {
                                listVentas ?
                                        (
                                                <>
                                                        <Suspense fallback={< Spinner />}>
                                                                <ListVentas
                                                                        listVentas={listVentas}
                                                                        location={location}
                                                                        navigate={navigate}
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
