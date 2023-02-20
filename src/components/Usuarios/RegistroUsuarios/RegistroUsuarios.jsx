import { useState } from 'react';
import { registraUsuarios } from "../../../api/usuarios";
import "../../../scss/styles.scss";
import { Button, Col, Form, Row, Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import queryString from "query-string";
import { faX, faSave } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function RegistroUsuarios(props) {
    const { setShowModal, navigate } = props;
    const [formData, setFormData] = useState(initialFormValue());
    const [loading, setLoading] = useState(false);

    // Para cancelar el registro
    const cancelarRegistro = () => {
        setShowModal(false)
    }

    const onSubmit = e => {
        e.preventDefault();

        if (!formData.nombre || !formData.usuario || !formData.password || !formData.admin) {
            toast.warning("Completa el formulario");
        } else {
            try {
                setLoading(true);
                // Sube a cloudinary la imagen principal del producto

                const dataTemp = {
                    nombre: formData.nombre,
                    usuario: formData.usuario,
                    admin: formData.admin,
                    password: formData.password,
                    estadoUsuario: "true"
                }
                registraUsuarios(dataTemp).then(response => {
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
                <div className="datosDelProducto">
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="formGridNombre">
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control
                                type="text"
                                name="nombre"
                                placeholder="Escribe el nombre"
                                defaultValue={formData.nombre}
                            />
                        </Form.Group>
                        <Form.Group as={Col} controlId="formGridNombre">
                            <Form.Label>Usario</Form.Label>
                            <Form.Control
                                type="text"
                                name="usuario"
                                placeholder="Escribe el usuario"
                                defaultValue={formData.usuario}
                            />
                        </Form.Group>
                    </Row>

                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="formGridNombre">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="text"
                                name="password"
                                placeholder="Escribe el password"
                                defaultValue={formData.password}
                            />
                        </Form.Group>
                        <Form.Group as={Col} controlId="formGridNombre">
                            <Form.Label>Tipo</Form.Label>
                            <Form.Control
                                as="select"
                                name="admin"
                                placeholder="Escribe el tipo de usuario"
                                defaultValue={formData.admin}
                            >
                                <option>Elige una opción</option>
                                <option value="true">Administrador</option>
                                <option value="false">Cajero</option>
                            </Form.Control>
                        </Form.Group>
                    </Row>
                </div>

                <Form.Group as={Row} className="botonSubirProducto">
                    <Col>
                        <Button
                            title="Registrar categoría"
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

function initialFormValue() {
    return {
        nombre: "",
        usuario: "",
        password: "",
        admin: "",
    }
}

export default RegistroUsuarios;
