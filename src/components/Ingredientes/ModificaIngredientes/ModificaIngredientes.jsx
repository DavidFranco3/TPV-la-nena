import { useEffect, useState } from 'react';
import "../../../scss/styles.scss";
import { map } from "lodash";
import Dropzone from "../../Dropzone";
import { Button, Col, Form, Row, Spinner } from "react-bootstrap";
import { subeArchivosCloudinary } from "../../../api/cloudinary";
import { toast } from "react-toastify";
import { actualizaIngrediente } from "../../../api/ingredientes";
import queryString from "query-string";
import { faX, faSave } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { LogsInformativos } from "../../Logs/LogsSistema/LogsSistema";
import { listarUMPorTipo } from "../../../api/unidadesMedida";

function ModificaIngredientes(props) {
    const { datosIngredientes, navigate, setShowModal } = props;

    const { id, imagen } = datosIngredientes;

    // Para almacenar el valor del formulario
    const [formData, setFormData] = useState(initialFormData(datosIngredientes));

    // Para guardar el listado de categorias
    const [listUM, setListUM] = useState([]);

    useEffect(() => {
        try {
            listarUMPorTipo(formData.tipoUM).then(response => {
                const { data } = response;
                if (!listUM && data) {
                    console.log(data);
                    setListUM(formatModelUM(data));
                } else {
                    const datosUM = formatModelUM(data);
                    setListUM(datosUM);
                }
            }).catch(e => {
                console.log(e)
            })
        } catch (e) {
            console.log(e)
        }
    }, [formData.tipoUM]);

    // Para almacenar la imagen
    const [imagenFile, setImagenFile] = useState(imagen);

    // Para cancelar el registro
    const cancelarRegistro = () => {
        setShowModal(false)
    }

    // Para la animacion de carga
    const [loading, setLoading] = useState(false);

    const onSubmit = e => {
        e.preventDefault();

        if (!imagenFile || !formData.nombre || !formData.tipoUM || !formData.um || !formData.costo) {
            toast.warning("Completa el formulario");
        } else {
            try {
                setLoading(true);
                // Sube a cloudinary la imagen principal del producto
                subeArchivosCloudinary(imagenFile, "ingrediente").then(response => {
                    const { data } = response;
                    const dataTemp = {
                        nombre: formData.nombre,
                        tipoUM: formData.tipoUM,
                        negocio: "LA NENA",
                        um: formData.um,
                        costo: formData.costo,
                        imagen: data.secure_url,
                    }
                    actualizaIngrediente(id, dataTemp).then(response => {
                        const { data } = response;
                        navigate({
                            search: queryString.stringify(""),
                        });
                        LogsInformativos("Se ha modificado el ingrediente " + datosIngredientes.nombre, datosIngredientes);
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
                <div className="imagenPrincipal">
                    <h4 className="textoImagenPrincipal">Sube tu imagen</h4>
                    <div title="Seleccionar imagen de la categoría" className="imagenProducto">
                        <Dropzone
                            setImagenFile={setImagenFile}
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

                        <Form.Group as={Col} controlId="formGridNombre">
                            <Form.Label>Tipo de unidad de medida</Form.Label>
                            <Form.Control
                                as="select"
                                name="tipoUM"
                                defaultValue={formData.tipoUM}
                            >
                                <option>Elige una opción</option>
                                <option value="Primaria" selected={formData.tipo == "Primaria"}>Primaria</option>
                                <option value="Secundaria" selected={formData.tipo == "Secundaria"}>Secundaria</option>
                            </Form.Control>
                        </Form.Group>
                    </Row>

                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="formGridNombre">
                            <Form.Label>Costo</Form.Label>
                            <Form.Control
                                type="text"
                                name="costo"
                                placeholder="Escribe el costo del ingrediente"
                                defaultValue={formData.costo}
                            />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridNombre">
                            <Form.Label>Unidad de medida</Form.Label>
                            <Form.Control
                                as="select"
                                name="um"
                                defaultValue={formData.um}
                            >
                                <option>Elige una opción</option>
                                {map(listUM, (ingrediente, index) => (
                                    <option key={index} value={ingrediente?.nombre} selected={formData.um == ingrediente?.nombre}>{ingrediente?.nombre}</option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                    </Row>
                </div>

                <Form.Group as={Row} className="botonSubirProducto">
                    <Col>
                        <Button
                            title="Modificar ingrediente"
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

function initialFormData(data) {
    return {
        nombre: data.nombre,
        tipoUM: data.tipoUM,
        costo: data.costo,
        um: data.um,
    }
}

function formatModelUM(data) {
    //console.log(data)
    const dataTemp = []
    data.forEach(data => {
        dataTemp.push({
            id: data._id,
            nombre: data.nombre,
            tipo: data.tipo,
            estadoUM: data.estadoUM,
            fechaCreacion: data.createdAt,
            fechaActualizacion: data.updatedAt
        });
    });
    return dataTemp;
}

export default ModificaIngredientes;
