import { useState, useEffect, Suspense } from 'react';
import { listarPaginacionPedidosActivas, totalPedidosActivas, listarPaginacionPedidosCanceladas, totalPedidosCanceladas } from "../../api/pedidosClientes";
import { withRouter } from "../../utils/withRouter";
import "../../scss/styles.scss";
import { Alert, Col, Row, Button, Spinner } from "react-bootstrap";
import ListPedidos from "../../components/PedidosClientes/ListPedidos";
import { getTokenApi, isExpiredToken, logoutApi, obtenidusuarioLogueado } from "../../api/auth";
import { obtenerUsuario } from "../../api/usuarios";
import { LogsInformativosLogout } from '../../components/Logs/LogsSistema/LogsSistema';
import { toast } from "react-toastify";
import Lottie from "react-lottie-player";
import AnimacionLoading from "../../assets/json/loading.json";
import { Switch } from '@headlessui/react';
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus, faArrowCircleLeft } from "@fortawesome/free-solid-svg-icons";

function PedidosClientes(props) {
        const { setRefreshCheckLogin, location, navigate } = props;

        // Para definir el enrutamiento
        const enrutamiento = useNavigate();

        const rutaRegreso = () => {
                enrutamiento("/")
        }

        const rutaRegistroVenta = () => {
                enrutamiento("/TerminalPedidos")
        }

        // Para definir el estado del switch
        const [estadoSwitch, setEstadoSwitch] = useState(true);

        const [datosUsuario, setDatosUsuario] = useState("");

        useEffect(() => {
                try {
                        obtenerUsuario(obtenidusuarioLogueado(getTokenApi())).then(response => {
                                const { data } = response;
                                //console.log(data)
                                setDatosUsuario(data);
                        }).catch((e) => {
                                if (e.message === 'Network Error') {
                                        //console.log("No hay internet")
                                        toast.error("Conexión al servidor no disponible");
                                }
                        })
                } catch (e) {
                        console.log(e)
                }
        }, []);

        // Cerrado de sesión automatico
        useEffect(() => {
                if (getTokenApi()) {
                        if (isExpiredToken(getTokenApi())) {
                                LogsInformativosLogout("Sesión finalizada", datosUsuario, setRefreshCheckLogin);
                                logoutApi();
                                setRefreshCheckLogin(true);
                                toast.warning('Sesión expirada');
                                toast.success('Sesión cerrada por seguridad');
                        }
                }
        }, [])

        // Para almacenar las ventas realizadas
        const [listPedidos, setListPedidos] = useState(null);

        // Para controlar la paginación
        const [rowsPerPage, setRowsPerPage] = useState(10);
        const [page, setPage] = useState(1);
        const [noTotalPedidos, setNoTotalPedidos] = useState(1);

        // Para listar las ventas
        useEffect(() => {
                //console.log("Estado del switch ", estadoSwitch)
                try {
                        if (estadoSwitch) {
                                // Lista los productos activos
                                totalPedidosActivas().then(response => {
                                        const { data } = response;
                                        setNoTotalPedidos(data);
                                }).catch(e => {
                                        console.log(e)
                                })

                                if (page === 0) {
                                        setPage(1)

                                        listarPaginacionPedidosActivas(page, rowsPerPage).then(response => {
                                                const { data } = response;
                                                if (!listPedidos && data) {
                                                        setListPedidos(formatModelPedidos(data));
                                                } else {
                                                        const datosPedidos = formatModelPedidos(data);
                                                        setListPedidos(datosPedidos)
                                                }
                                        }).catch(e => {
                                                console.log(e)
                                        })
                                } else {
                                        listarPaginacionPedidosActivas(page, rowsPerPage).then(response => {
                                                const { data } = response;
                                                if (!listPedidos && data) {
                                                        setListPedidos(formatModelPedidos(data));
                                                } else {
                                                        const datosPedidos = formatModelPedidos(data);
                                                        setListPedidos(datosPedidos)
                                                }
                                        }).catch(e => {
                                                console.log(e)
                                        })
                                }
                        } else {
                                // Lista los productos obsoletos
                                totalPedidosCanceladas().then(response => {
                                        const { data } = response;
                                        setNoTotalPedidos(data);
                                }).catch(e => {
                                        console.log(e)
                                })

                                if (page === 0) {
                                        setPage(1)

                                        listarPaginacionPedidosCanceladas(page, rowsPerPage).then(response => {
                                                const { data } = response;
                                                if (!listPedidos && data) {
                                                        setListPedidos(formatModelPedidos(data));
                                                } else {
                                                        const datosPedidos = formatModelPedidos(data);
                                                        setListPedidos(datosPedidos)
                                                }
                                        }).catch(e => {
                                                console.log(e)
                                        })
                                } else {
                                        listarPaginacionPedidosCanceladas(page, rowsPerPage).then(response => {
                                                const { data } = response;
                                                if (!listPedidos && data) {
                                                        setListPedidos(formatModelPedidos(data));
                                                } else {
                                                        const datosPedidos = formatModelPedidos(data);
                                                        setListPedidos(datosPedidos)
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
                                                <h1 className="font-bold">Pedidos de clientes</h1>
                                        </Col>
                                        <Col xs={6} md={8}>
                                                <div style={{ float: 'right' }}>
                                                        <Button
                                                                title="Ir a la terminal de pedidos"
                                                                className="btnRegistro"
                                                                style={{ marginRight: '10px' }}
                                                                onClick={() => {
                                                                        rutaRegistroVenta();
                                                                }}
                                                        >
                                                                <FontAwesomeIcon icon={faCirclePlus} /> Registrar
                                                        </Button>
                                                        <Button
                                                                title="Regresar a la pagina anterior"
                                                                className="btnRegistro"
                                                                style={{ marginRight: '10px' }}
                                                                onClick={() => {
                                                                        rutaRegreso();
                                                                }}
                                                        >
                                                                <FontAwesomeIcon icon={faArrowCircleLeft} /> Regresar
                                                        </Button>
                                                </div>
                                        </Col>
                                </Row>
                        </Alert>
                        <Row>
                                <Col xs={12} md={8}>
                                        <h3 className="tituloSwitch">Estado de los pedidos</h3>
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
                                listPedidos ?
                                        (
                                                <>
                                                        <Suspense fallback={< Spinner />}>
                                                                <ListPedidos
                                                                        listPedidos={listPedidos}
                                                                        location={location}
                                                                        navigate={navigate}
                                                                        setRefreshCheckLogin={setRefreshCheckLogin}
                                                                        setRowsPerPage={setRowsPerPage}
                                                                        rowsPerPage={rowsPerPage}
                                                                        page={page}
                                                                        setPage={setPage}
                                                                        noTotalPedidos={noTotalPedidos}
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

function formatModelPedidos(ventas) {
        const tempVentas = []
        ventas.forEach((venta) => {
                tempVentas.push({
                        id: venta._id,
                        numeroTiquet: venta.numeroTiquet,
                        cliente: venta.cliente,
                        usuario: venta.usuario,
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

export default withRouter(PedidosClientes);
