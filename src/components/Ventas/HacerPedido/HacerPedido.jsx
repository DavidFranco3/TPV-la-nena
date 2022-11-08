import { useState } from 'react';
import "./HacerPedido.scss"
import {Button, Col, Form, Row, Spinner} from "react-bootstrap";
import {faX, faSave} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

function HacerPedido(props) {
    const{ setHacerPedido, setShowModal } = props;
    const [formData, setFormData] = useState(initialFormValue());
    const [loading, setLoading] = useState(false);

    const onSubmit = e => {
        e.preventDefault();
        //setNombreCliente()
        //console.log(formData)
        setLoading(true);
        setHacerPedido(formData.hacerPedido);
        setShowModal(false);
    }

    const onChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    
    // Para cancelar el registro
    const cancelarRegistro = () => {
        setShowModal(false)
    }

    return (
        <>
            <Form onSubmit={onSubmit} onChange={onChange}>

                <div className="metodoDePago">
                    <Form.Group as={Col} controlId="formGridEstado">
                        <Form.Label>
                            Hacer Pedido
                        </Form.Label>

                        <Form.Control as="select"
                                      defaultValue={formData.hacerPedido}
                                      name="hacerPedido"
                        >
                            <option>Elige una opción</option>
                            <option value="por WhatsApp">WhatsApp</option>
                            <option value="por llamada">Llamada</option>
                            <option value="de forma presencial">Presencial</option>
                        </Form.Control>
                    </Form.Group>
                </div>

                <Form.Group as={Row} className="botonSubirProducto">
                        <Col>
                            <Button
                                title="Agregar forma en la que se realizo el pedido" 
                                type="submit"
                                variant="success"
                                className="registrar"
                                disabled={!formData.hacerPedido}
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
        tipoPago: "",
        dinero: ""
    }
}

export default HacerPedido;
