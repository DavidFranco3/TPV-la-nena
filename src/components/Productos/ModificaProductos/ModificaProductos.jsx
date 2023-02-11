import { useState } from 'react';
import Dropzone from "../../Dropzone";
import { Button, Col, Form, Row, Spinner } from "react-bootstrap";
import { map } from "lodash";
import { subeArchivosCloudinary } from "../../../api/cloudinary";
import { toast } from "react-toastify";
import { actualizaProductos } from "../../../api/productos";
import queryString from "query-string";
import { faX, faSave } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../../scss/styles.scss";

function ModificaProductos(props) {
    const { datosProducto, listCategorias, navigate, setShowModal } = props;

    const { id, imagen } = datosProducto;
    const [formData, setFormData] = useState(initialFormValue(datosProducto));
    const [loading, setLoading] = useState(false);

    //Para almacenar la imagen del producto que se guardara a la bd
    const [imagenProducto, setImagenProducto] = useState(imagen);

    // Para cancelar el registro
    const cancelarRegistro = () => {
        setShowModal(false)
    }

    const onSubmit = e => {
        e.preventDefault();

        if (!imagenProducto || !formData.nombre || !formData.categoria || !formData.precio) {
            toast.warning("Completa el formulario");
        } else {
            try {
                setLoading(true);
                // Sube a cloudinary la imagen principal del producto
                subeArchivosCloudinary(imagenProducto, "productos").then(response => {
                    const { data } = response;
                    const dataTemp = {
                        nombre: formData.nombre,
                        categoria: formData.categoria,
                        precio: formData.precio,
                        imagen: data.secure_url,
                        negocio: "LA NENA"
                    }
                    actualizaProductos(id, dataTemp).then(response => {
                        const { data } = response;
                        navigate({
                            search: queryString.stringify(""),
                        });
                        toast.success(data.mensaje);
                        cancelarRegistro();
                    })
                }).then(e => {
                    console.log(e)
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
                <div className="imagenPrincipal" disabled>
                    <h4 className="textoImagenPrincipal">Sube tu imagen</h4>
                    <div title="Seleccionar imagen del producto" className="imagenProducto">
                        <Dropzone
                            setImagenFile={setImagenProducto}
                            imagenProductoBD={imagen}
                        />
                    </div>
                </div>

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

                        <Form.Group as={Col} controlId="formGridCategoria">
                            <Form.Label>Categoría</Form.Label>
                            <Form.Control
                                as="select"
                                defaultValue={formData.categoria}
                                name="categoria">
                                <option>Elige una opción</option>
                                {map(listCategorias, (cat, index) => (
                                    <option key={index} value={cat?.id}>{cat?.nombre}</option>
                                ))}
                            </Form.Control>
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridPrecio">
                            <Form.Label>Precio</Form.Label>
                            <Form.Control
                                type="text"
                                name="precio"
                                placeholder="Precio"
                                defaultValue={formData.precio}
                            />
                        </Form.Group>
                    </Row>
                </div>

                <Form.Group as={Row} className="botonSubirProducto">
                    <Col>
                        <Button
                            title="Modificar producto"
                            type="submit"
                            variant="success"
                            className="registrar"
                            disabled={loading}
                        >
                            <FontAwesomeIcon icon={faSave} /> {!loading ? "Modificar" : <Spinner animation="border" />}
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
        nombre: data.nombre,
        categoria: data.categoria,
        precio: data.precio
    }
}

export default ModificaProductos;
