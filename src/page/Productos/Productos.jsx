import { useState, useEffect, Suspense } from 'react';
import LayoutPrincipal from "../../layout/layoutPrincipal";
import { useHistory, withRouter } from "react-router-dom";
import {getTokenApi, isExpiredToken, logoutApi, obtenidusuarioLogueado} from "../../api/auth";
import {toast} from "react-toastify";
import {obtenerUsuario} from "../../api/usuarios";
import { listarPaginacionProductos, totalProductos } from "../../api/productos";
import ListProductos from "../../components/Productos/ListProductos";
import {listarPaginacionCategorias, totalCategorias} from "../../api/categorias";
import {Spinner, Button, Col, Row, Alert} from "react-bootstrap";
import RegistrarProducto from "../../components/Productos/RegistraProductos/";
import BasicModal from "../../components/Modal/BasicModal";
import {faCirclePlus} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Lottie from "react-lottie-player";
import AnimacionLoading from "../../assets/json/loading.json";

function Productos(props) {
    const { setRefreshCheckLogin, location, history } = props;
    
    // Para hacer uso del modal
    const [showModal, setShowModal] = useState(false);
    const [contentModal, setContentModal] = useState(null);
    const [titulosModal, setTitulosModal] = useState(null);
    
        // Para la lista de abonos
    const registroProductos = (content) => {
        setTitulosModal("Registrar un producto");
        setContentModal(content);
        setShowModal(true);
    }
    
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
    
    // Guarda el listado de productos
    const [listProductos, setListProductos] = useState(null);
        // Para guardar el listado de categorias
    const [listCategorias, setListCategorias] = useState(null);
    
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [page, setPage] = useState(1);
    const [noTotalProductos, setNoTotalProductos] = useState(1);
    const [noTotalCategorias, setNoTotalCategorias] = useState(1);

    // obtener el listado de productos
    useEffect(() => {
                try {
                totalProductos().then(response => {
                const { data } = response;
                        setNoTotalProductos(data)
                }).catch(e => {
                console.log(e)
                })

                        if (page === 0) {
                setPage(1)

                        listarPaginacionProductos(page, rowsPerPage).then(response => {
                const { data } = response;
                        if (!listProductos && data) {
                setListProductos(formatModelProductos(data));
                } else {
                const datosProductos = formatModelProductos(data);
                        setListProductos(datosProductos)
                }
                }).catch(e => {
                console.log(e)
                })
                } else {
                listarPaginacionProductos(page, rowsPerPage).then(response => {
                const { data } = response;
                        //console.log(data)

                        if (!listProductos && data) {
                setListProductos(formatModelProductos(data));
                } else {
                const datosProductos = formatModelProductos(data);
                        setListProductos(datosProductos)
                }
                }).catch(e => {
                console.log(e)
                })
                }
                } catch (e) {
                console.log(e)
                }

                }, [location, page, rowsPerPage]);

    useEffect(() => {
                try {
                totalCategorias().then(response => {
                const { data } = response;
                        setNoTotalCategorias(data)
                }).catch(e => {
                console.log(e)
                })

                        if (page === 0) {
                setPage(1)

                        listarPaginacionCategorias(page, rowsPerPage).then(response => {
                const { data } = response;
                        if (!listCategorias && data) {
                setListCategorias(formatModelCategorias(data));
                } else {
                const datosCategorias = formatModelCategorias(data);
                        setListCategorias(datosCategorias)
                }
                }).catch(e => {
                console.log(e)
                })
                } else {
                listarPaginacionCategorias(page, rowsPerPage).then(response => {
                const { data } = response;
                        //console.log(data)

                        if (!listCategorias && data) {
                setListCategorias(formatModelCategorias(data));
                } else {
                const datosCategorias = formatModelCategorias(data);
                        setListCategorias(datosCategorias)
                }
                }).catch(e => {
                console.log(e)
                })
                }
                } catch (e) {
                console.log(e)
                }

                }, [location]);


    return (
        <>
            <LayoutPrincipal setRefreshCheckLogin={setRefreshCheckLogin}>
            <Alert className="fondoPrincipalAlert">
        <Row>
          <Col xs={12} md={4} className="titulo">
            <h1 className="font-bold">Productos</h1>
          </Col>
                    <Col xs={6} md={8}>
          <div style={{ float: 'right' }}>

          <Button
                title="Registrar un nuevo producto" 
                className="btnRegistro"
                onClick={() => {
                   registroProductos(
                      <RegistrarProducto
                         setShowModal={setShowModal}
                         location={location}
                         history={history}
                         listCategorias={listCategorias}
                          />
                  )
                }}
              >
                <FontAwesomeIcon icon={faCirclePlus} /> Registrar un producto
              </Button>

          </div>
          </Col>
        </Row>
      </Alert>
                {
                    listProductos ?
                        (
                            <>
                    <Suspense fallback={ < Spinner / > }>
                                <ListProductos
                                    setRefreshCheckLogin={setRefreshCheckLogin}
                                    listProductos={listProductos}
                                    listCategorias={listCategorias}
                                    location={location}
                                    history={history}
                                    setRowsPerPage={setRowsPerPage}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    setPage={setPage}
                                    noTotalProductos={noTotalProductos}
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
            <BasicModal show={showModal} setShow={setShowModal} title={titulosModal}>
                {contentModal}
            </BasicModal>
        </>
    );
}

function formatModelProductos(productos) {
    const tempProductos = []
    productos.forEach((producto) => {
        tempProductos.push({
            id: producto._id,
            nombre: producto.nombre,
            categoria: producto.categoria,
            negocio: producto.negocio,
            precio: parseInt(producto.precio),
            imagen: producto.imagen,
            fechaCreacion: producto.createdAt,
            fechaActualizacion: producto.updatedAt
        });
    });
    return tempProductos;
}

function formatModelCategorias(categorias) {
    const tempCategorias = []
    categorias.forEach((categoria) => {
        tempCategorias.push({
            id: categoria._id,
            nombre: categoria.nombre,
            negocio: categoria.negocio,
            imagen: categoria.imagen,
            fechaCreacion: categoria.createdAt,
            fechaActualizacion: categoria.updatedAt
        });
    });
    return tempCategorias;
}

export default withRouter(Productos);
