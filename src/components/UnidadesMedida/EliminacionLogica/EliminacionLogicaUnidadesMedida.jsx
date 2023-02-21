import { useState, useEffect } from 'react';
import { toast } from "react-toastify";
import queryString from "query-string";
import { Button, Col, Form, Row, Spinner, Alert } from "react-bootstrap";
import { deshabilitaUM } from "../../../api/unidadesMedida";
import "../../../scss/styles.scss";

function EliminacionLogicaUnidadesMedida(props) {
    const { navigate, dataUM, setShowModal } = props;
    const { id, nombre, tipo, abreviatura, estadoUM } = dataUM;

    //console.log(dataUsuario)

    // Para cancelar el registro
    const cancelar = () => {
        setShowModal(false)
    }

    // Para determinar el uso de la animacion
    const [loading, setLoading] = useState(false);

    const onSubmit = e => {
        e.preventDefault();

        setLoading(true);

        const dataTemp = {
            estadoUM: estadoUM === "false" ? "true" : "false"
        }
        //console.log(dataTemp)

        try {
            deshabilitaUM(id, dataTemp).then(response => {
                const { data } = response;
                navigate({
                    search: queryString.stringify(""),
                });
                toast.success(data.mensaje);
                cancelar();
            })
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <>
            <Form onSubmit={onSubmit}>
                {estadoUM == "true" ?
                    (
                        <>
                            <Alert variant="danger">
                                <Alert.Heading>Atención! Acción destructiva!</Alert.Heading>
                                <p className="mensaje">
                                    Esta acción deshabilitara en el sistema la unidad de medida.
                                </p>
                            </Alert>
                        </>
                    ) : (
                        <>
                            <Alert variant="success">
                                <Alert.Heading>Atención! Acción constructiva!</Alert.Heading>
                                <p className="mensaje">
                                    Esta acción habilitara en el sistema la unidad de medida.
                                </p>
                            </Alert>
                        </>)
                }

                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridCliente">
                        <Form.Label>
                            Nombre
                        </Form.Label>
                        <Form.Control
                            type="text"
                            value={nombre}
                            disabled
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
                            variant="success"
                            title={estadoUM === "true" ? "Deshabilitar" : "Habilitar"}
                            type="submit"
                            className='registrar'
                        >
                            {!loading ? (estadoUM === "true" ? "Deshabilitar" : "Habilitar") : <Spinner animation="border" />}
                        </Button>
                    </Col>
                    <Col>
                        <Button
                            variant="danger"
                            className="cancelar"
                            title="Cerrar el formulario"
                            onClick={() => {
                                cancelar()
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

export default EliminacionLogicaUnidadesMedida;
