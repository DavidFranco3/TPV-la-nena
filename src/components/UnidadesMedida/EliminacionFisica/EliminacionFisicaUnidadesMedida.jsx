import { useState, useEffect } from 'react';
import { Button, Col, Form, Row, Spinner, Alert } from "react-bootstrap";
import "../../../scss/styles.scss";
import { eliminaUM } from "../../../api/unidadesMedida";
import { toast } from "react-toastify";
import queryString from "query-string";

function EliminacionFisicaUnidadesMedida(props) {
    const { dataUM, setShowModal, navigate } = props;
    const { id, nombre, tipo, abreviatura } = dataUM;

    //console.log(dataDepto)

    // Para cancelar la actualizacion
    const cancelarEliminacion = () => {
        setShowModal(false)
    }

    // Para determinar la animacion de carga
    const [loading, setLoading] = useState(false);

    const onSubmit = e => {
        e.preventDefault();

        //console.log(formData);
        setLoading(true);

        try {
            eliminaUM(id).then(response => {
                const { data } = response;
                navigate({
                    search: queryString.stringify(""),
                });
                toast.success(data.mensaje);
                cancelarEliminacion();
            })
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <>
            <Form onSubmit={onSubmit}>

                <Alert variant="danger">
                    <Alert.Heading>Atención! Acción destructiva!</Alert.Heading>
                    <p className="mensaje">
                        Esta acción eliminara del sistema a la unidad de medida.
                    </p>
                </Alert>

                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridNombre">
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control type="text"
                            name="nombre"
                            disabled={true}
                            defaultValue={nombre}
                        />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridNombre">
                        <Form.Label>Abreviatura</Form.Label>
                        <Form.Control
                            type="text"
                            name="abreviatura"
                            placeholder='Abreviatura'
                            defaultValue={abreviatura}
                            disabled
                        />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridNombre">
                        <Form.Label>Tipo</Form.Label>
                        <Form.Control
                            as="select"
                            name="tipo"
                            placeholder="Escribe el tipo de UM"
                            defaultValue={tipo}
                            disabled
                        >
                            <option>Elige una opción</option>
                            <option value="Primaria" selected={tipo == "Primaria"}>Primaria</option>
                            <option value="Secundaria" selected={tipo == "Secundaria"}>Secundaria</option>
                        </Form.Control>
                    </Form.Group>
                </Row>

                <Form.Group as={Row} className="botonSubirProducto">
                    <Col>
                        <Button
                            type="submit"
                            title="Eliminar"
                            variant="success"
                            className="registrar"
                        >
                            {!loading ? "Eliminar" : <Spinner animation="border" />}
                        </Button>
                    </Col>
                    <Col>
                        <Button
                            variant="danger"
                            className="cancelar"
                            onClick={() => {
                                cancelarEliminacion()
                            }}
                        >
                            Cancelar
                        </Button>
                    </Col>
                </Form.Group>
            </Form>
        </>
    );
}

export default EliminacionFisicaUnidadesMedida;
