import { useState } from 'react';
import {Button, Col, Form, Row, Spinner} from "react-bootstrap";
import "./NombreCliente.scss";
import {faX, faSave} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

function NombreCliente(props) {
    const { setNombreCliente, setShowModal } = props;
    const [formData, setFormData] = useState(initialFormValue());
    const [loading, setLoading] = useState(false);

    const onSubmit = e => {
        e.preventDefault();
        //setNombreCliente()
        //console.log(formData)
        setLoading(true);
        setNombreCliente(formData.nombre);
        setShowModal(false);
    }
    
    // Para cancelar el registro
    const cancelarRegistro = () => {
        setShowModal(false)
    }

    const onChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <>
            <Form onSubmit={onSubmit} onChange={onChange}>
                <div className="nombreDelCliente">
                    <Form.Group as={Col} controlId="formGridNombre">
                        <Form.Label>
                            Nombre del cliente
                        </Form.Label>
                        <Form.Control type="text"
                            name="nombre"
                            placeholder="Escribe el nombre"
                            defaultValue={formData.nombre}
                        />
                    </Form.Group>
                </div>

                <Form.Group as={Row} className="botonSubirProducto">
                        <Col>
                            <Button
                                title="Agregar nombre del cliente" 
                                type="submit"
                                variant="success"
                                className="registrar"
                                disabled={!formData.nombre}
                            >
                                <FontAwesomeIcon icon={faSave} /> {!loading ? "Aceptar" : <Spinner animation="border" />}
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

function initialFormValue(){
    return {
        nombre: ""
    }
}

export default NombreCliente;
