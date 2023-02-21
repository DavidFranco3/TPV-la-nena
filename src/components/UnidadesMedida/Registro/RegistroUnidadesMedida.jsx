import { useState, useEffect } from 'react';
import { Button, Col, Form, Row, Spinner } from "react-bootstrap";
import "../../../scss/styles.scss";
import { toast } from "react-toastify";
import { registraUM } from "../../../api/unidadesMedida";
import queryString from "query-string";

function RegistroUnidadesMedida(props) {
    const { setShowModal, navigate } = props;

    //setShowModal={setShowModal} history={history}

    // Para almacenar los datos del formulario
    const [formData, setFormData] = useState(initialFormData());

    // Para determinar el uso de la animacion
    const [loading, setLoading] = useState(false);

    // Para cancelar la actualizacion
    const cancelarRegistro = () => {
        setShowModal(false)
    }

    const onSubmit = e => {
        e.preventDefault();
        if (!formData.nombre || !formData.tipo) {
            toast.warning("Completa el formulario")
        } else {
            setLoading(true);

            const dataTemp = {
                nombre: formData.nombre,
                tipo: formData.tipo,
                estadoUM: "true"
            }

            try {
                registraUM(dataTemp).then(response => {
                    const { data } = response;
                    navigate({
                        search: queryString.stringify(""),
                    });
                    toast.success(data.mensaje);
                    cancelarRegistro();
                })
            } catch (e) {
                console.log(e)
            }
        }
    }

    const onChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <>
            <Form onSubmit={onSubmit} onChange={onChange}>
                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridNombre">
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control
                            type="text"
                            name="nombre"
                            placeholder='Unidad de medida'
                            defaultValue={formData.nombre}
                        />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridNombre">
                        <Form.Label>Tipo</Form.Label>
                        <Form.Control
                            as="select"
                            name="tipo"
                            placeholder="Escribe el tipo de UM"
                            defaultValue={formData.tipo}
                        >
                            <option>Elige una opción</option>
                            <option value="Primaria">Primaria</option>
                            <option value="Secundaria">Secundaria</option>
                        </Form.Control>
                    </Form.Group>
                </Row>

                <Form.Group as={Row} className="botonSubirProducto">
                    <Col>
                        <Button
                            type="submit"
                            title="Guardar la información del formulario"
                            variant="success"
                            className="registrar"
                        >
                            {!loading ? "Registrar" : <Spinner animation="border" />}
                        </Button>
                    </Col>
                    <Col>
                        <Button
                            variant="danger"
                            title="Cerrar el formulario"
                            className="cancelar"
                            onClick={() => {
                                cancelarRegistro()
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

function initialFormData() {
    return {
        nombre: "",
        tipo: "",
    }
}

export default RegistroUnidadesMedida;
