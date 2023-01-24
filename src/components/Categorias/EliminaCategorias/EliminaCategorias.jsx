import { useState } from 'react';
import { Button, Col, Form, Row, Spinner, Alert } from "react-bootstrap";
import { eliminaCategoria } from "../../../api/categorias";
import { toast } from "react-toastify";
import queryString from "query-string";
import "../../../scss/styles.scss";
import { faX, faSave } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import 'dayjs/locale/es';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';

function EliminaCategorias(props) {
    const { datosCategoria, history, setShowModal } = props;
    const { id, nombre, fechaActualizacion } = datosCategoria;

    dayjs.locale('es');
    dayjs.extend(localizedFormat);

    // Para cancelar el registro
    const cancelarRegistro = () => {
        setShowModal(false)
    }


    const [loading, setLoading] = useState(null);

    const onSubmit = e => {
        e.preventDefault()
        setLoading(true)
        try {
            eliminaCategoria(id).then(response => {
                const { data } = response;
                toast.success(data.mensaje)
                history.push({
                    search: queryString.stringify(""),
                });
                setShowModal(false);
            })
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <>
            <Form onSubmit={onSubmit}>
                <div className="datosDelProducto">
                    <Alert variant="danger">
                        <Alert.Heading>Atención! Acción destructiva!</Alert.Heading>
                        <p className="mensaje">
                            Esta acción eliminará del sistema la categoria.
                        </p>
                    </Alert>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="formGridNombre">
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control
                                type="text"
                                name="nombre"
                                placeholder="Escribe el nombre"
                                value={nombre}
                                disabled
                            />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridNombre">
                            <Form.Label>Modificación</Form.Label>
                            <Form.Control
                                align="center"
                                type="text"
                                name="nombre"
                                placeholder="Escribe el nombre"
                                value={dayjs(fechaActualizacion).format('L hh:mm A')}
                                disabled
                            />
                        </Form.Group>
                    </Row>
                </div>

                <Form.Group as={Row} className="botonSubirProducto">
                    <Col>
                        <Button
                            title="Eliminar categoría"
                            type="submit"
                            variant="success"
                            className="registrar"
                            disabled={loading}
                        >
                            <FontAwesomeIcon icon={faSave} /> {!loading ? "Eliminar" : <Spinner animation="border" />}
                        </Button>
                    </Col>
                    <Col>
                        <Button
                            title="Cerrar ventana"
                            variant="danger"
                            className="cancelar"
                            disabled={loading}
                            onClick={() => {
                                cancelarRegistro()
                            }}
                        >
                            <FontAwesomeIcon icon={faX} /> Cancelar
                        </Button>
                    </Col>
                </Form.Group>
            </Form>
        </>
    );
}

export default EliminaCategorias;
