import { useEffect, useState } from 'react';
import { registraIngredientes } from "../../../api/ingredientes";
import { map } from "lodash";
import { listarUMPorTipo } from "../../../api/unidadesMedida";
import Dropzone from "../../Dropzone";
import "../../../scss/styles.scss";
import { Button, Col, Form, Row, Spinner } from "react-bootstrap";
import { subeArchivosCloudinary } from "../../../api/cloudinary";
import { toast } from "react-toastify";
import queryString from "query-string";
import { faX, faSave } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { LogsInformativos } from "../../Logs/LogsSistema/LogsSistema";

function RegistroIngredientes(props) {
    const { setShowModal, navigate } = props;
    const [formData, setFormData] = useState(initialFormValue());
    const [loading, setLoading] = useState(false);

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

    //Para almacenar la imagen del producto que se guardara a la bd
    const [imagenIngrediente, setImagenIngrediente] = useState(null);

    // Para cancelar el registro
    const cancelarRegistro = () => {
        setShowModal(false)
    }

    const onSubmit = e => {
        e.preventDefault();

        if (!imagenIngrediente || !formData.nombre || !formData.umPrimaria || !formData.costoUMPrimaria) {
            toast.warning("Completa el formulario");
        } else {
            try {
                setLoading(true);
                // Sube a cloudinary la imagen principal del producto
                subeArchivosCloudinary(imagenIngrediente, "ingrediente").then(response => {
                    const { data } = response;

                    const dataTemp = {
                        nombre: formData.nombre,
                        umPrimaria: formData.umPrimaria,
                        costoUMPrimaria: formData.costoUMPrimaria,
                        tipo: formData.umPrimaria === "Paquete" ? "" : formData.tipo,
                        umSecundaria: formData.umPrimaria === "Paquete" ? "Piezas" : formData.umSecundaria,
                        cantidadPiezas: formData.cantidadPiezas,
                        costoUMSecundaria: formData.umPrimaria === "Paquete" ? parseFloat(formData.costoUMPrimaria) / formData.cantidadPiezas : formData.umSecundaria === "Decá" ? parseFloat(formData.costoUMPrimaria) * 100 : formData.umSecundaria === "Hectó" ? parseFloat(formData.costoUMPrimaria) * 10 : formData.umSecundaria === "Kiló" ? parseFloat(formData.costoUMPrimaria) * 1000 : formData.umSecundaria === "Decí" ? parseFloat(formData.costoUMPrimaria) / 10 : formData.umSecundaria === "Centí" ? parseFloat(formData.costoUMPrimaria) / 100 : formData.umSecundaria === "Milí" ? parseFloat(formData.costoUMPrimaria) / 1000 : "",
                        negocio: "LA NENA",
                        imagen: data.secure_url,
                        estado: "true",
                    }
                    registraIngredientes(dataTemp).then(response => {
                        const { data } = response;
                        navigate({
                            search: queryString.stringify(""),
                        });
                        LogsInformativos("Se ha registrado el ingrediente " + formData.nombre, data.datos);
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

    console.log(formData);

    return (
        <>
            <Form onSubmit={onSubmit} onChange={onChange}>
                <div className="imagenPrincipal">
                    <h4 className="textoImagenPrincipal">Sube tu imagen</h4>
                    <div title="Seleccionar imagen del ingrediente" className="imagenProducto">
                        <Dropzone
                            setImagenFile={setImagenIngrediente}
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
                            <Form.Label>Costo</Form.Label>
                            <Form.Control
                                type="text"
                                name="costoUMPrimaria"
                                placeholder="Escribe el costo del ingrediente"
                                defaultValue={formData.costoUMPrimaria}
                            />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridNombre">
                            <Form.Label>Unidad de medida primaria</Form.Label>
                            <Form.Control
                                as="select"
                                name="umPrimaria"
                                defaultValue={formData.umPrimaria}
                            >
                                <option>Elige una opción</option>
                                <option value="Litros">Litros</option>
                                <option value="Gramos">Gramos</option>
                                <option value="Metros">Metros</option>
                                <option value="Paquete">Paquete</option>
                            </Form.Control>
                        </Form.Group>
                    </Row>

                    <Row className="mb-3">
                        {
                            formData.umPrimaria !== "" && formData.umPrimaria !== "Paquete" &&
                            (
                                <>
                                    <Form.Group as={Col} controlId="formGridNombre">
                                        <Form.Label>Tipo</Form.Label>
                                        <Form.Control
                                            as="select"
                                            name="tipo"
                                            defaultValue={formData.tipo}
                                        >
                                            <option>Elige una opción</option>
                                            <option value="Múltiplo">Múltiplo</option>
                                            <option value="Submúltiplo">Submúltiplo</option>
                                        </Form.Control>
                                    </Form.Group>
                                </>
                            )
                        }

                        {
                            formData.umPrimaria === "Paquete" &&
                            (
                                <>
                                    <Form.Group as={Col} controlId="formGridNombre">
                                        <Form.Label>Tipo</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="tipo"
                                            value="Piezas"
                                            disabled
                                        />
                                    </Form.Group>
                                </>
                            )
                        }

                        {
                            formData.tipo === "Múltiplo" && formData.umPrimaria !== "Paquete" &&
                            (
                                <>
                                    <Form.Group as={Col} controlId="formGridNombre">
                                        <Form.Label>Unidad de medida secundaria</Form.Label>
                                        <Form.Control
                                            as="select"
                                            name="umSecundaria"
                                            defaultValue={formData.umSecundaria}
                                        >
                                            <option>Elige una opción</option>
                                            <option value="Decá">Decá{formData.umPrimaria.toLowerCase()}</option>
                                            <option value="Hectó">Hectó{formData.umPrimaria.toLowerCase()}</option>
                                            <option value="Kiló">Kiló{formData.umPrimaria.toLowerCase()}</option>
                                        </Form.Control>
                                    </Form.Group>
                                </>
                            )
                        }

                        {
                            formData.tipo === "Submúltiplo" && formData.umPrimaria !== "Paquete" &&
                            (
                                <>
                                    <Form.Group as={Col} controlId="formGridNombre">
                                        <Form.Label>Unidad de medida secundaria</Form.Label>
                                        <Form.Control
                                            as="select"
                                            name="umSecundaria"
                                            defaultValue={formData.umSecundaria}
                                        >
                                            <option>Elige una opción</option>
                                            <option value="Decí">Decí{formData.umPrimaria.toLowerCase()}</option>
                                            <option value="Centí">Centí{formData.umPrimaria.toLowerCase()}</option>
                                            <option value="Milí">Milí{formData.umPrimaria.toLowerCase()}</option>
                                        </Form.Control>
                                    </Form.Group>
                                </>
                            )
                        }

                        {
                            formData.umPrimaria === "Paquete" &&
                            (
                                <>
                                    <Form.Group as={Col} controlId="formGridNombre">
                                        <Form.Label>Cantidad de piezas del paquete</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="cantidadPiezas"
                                            defaultValue={formData.cantidadPiezas}
                                            placeholder="Cantidad de piezas que contiene el paquete"
                                        />
                                    </Form.Group>
                                </>
                            )
                        }
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
        umPrimaria: "",
        costoUMPrimaria: "",
        tipo: "",
        umSecundaria: "",
        cantidadPiezas: "",
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

export default RegistroIngredientes;
