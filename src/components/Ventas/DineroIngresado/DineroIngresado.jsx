import { useState } from 'react';
import "./DineroIngresado.scss"
import {Button, Col, Form, Row, Spinner} from "react-bootstrap";
import {faX, faSave} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

function DineroIngresado(props) {
    const{ setDineroIngresado, setShowModal, setTipoPago } = props;
    const [formData, setFormData] = useState(initialFormValue());
    const [loading, setLoading] = useState(false);

    const onSubmit = e => {
        e.preventDefault();
        //setNombreCliente()
        //console.log(formData)
        setLoading(true);
        setTipoPago(formData.tipoPago);
        setDineroIngresado(formData.dinero);
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
                            Método de pago
                        </Form.Label>

                        <Form.Control as="select"
                                      defaultValue={formData.tipoPago}
                                      name="tipoPago"
                                      required
                        >
                            <option>Elige una opción</option>
                            <option value="Efectivo">Efectivo</option>
                            <option value="Tarjeta">Tarjeta</option>
                            <option value="Transferencia">Transferencia</option>
                        </Form.Control>
                    </Form.Group>
                </div>

                {
                    formData.tipoPago === "Efectivo" &&
                        (
                            <>
                                <div className="efectivo">
                                    <Form.Group as={Col} controlId="formGridNombre">
                                        <Form.Label>
                                            ¿Con cuanto dinero paga?
                                        </Form.Label>
                                        <Form.Control 
                                            type="number" 
                                            name="dinero"
                                            placeholder="Escribe la cantidad recibida"
                                            step="0.1"
                                            min="0"
                                            defaultValue={formData.dinero}
                                        />
                                    </Form.Group>
                                </div>
                            </>
                        )
                }

                <Form.Group as={Row} className="botonSubirProducto">
                        <Col>
                            <Button
                                title="Agregar metodo de pago" 
                                type="submit"
                                variant="success"
                                className="registrar"
                                disabled={!formData.tipoPago || formData.tipoPago=="Efectivo" && !formData.dinero}
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

export default DineroIngresado;
