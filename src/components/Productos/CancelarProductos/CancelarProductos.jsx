import { useState } from 'react';
import "../../../scss/styles.scss";
import { cancelarProducto } from "../../../api/productos";
import { map } from "lodash";
import { toast } from "react-toastify";
import { Button, Col, Row, Form, Spinner, Alert } from "react-bootstrap";
import queryString from "query-string";
import moment from "moment";
import "moment/locale/es";
import { faX, faSave } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const fechaToCurrentTimezone = (fecha) => {
    const date = new Date(fecha)

    date.setMinutes(date.getMinutes() - date.getTimezoneOffset())


    return date.toISOString().slice(0, 16);
}

function CancelarProductos(props) {
    const { datosProducto, listCategorias, history, setShowModal } = props;

    const { id, nombre, categoria, precio, estado, fechaActualizacion } = datosProducto;

    moment.locale("es");

    // Para cancelar el registro
    const cancelarRegistro = () => {
        setShowModal(false)
    }

    const [loading, setLoading] = useState(false);

    const onSubmit = e => {
        e.preventDefault()
        setLoading(true);
        try {
            const dataTemp = {
                estado: estado === "true" ? "false" : "true"
            }
            cancelarProducto(id, dataTemp).then(response => {
                const { data } = response;
                toast.success(data.mensaje)
                history.push({
                    search: queryString.stringify(""),
                });
                setShowModal(false)
            }).catch(e => {
                console.log(e)
            })
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <>
            <div className="datosDelProducto">

                {estado === "true" ?
                    (
                        <>
                            <Alert variant="danger">
                                <Alert.Heading>Atención! Acción destructiva!</Alert.Heading>
                                <p className="mensaje">
                                    Esta acción cancelara el producto.
                                </p>
                            </Alert>
                        </>
                    )
                    :
                    (
                        <>
                            <Alert variant="success">
                                <Alert.Heading>Atención! Acción constructiva!</Alert.Heading>
                                <p className="mensaje">
                                    Esta acción recuperara el producto.
                                </p>
                            </Alert>
                        </>
                    )
                }
                <Form onSubmit={onSubmit}>

                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="formGridNombre">
                            <Form.Label>
                                Nombre
                            </Form.Label>
                            <Form.Control
                                type="text"
                                name="nombre"
                                placeholder="Escribe el nombre"
                                value={nombre}
                                disabled
                            />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridCategoria">
                            <Form.Label>Categoría</Form.Label>
                            <Form.Control
                                as="select"
                                value={categoria}
                                name="categoria"
                                disabled>
                                <option>Elige una opción</option>
                                {map(listCategorias, (cat, index) => (
                                    <option key={index} value={cat?.id}>{cat?.nombre}</option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                    </Row>

                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="formGridNombre">
                            <Form.Label>
                                Precio
                            </Form.Label>
                            <Form.Control
                                type="text"
                                name="nombre"
                                placeholder="Escribe el nombre"
                                value={precio}
                                disabled
                            />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridFecha">
                            <Form.Label>
                                Modificación
                            </Form.Label>
                            <Form.Control
                                type="text"
                                name="fecha"
                                placeholder="Escribe la fecha"
                                value={moment(fechaToCurrentTimezone(fechaActualizacion)).format('DD/MM/YYYY hh:mm a')}
                                disabled
                            />
                        </Form.Group>
                    </Row>

                    <Form.Group as={Row} className="botonSubirProducto">
                        <Col>
                            <Button
                                title={estado === "true" ? "cancelar producto" : "recuperar producto"}
                                type="submit"
                                variant="success"
                                className="registrar"
                            >
                                <FontAwesomeIcon icon={faSave} /> {!loading ? (estado === "true" ? "Deshabilitar" : "Habilitar") : <Spinner animation="border" />}
                            </Button>
                        </Col>
                        <Col>
                            <Button
                                title="Cerrar ventana"
                                variant="danger"
                                className="cancelar"
                                onClick={() => {
                                    cancelarRegistro()
                                }}
                            >
                                <FontAwesomeIcon icon={faX} /> Cancelar
                            </Button>
                        </Col>
                    </Form.Group>

                </Form>
            </div>
        </>
    );
}

export default CancelarProductos;
