import { useState } from 'react';
import { Button, Col, Form, Row, Spinner, Image, Alert } from "react-bootstrap";
import { eliminaIngrediente } from "../../../api/ingredientes";
import { toast } from "react-toastify";
import queryString from "query-string";
import "../../../scss/styles.scss";
import { faX, faSave } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import 'dayjs/locale/es';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import { LogsInformativos } from "../../Logs/LogsSistema/LogsSistema";

function EliminaIngredientes(props) {
    const { datosIngrediente, navigate, setShowModal } = props;

    const { id, nombre, tipoUM, um, costo, imagen } = datosIngrediente;

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
            eliminaIngrediente(id).then(response => {
                const { data } = response;
                navigate({
                    search: queryString.stringify(""),
                });
                LogsInformativos("El ingrediente " + nombre  + " fue eliminado", datosIngrediente);
                toast.success(data.mensaje)
                cancelarRegistro();
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
                            Esta acción eliminará del sistema el ingrediente.
                        </p>
                    </Alert>

                    <div className="imagenPrincipal">
                        <h4 className="textoImagenPrincipal">Imagen del ingrediente</h4>
                        <div className="imagenProducto">
                            <div className="vistaPreviaImagen">
                                <Image
                                    src={imagen}
                                />
                            </div>
                        </div>
                    </div>

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
                            <Form.Label>Tipo UM</Form.Label>
                            <Form.Control
                                type="text"
                                name="tipoUM"
                                placeholder="Escribe el nombre"
                                value={tipoUM}
                                disabled
                            />
                        </Form.Group>
                    </Row>

                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="formGridNombre">
                            <Form.Label>Costo</Form.Label>
                            <Form.Control
                                type="text"
                                name="costo"
                                placeholder="Escribe el nombre"
                                value={costo}
                                disabled
                            />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridNombre">
                            <Form.Label>UM</Form.Label>
                            <Form.Control
                                type="text"
                                name="um"
                                placeholder="Escribe el nombre"
                                value={um}
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

export default EliminaIngredientes;
