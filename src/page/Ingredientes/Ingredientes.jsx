import { useState, useEffect, Suspense } from 'react';
import { listarPaginacionIngredientesActivos, totalIngredientesActivos, listarPaginacionIngredientesCancelados, totalIngredientesCancelados } from "../../api/ingredientes";
import { withRouter } from "../../utils/withRouter";
import "../../scss/styles.scss";
import BasicModal from "../../components/Modal/BasicModal";
import ListIngredientes from "../../components/Ingredientes/ListIngredientes";
import { getTokenApi, isExpiredToken, logoutApi, obtenidusuarioLogueado } from "../../api/auth";
import { obtenerUsuario } from "../../api/usuarios";
import { LogsInformativosLogout } from '../../components/Logs/LogsSistema/LogsSistema';
import { toast } from "react-toastify";
import { Spinner, Button, Col, Row, Alert } from "react-bootstrap";
import RegistroIngredientes from "../../components/Ingredientes/RegistroIngredientes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus, faArrowCircleLeft } from "@fortawesome/free-solid-svg-icons";
import Lottie from "react-lottie-player";
import AnimacionLoading from "../../assets/json/loading.json";
import { Switch } from '@headlessui/react';
import { useNavigate } from "react-router-dom";

function Ingredientes(props) {
    const { setRefreshCheckLogin, location, navigate } = props;

    // Para definir el enrutamiento
    const enrutamiento = useNavigate();

    const rutaRegreso = () => {
        enrutamiento("/")
    }

    // Para definir el estado del switch
    const [estadoSwitch, setEstadoSwitch] = useState(true);

    const [showModal, setShowModal] = useState(false);
    const [contentModal, setContentModal] = useState(null);
    const [titulosModal, setTitulosModal] = useState(null);

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
                toast.warning('Sesión expirada');
                toast.success('Sesión cerrada por seguridad');
            }
        }
    }, [])
    // Termina cerrado de sesión automatico

    // Para la lista de abonos
    const registroIngredientes = (content) => {
        setTitulosModal("Registrar un ingrediente");
        setContentModal(content);
        setShowModal(true);
    }

    // Para guardar el listado de categorias
    const [listIngredientes, setListIngredientes] = useState(null);

    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [page, setPage] = useState(1);
    const [noTotalIngredientes, setNoTotalIngredientes] = useState(1);

    useEffect(() => {
        //console.log("Estado del switch ", estadoSwitch)
        try {
            if (estadoSwitch) {
                // Lista los productos activos
                totalIngredientesActivos().then(response => {
                    const { data } = response;
                    setNoTotalIngredientes(data)
                }).catch(e => {
                    console.log(e)
                })

                if (page === 0) {
                    setPage(1)

                    listarPaginacionIngredientesActivos(page, rowsPerPage).then(response => {
                        const { data } = response;
                        if (!listIngredientes && data) {
                            setListIngredientes(formatModelIngredientes(data));
                        } else {
                            const datosIngredientes = formatModelIngredientes(data);
                            setListIngredientes(datosIngredientes)
                        }
                    }).catch(e => {
                        console.log(e)
                    })
                } else {
                    listarPaginacionIngredientesActivos(page, rowsPerPage).then(response => {
                        const { data } = response;
                        //console.log(data)
                        if (!listIngredientes && data) {
                            setListIngredientes(formatModelIngredientes(data));
                        } else {
                            const datosIngredientes = formatModelIngredientes(data);
                            setListIngredientes(datosIngredientes)
                        }
                    }).catch(e => {
                        console.log(e)
                    })
                }
            } else {
                // Lista los productos obsoletos
                totalIngredientesCancelados().then(response => {
                    const { data } = response;
                    setNoTotalIngredientes(data)
                }).catch(e => {
                    console.log(e)
                })

                if (page === 0) {
                    setPage(1)

                    listarPaginacionIngredientesCancelados(page, rowsPerPage).then(response => {
                        const { data } = response;
                        if (!listIngredientes && data) {
                            setListIngredientes(formatModelIngredientes(data));
                        } else {
                            const datosIngredientes = formatModelIngredientes(data);
                            setListIngredientes(datosIngredientes)
                        }
                    }).catch(e => {
                        console.log(e)
                    })
                } else {
                    listarPaginacionIngredientesCancelados(page, rowsPerPage).then(response => {
                        const { data } = response;
                        //console.log(data)
                        if (!listIngredientes && data) {
                            setListIngredientes(formatModelIngredientes(data));
                        } else {
                            const datosIngredientes = formatModelIngredientes(data);
                            setListIngredientes(datosIngredientes)
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
                        <h1 className="font-bold">Ingredientes</h1>
                    </Col>
                    <Col xs={6} md={8}>
                        <div style={{ float: 'right' }}>
                            <Button
                                title="Registrar un nuevo ingrediente"
                                className="btnRegistro"
                                style={{ marginRight: '10px' }}
                                onClick={() => {
                                    registroIngredientes(
                                        <RegistroIngredientes
                                            setShowModal={setShowModal}
                                            location={location}
                                            navigate={navigate}
                                        />
                                    )
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
                    <h3 className="tituloSwitch">Estado de los ingredientes</h3>
                </Col>
                <Col xs={6} md={4}>
                    <Switch
                        title={estadoSwitch === true ? "Ver ingredientes cancelados" : "Ver ingredientes activos"}
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
                listIngredientes ?
                    (
                        <>
                            <Suspense fallback={< Spinner />}>
                                <ListIngredientes
                                    setRefreshCheckLogin={setRefreshCheckLogin}
                                    listIngredientes={listIngredientes}
                                    location={location}
                                    navigate={navigate}
                                    setRowsPerPage={setRowsPerPage}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    setPage={setPage}
                                    noTotalIngredientes={noTotalIngredientes}
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
            <BasicModal show={showModal} setShow={setShowModal} title={titulosModal}>
                {contentModal}
            </BasicModal>
        </>
    );
}

function formatModelIngredientes(ingredientes) {
    const tempIngredientes = []
    ingredientes.forEach((ingrediente) => {
        tempIngredientes.push({
            id: ingrediente._id,
            nombre: ingrediente.nombre,
            umPrimaria: ingrediente.umPrimaria,
            costoUMPrimaria: parseFloat(ingrediente.costoUMPrimaria),
            tipo: ingrediente.tipo,
            umSecundaria: ingrediente.umSecundaria,
            cantidadPiezas: ingrediente.cantidadPiezas,
            costoUMSecundaria: parseFloat(ingrediente.costoUMSecundaria),
            negocio: ingrediente.negocio,
            imagen: ingrediente.imagen,
            estado: ingrediente.estado,
            fechaCreacion: ingrediente.createdAt,
            fechaActualizacion: ingrediente.updatedAt
        });
    });
    return tempIngredientes;
}

export default withRouter(Ingredientes);
