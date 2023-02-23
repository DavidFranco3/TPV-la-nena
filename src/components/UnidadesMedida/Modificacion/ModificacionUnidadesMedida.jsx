import { useState, useEffect } from 'react';
import { Button, Col, Form, Row, Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import { actualizaUM } from "../../../api/unidadesMedida";
import queryString from "query-string";
import "../../../scss/styles.scss";
import { LogsInformativos } from "../../Logs/LogsSistema/LogsSistema";

function ModificacionUnidadesMedida(props) {
    const { dataUM, setShowModal, navigate } = props;
    const { id } = dataUM;

    // Para almacenar datos del departamento
    const [formData, setFormData] = useState(initialFormValue(dataUM));

    // Cancelar y cerrar el formulario
    const cancelarRegistro = () => {
        setShowModal(false)
    }

    // Para la animacion de carga
    const [loading, setLoading] = useState(false);

    const onSubmit = e => {
        e.preventDefault();

        if (!formData.nombre || !formData.tipo || !formData.abreviatura) {
            toast.warning("Completa el formulario")
        } else {
            setLoading(true);

            const dataTemp = {
                nombre: formData.nombre,
                estadoUM: "true"
            }

            try {
                actualizaUM(id, dataTemp).then(response => {
                    const { data } = response;
                    navigate({
                        search: queryString.stringify(""),
                    });
                    LogsInformativos("Se ha modificado la unidad de medida " + dataUM.nombre, dataUM);
                    toast.success(data.mensaje);
                    cancelarRegistro()
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
                            defaultValue={formData.nombre}
                        />
                    </Form.Group>
                </Row>

                <Form.Group as={Row} className="botonSubirProducto">
                    <Col>
                        <Button
                            type="submit"
                            title="Actualizar el registro"
                            variant="success"
                            className="registrar"
                        >
                            {!loading ? "Actualizar" : <Spinner animation="border" />}
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

function initialFormValue(data) {
    const { abreviatura, nombre, tipo } = data;
    //console.log(nombre)

    return {
        nombre: nombre,
        abreviatura: abreviatura,
        tipo: tipo
    }
}

export default ModificacionUnidadesMedida;
