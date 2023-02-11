import { useState, useEffect } from 'react';
import { withRouter } from "../../utils/withRouter";
import Menu from "../../components/TerminalPV/Menu";
import Tiquet from "../../components/TerminalPV/Tiquet";
import "../../scss/styles.scss";
import { listarProductosCategoria } from "../../api/productos";
import { Alert, Col, Row } from "react-bootstrap";
import { listarCategorias } from "../../api/categorias";
import { getTokenApi, isExpiredToken, logoutApi } from "../../api/auth";
import { toast } from "react-toastify";
import Lottie from "react-lottie-player";
import AnimacionLoading from "../../assets/json/loading.json";

function TerminalPv(props) {
    const { setRefreshCheckLogin } = props;

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

    const [ticketItems, setTicketItems] = useState([]);

    const [categoriaActual, setCategoriaActual] = useState("");

    const emptyTicket = () => {
        setTicketItems([]);
    }

    const addItems = (product) => {
        setTicketItems(
            [...ticketItems, product]
        );
    }

    const removeProduct = (item) => {
        let newArray = ticketItems;
        newArray.splice(newArray.findIndex(a => a.nombre === item.nombre), 1);
        setTicketItems([...newArray]);
    }

    // Para almacenar la lista de productos
    const [listProductos, setListProductos] = useState(null);

    // obtener el listado de productos
    useEffect(() => {
        //console.log("la categoria actual ", categoriaActual)
        try {
            // listarProductosCategoria(categoriaActual)
            // listarProductos()
            listarProductosCategoria(categoriaActual).then(response => {
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
        } catch (e) {
            console.log(e)
        }
    }, [categoriaActual]);

    // Para guardar el listado de categorias
    const [listCategorias, setListCategorias] = useState(null);

    useEffect(() => {
        try {
            listarCategorias().then(response => {
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
        } catch (e) {
            console.log(e)
        }
    }, []);

    return (
        <>
                <Alert className="fondoPrincipalAlert">
                    <Row>
                        <Col xs={12} md={4} className="titulo">
                            <h1 className="font-bold">Ventas</h1>
                        </Col>
                    </Row>
                </Alert>

                {
                    listProductos && listCategorias ?
                        (
                            <>
                                <div className="app">
                                    <div className="pos">
                                        <Tiquet
                                            products={ticketItems}
                                            empty={emptyTicket}
                                            remove={removeProduct}
                                        />
                                        <Menu
                                            addItems={addItems}
                                            listProductos={listProductos}
                                            listCategorias={listCategorias}
                                            setCategoriaActual={setCategoriaActual}
                                            categoriaActual={categoriaActual}
                                        />
                                    </div>
                                </div>

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

function formatModelProductos(productos) {
    const tempProductos = []
    productos.forEach((producto) => {
        tempProductos.push({
            nombre: producto.nombre,
            categoria: producto.categoria,
            negocio: producto.negocio,
            precio: parseFloat(producto.precio),
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

export default withRouter(TerminalPv);
