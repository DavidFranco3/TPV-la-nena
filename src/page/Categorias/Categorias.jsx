import { useState, useEffect, Suspense } from 'react';
import LayoutPrincipal from "../../layout/layoutPrincipal";
import { listarPaginacionCategorias, totalCategorias } from "../../api/categorias";
import { withRouter } from "react-router-dom";
import "./Categorias.scss";
import BasicModal from "../../components/Modal/BasicModal";
import ListCategorias from "../../components/Categorias/ListCategorias";
import {getTokenApi, isExpiredToken, logoutApi} from "../../api/auth";
import {toast} from "react-toastify";
import {Spinner, Button, Col, Row, Alert} from "react-bootstrap";
import RegistroCategorias from "../../components/Categorias/RegistroCategorias";
import {faCirclePlus} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Lottie from "react-lottie-player";
import AnimacionLoading from "../../assets/json/loading.json";

function Categorias(props) {
    const { setRefreshCheckLogin, location, history } = props;
    
    const [showModal, setShowModal] = useState(false);
    const [contentModal, setContentModal] = useState(null);
    const [titulosModal, setTitulosModal] = useState(null);

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
    
        // Para la lista de abonos
    const registroCategorias = (content) => {
        setTitulosModal("Registrar una categoría");
        setContentModal(content);
        setShowModal(true);
    }

    // Para guardar el listado de categorias
    const [listCategorias, setListCategorias] = useState(null);
    
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [page, setPage] = useState(1);
    const [noTotalCategorias, setNoTotalCategorias] = useState(1);

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

                }, [location, page, rowsPerPage]);


    return (
        <>
            <LayoutPrincipal setRefreshCheckLogin={setRefreshCheckLogin}>
            <Alert className="fondoPrincipalAlert">
        <Row>
          <Col xs={12} md={4} className="titulo">
            <h1 className="font-bold">Categorías</h1>
          </Col>
          <Col xs={6} md={8}>
          <div style={{ float: 'right' }}>
          <Button
                title="Registrar una nueva categoría"
                className="btnRegistro"
                onClick={() => {
                   registroCategorias(
                      <RegistroCategorias
                         setShowModal={setShowModal}
                         location={location}
                          history={history}
                          />
                  )
                }}
              >
                <FontAwesomeIcon icon={faCirclePlus} /> Registrar una categoría
              </Button>
          </div>
          </Col>
        </Row>
      </Alert>
                {
                    listCategorias ?
                        (
                            <>
                    <Suspense fallback={ < Spinner / > }>
                                <ListCategorias
                                    setRefreshCheckLogin={setRefreshCheckLogin}
                                    listCategorias={listCategorias}
                                    location={location}
                                    history={history}
                                    setRowsPerPage={setRowsPerPage}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    setPage={setPage}
                                    noTotalCategorias={noTotalCategorias}
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

export default withRouter(Categorias);
