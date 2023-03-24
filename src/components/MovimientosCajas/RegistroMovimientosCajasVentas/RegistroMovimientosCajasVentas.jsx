import { useState, useEffect } from 'react';
import { registraMovimientos } from "../../../api/movimientosCajas";
import { obtenerCaja } from "../../../api/cajas";
import "../../../scss/styles.scss";
import { Button, Col, Form, Row, Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import queryString from "query-string";
import { faX, faSave } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { LogsInformativos } from "../../Logs/LogsSistema/LogsSistema";
import { LogCajaActualizacion } from "../../Cajas/Gestion/GestionCajas";
import { getTokenApi, isExpiredToken, logoutApi, obtenidusuarioLogueado } from "../../../api/auth";
import { obtenerUsuario } from "../../../api/usuarios";
import { obtenerUltimaCajaCajero } from "../../../api/cajas";

function RegistroMovimientosCajasVentas(props) {
    const { setShowModal, navigate, datosVentas } = props;

    const { usuario } = datosVentas

    const [formData, setFormData] = useState(initialFormValue(datosVentas));
    const [loading, setLoading] = useState(false);

    const [idCajero, setIdCajero] = useState("");
    const [cajero, setCajero] = useState("");

    const obtenerDatosUsuario = () => {
        try {
            obtenerUsuario(usuario).then(response => {
                const { data } = response;
                const { _id, nombre } = data;
                //console.log(data)
                setIdCajero(_id);
                setCajero(nombre);
            }).catch((e) => {
                if (e.message === 'Network Error') {
                    console.log("No hay internet")
                }
            })
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        obtenerDatosUsuario();
    }, []);

    const [caja, setCaja] = useState("");

    const cargarDatosCajas = () => {
        try {
            obtenerUltimaCajaCajero(usuario).then(response => {
                const { data } = response;
                const { _id } = data[0];
                console.log(_id)
                setCaja(_id);
            }).catch((e) => {
                if (e.message === 'Network Error') {
                    console.log("No hay internet")
                }
            })
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        cargarDatosCajas();
    }, [idCajero]);

    // Para cancelar el registro
    const cancelarRegistro = () => {
        setShowModal(false)
    }

    const onSubmit = e => {
        e.preventDefault();

        if (!formData.movimiento) {
            toast.warning("Completa el formulario");
        } else {
            try {
                setLoading(true);

                const dataTemp = {
                    idCaja: caja,
                    idCajero: usuario,
                    cajero: cajero,
                    movimiento: formData.movimiento,
                    pago: formData.pago,
                    monto: formData.monto,
                    estado: "true",
                }
                registraMovimientos(dataTemp).then(response => {
                    const { data } = response;
                    navigate({
                        search: queryString.stringify(""),
                    });
                    LogsInformativos("Se ha registrado el movimiento del cajero " + dataTemp.cajero, data.datos);
                    LogCajaActualizacion(caja, formData.movimiento == "Fondo de caja" ? formData.monto : formData.movimiento == "Venta" && formData.pago == "Transferencia" ? 0 : formData.movimiento == "Venta" && formData.pago == "Tarjeta" ? 0 : formData.movimiento == "Venta" && formData.pago == "Efectivo" ? formData.monto : formData.movimiento == "Retiro" ? parseFloat(formData.monto) * -1 : formData.movimiento == "Aumento" ? formData.monto : 0);
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
                <div className="datosDelProducto">
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="formGridNombre">
                            <Form.Label>Cajero</Form.Label>
                            <Form.Control
                                type="text"
                                name="cajero"
                                placeholder="Escribe el nombre del cajero"
                                value={cajero}
                                disabled
                            />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridNombre">
                            <Form.Label>Movimiento</Form.Label>
                            <Form.Control
                                as="select"
                                name="movimiento"
                                placeholder="Escribe el nombre del cajero"
                                defaultValue={formData.movimiento}
                                disabled
                            >
                                <option>Elige una opción</option>
                                <option value="Fondo de caja">Fondo de caja</option>
                                <option value="Venta">Venta</option>
                                <option value="Retiro">Retiro</option>
                                <option value="Aumento">Aumento</option>
                                <option value="Corte de caja">Corte de caja</option>
                                <option value="Cierre">Cierre</option>
                            </Form.Control>
                        </Form.Group>
                    </Row>

                    <Row className="mb-3">
                        {
                            formData.movimiento === "Fondo de caja" &&
                            (
                                <>
                                    <Form.Group as={Col} controlId="formGridNombre">
                                        <Form.Label>
                                            Monto del movimiento
                                        </Form.Label>
                                        <Form.Control
                                            type="number"
                                            name="monto"
                                            placeholder="Escribe la cantidad"
                                            step="0.1"
                                            min="0"
                                            defaultValue={formData.monto}
                                            disabled
                                        />
                                    </Form.Group>
                                </>
                            )
                        }

                        {
                            formData.movimiento === "Retiro" &&
                            (
                                <>
                                    <Form.Group as={Col} controlId="formGridNombre">
                                        <Form.Label>
                                            Monto del movimiento
                                        </Form.Label>
                                        <Form.Control
                                            type="number"
                                            name="monto"
                                            placeholder="Escribe la cantidad"
                                            step="0.1"
                                            min="0"
                                            defaultValue={formData.monto}
                                            disabled
                                        />
                                    </Form.Group>
                                </>
                            )
                        }

                        {
                            formData.movimiento === "Aumento" &&
                            (
                                <>
                                    <Form.Group as={Col} controlId="formGridNombre">
                                        <Form.Label>
                                            Monto del movimiento
                                        </Form.Label>
                                        <Form.Control
                                            type="number"
                                            name="monto"
                                            placeholder="Escribe la cantidad"
                                            step="0.1"
                                            min="0"
                                            defaultValue={formData.monto}
                                            disabled
                                        />
                                    </Form.Group>
                                </>
                            )
                        }

                        {
                            formData.movimiento === "Venta" &&
                            (
                                <>
                                    <Form.Group as={Col} controlId="formGridNombre">
                                        <Form.Label>
                                            Monto del movimiento
                                        </Form.Label>
                                        <Form.Control
                                            type="number"
                                            name="monto"
                                            placeholder="Escribe la cantidad"
                                            step="0.1"
                                            min="0"
                                            defaultValue={formData.monto}
                                            disabled
                                        />
                                    </Form.Group>

                                    <Form.Group as={Col} controlId="formGridEstado">
                                        <Form.Label>
                                            Método de pago
                                        </Form.Label>

                                        <Form.Control
                                            as="select"
                                            defaultValue={formData.pago}
                                            name="pago"
                                            disabled
                                        >
                                            <option>Elige una opción</option>
                                            <option value="Efectivo">Efectivo</option>
                                            <option value="Tarjeta">Tarjeta</option>
                                            <option value="Transferencia">Transferencia</option>
                                        </Form.Control>
                                    </Form.Group>
                                </>
                            )
                        }
                    </Row>
                </div>

                <Form.Group as={Row} className="botonSubirProducto">
                    <Col>
                        <Button
                            title="Registrar movimiento"
                            type="submit"
                            variant="success"
                            className="registrar"
                            disabled={loading}
                        >
                            <FontAwesomeIcon icon={faSave} /> {!loading ? "Registrar" : <Spinner animation="border" />}
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

function initialFormValue(data) {
    return {
        movimiento: "Venta",
        monto: data.total,
        pago: data.tipoPago
    }
}

function initialFormDataCajaInitial() {
    return {
        idCajero: "",
        cajero: "",
    }
}

function initialFormDataCaja(data) {
    return {
        idCajero: data.idCajero,
        cajero: data.cajero,
    }
}

export default RegistroMovimientosCajasVentas;
