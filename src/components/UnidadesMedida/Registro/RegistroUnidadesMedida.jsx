import { useState, useEffect } from 'react';
import { Button, Col, Form, Row, Spinner } from "react-bootstrap";
import "../../../scss/styles.scss";
import { toast } from "react-toastify";
import { registraUM } from "../../../api/unidadesMedida";
import queryString from "query-string";
import { LogsInformativos } from "../../Logs/LogsSistema/LogsSistema";

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
        if (!formData.nombre) {
            toast.warning("Completa el formulario")
        } else {
            setLoading(true);

            const dataTemp = {
                nombre: formData.nombre,
                estadoUM: "true"
            }

            try {
                registraUM(dataTemp).then(response => {
                    const { data } = response;
                    navigate({
                        search: queryString.stringify(""),
                    });
                    LogsInformativos("Se ha registrado la unidad de medida " + formData.nombre, data.datos);
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
                            placeholder='Nombre de la unidad de medida'
                            defaultValue={formData.nombre}
                            >
                            <option>Elige una opción</option>
                            <option value="Litros">Litros</option>
                            <option value="Gramos">Gramos</option>
                            <option value="Metros">Litros</option>
                            <option value="Paquete">Gramos</option>
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
        abreviatura: "",
        tipo: "",
    }
}

export default RegistroUnidadesMedida;
