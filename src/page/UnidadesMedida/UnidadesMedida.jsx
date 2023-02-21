import { useState, useEffect, Suspense } from 'react';
import "../../scss/styles.scss";
import { Alert, Button, Col, Row, Spinner } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus, faArrowCircleLeft } from "@fortawesome/free-solid-svg-icons";
import { listarPaginacionUMActivas, totalUMActivas, listarPaginacionUMCanceladas, totalUMCanceladas } from "../../api/unidadesMedida";
import { withRouter } from "../../utils/withRouter";
import ListUnidadesMedida from "../../components/UnidadesMedida/ListUnidadesMedida";
import BasicModal from "../../components/Modal/BasicModal";
import RegistroUnidadesMedida from "../../components/UnidadesMedida/Registro";
import { getTokenApi, isExpiredToken, logoutApi, obtenidusuarioLogueado } from "../../api/auth";
import { obtenerUsuario } from "../../api/usuarios";
import { LogsInformativosLogout } from '../../components/Logs/LogsSistema/LogsSistema';
import { toast } from "react-toastify";
import Lottie from 'react-lottie-player';
import AnimacionLoading from '../../assets/json/loading.json';
import { Switch } from '@headlessui/react';
import { useNavigate } from "react-router-dom";

function UnidadesMedida(props) {
    const { setRefreshCheckLogin, location, navigate } = props;

    // Para definir el enrutamiento
    const enrutamiento = useNavigate();

    const rutaRegreso = () => {
        enrutamiento("/")
    }

    // Para almacenar los departamentos
    const [listUM, setListUM] = useState(null);

    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [page, setPage] = useState(1);
    const [noTotalUM, setNoTotalUM] = useState(1);

    // Para definir el estado del switch
    const [estadoSwitch, setEstadoSwitch] = useState(true);

    // Para hacer uso del modal
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

    // obtener el listado de productos
    useEffect(() => {
        //console.log("Estado del switch ", estadoSwitch)
        try {
            if (estadoSwitch) {
                // Lista los productos activos
                totalUMActivas().then(response => {
                    const { data } = response;
                    setNoTotalUM(data)
                }).catch(e => {
                    console.log(e)
                })

                if (page === 0) {
                    setPage(1)

                    listarPaginacionUMActivas(page, rowsPerPage).then(response => {
                        const { data } = response;
                        if (!listUM && data) {
                            setListUM(formatModelUM(data));
                        } else {
                            const datosUM = formatModelUM(data);
                            setListUM(datosUM)
                        }
                    }).catch(e => {
                        console.log(e)
                    })
                } else {
                    listarPaginacionUMActivas(page, rowsPerPage).then(response => {
                        const { data } = response;
                        if (!listUM && data) {
                            setListUM(formatModelUM(data));
                        } else {
                            const datosUM = formatModelUM(data);
                            setListUM(datosUM)
                        }
                    }).catch(e => {
                        console.log(e)
                    })
                }
            } else {
                // Lista los productos obsoletos
                totalUMCanceladas().then(response => {
                    const { data } = response;
                    setNoTotalUM(data)
                }).catch(e => {
                    console.log(e)
                })

                if (page === 0) {
                    setPage(1)

                    listarPaginacionUMCanceladas(page, rowsPerPage).then(response => {
                        const { data } = response;
                        if (!listUM && data) {
                            setListUM(formatModelUM(data));
                        } else {
                            const datosUM = formatModelUM(data);
                            setListUM(datosUM)
                        }
                    }).catch(e => {
                        console.log(e)
                    })
                } else {
                    listarPaginacionUMCanceladas(page, rowsPerPage).then(response => {
                        const { data } = response;
                        //console.log(data)

                        if (!listUM && data) {
                            setListUM(formatModelUM(data));
                        } else {
                            const datosUM = formatModelUM(data);
                            setListUM(datosUM)
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

    // Para guardar un nuevo dato
    const registraUM = (content) => {
        setTitulosModal("Registrar UM");
        setContentModal(content);
        setShowModal(true);
    }

    return (
        <>
            <Alert>
                <Row>
                    <Col xs={12} md={4}>
                        <h1 className="font-bold">
                            Unidades de medida
                        </h1>
                    </Col>
                    <Col xs={6} md={8}>
                        <div style={{ float: 'right' }}>
                            <Button
                                className="btnRegistro"
                                style={{ marginRight: '10px' }}
                                title="Registrar una nueva unidad de medida"
                                onClick={() => {
                                    registraUM(
                                        <RegistroUnidadesMedida
                                            setShowModal={setShowModal}
                                            navigate={navigate}
                                            location={location}
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
                    <h3 className="tituloSwitch">Estado de las unidades de medida</h3>
                </Col>
                <Col xs={6} md={4}>
                    <Switch
                        title={estadoSwitch === true ? "Ver UM canceladas" : "Ver UM activas"}
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
                listUM ?
                    (
                        <>
                            <Suspense fallback={<Spinner />}>
                                <ListUnidadesMedida
                                    setRefreshCheckLogin={setRefreshCheckLogin}
                                    listUM={listUM}
                                    location={location}
                                    navigate={navigate}
                                    setRowsPerPage={setRowsPerPage}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    setPage={setPage}
                                    noTotalUM={noTotalUM}
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

function formatModelUM(data) {
    //console.log(data)
    const dataTemp = []
    data.forEach(data => {
        dataTemp.push({
            id: data._id,
            nombre: data.nombre,
            abreviatura: data.abreviatura,
            tipo: data.tipo,
            estadoUM: data.estadoUM,
            fechaCreacion: data.createdAt,
            fechaActualizacion: data.updatedAt
        });
    });
    return dataTemp;
}

export default withRouter(UnidadesMedida);
