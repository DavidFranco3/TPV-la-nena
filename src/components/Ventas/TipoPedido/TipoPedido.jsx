import { useState } from 'react';
import "./TipoPedido.scss"
import {Button, Col, Form, Row, Spinner} from "react-bootstrap";
import {faX, faSave} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

function TipoPedido(props) {
    const{ setTipoPedido, setShowModal } = props;
    const [formData, setFormData] = useState(initialFormValue());
    const [loading, setLoading] = useState(false);

    const onSubmit = e => {
        e.preventDefault();
        //setNombreCliente()
        //console.log(formData)
        setLoading(true);
        setTipoPedido(formData.tipoPedido);
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

                <div className="metodoDePago">
                    <Form.Group as={Col} controlId="formGridEstado">
                        <Form.Label>
                            Tipo Pedido
                        </Form.Label>

                        <Form.Control as="select"
                                      defaultValue={formData.tipoPedido}
                                      name="tipoPedido"
                                      required
                        >
                            <option>Elige una opción</option>
                            <option value="para llevar">Para llevar</option>
                            <option value="para comer aquí">Para comer aquí</option>
                        </Form.Control>
                    </Form.Group>
                </div>

                <Form.Group as={Row} className="botonSubirProducto">
                        <Col>
                            <Button
                                title="Agregar tipo de pedido" 
                                type="submit"
                                variant="success"
                                className="registrar"
                                disabled={!formData.tipoPedido}
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

export default TipoPedido;
