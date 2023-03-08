import { useState, useEffect, Suspense } from 'react';
import { listarPaginacionClientes, totalClientes } from "../../api/usuarios";
import { withRouter } from "../../utils/withRouter";
import "../../scss/styles.scss";
import { Alert, Col, Row, Button, Spinner } from "react-bootstrap";
import ListClientes from "../../components/Clientes/ListClientes";
import BasicModal from "../../components/Modal/BasicModal";
import { getTokenApi, isExpiredToken, logoutApi, obtenidusuarioLogueado } from "../../api/auth";
import { obtenerUsuario } from "../../api/usuarios";
import { LogsInformativosLogout } from '../../components/Logs/LogsSistema/LogsSistema';
import { toast } from "react-toastify";
import Lottie from "react-lottie-player";
import AnimacionLoading from "../../assets/json/loading.json";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus, faArrowCircleLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

function Clientes(props) {
        const { setRefreshCheckLogin, location, navigate } = props;

        // Para definir el enrutamiento
        const enrutamiento = useNavigate();

        const rutaRegreso = () => {
                enrutamiento("/")
        }

        // Para definir el estado del switch
        const [estadoSwitch, setEstadoSwitch] = useState(true);

        // Para hacer uso del modal
        const [showModal, setShowModal] = useState(false);
        const [contentModal, setContentModal] = useState(null);
        const [titulosModal, setTitulosModal] = useState(null);

        // Para la lista de abonos
        const registroUsuarios = (content) => {
                setTitulosModal("Registrar un usuario");
                setContentModal(content);
                setShowModal(true);
        }

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

        // Para almacenar los usuarios
        const [listClientes, setListClientes] = useState(null);

        // Para controlar la paginación
        const [rowsPerPage, setRowsPerPage] = useState(10);
        const [page, setPage] = useState(1);
        const [noTotalClientes, setNoTotalClientes] = useState(1);

        // Para listar los usuarios
        useEffect(() => {
                //console.log("Estado del switch ", estadoSwitch)
                try {

                        // Lista los productos activos
                        totalClientes().then(response => {
                                const { data } = response;
                                setNoTotalClientes(data)
                        }).catch(e => {
                                console.log(e)
                        })

                        if (page === 0) {
                                setPage(1)

                                listarPaginacionClientes(page, rowsPerPage).then(response => {
                                        const { data } = response;
                                        if (!listClientes && data) {
                                                setListClientes(formatModelClientes(data));
                                        } else {
                                                const datosClientes = formatModelClientes(data);
                                                setListClientes(datosClientes)
                                        }
                                }).catch(e => {
                                        console.log(e)
                                })
                        } else {
                                listarPaginacionClientes(page, rowsPerPage).then(response => {
                                        const { data } = response;
                                        if (!listClientes && data) {
                                                setListClientes(formatModelClientes(data));
                                        } else {
                                                const datosClientes = formatModelClientes(data);
                                                setListClientes(datosClientes)
                                        }
                                }).catch(e => {
                                        console.log(e)
                                })
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
                                                <h1 className="font-bold">Clientes</h1>
                                        </Col>
                                        <Col xs={6} md={8}>
                                                <div style={{ float: 'right' }}>
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

                        {
                                listClientes ?
                                        (
                                                <>
                                                        <Suspense fallback={< Spinner />}>
                                                                <ListClientes
                                                                        listClientes={listClientes}
                                                                        location={location}
                                                                        navigate={navigate}
                                                                        setRefreshCheckLogin={setRefreshCheckLogin}
                                                                        setRowsPerPage={setRowsPerPage}
                                                                        rowsPerPage={rowsPerPage}
                                                                        page={page}
                                                                        setPage={setPage}
                                                                        noTotalClientes={noTotalClientes}
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

function formatModelClientes(usuarios) {
        const tempUsuarios = []
        usuarios.forEach((usuario) => {
                tempUsuarios.push({
                        id: usuario._id,
                        nombre: usuario.nombre,
                        apellidos: usuario.apellidos,
                        telefono: usuario.telefono,
                        direccion: usuario.direccion,
                        usuario: usuario.usuario,
                        admin: usuario.admin,
                        correo: usuario.correo,
                        password: usuario.password,
                        foto: usuario.foto,
                        estadoUsuario: usuario.estadoUsuario,
                        fechaCreacion: usuario.createdAt,
                        fechaActualizacion: usuario.updatedAt
                });
        });
        return tempUsuarios;
}

export default withRouter(Clientes);
