import { useState, useEffect } from 'react';
import { map } from "lodash";
import "./DetallesVenta.scss";
import {Badge, Col, Row, Container} from "react-bootstrap";
import BasicModal from "../../Modal/BasicModal";
import GeneraPDF from "../GeneraPDF";
import DataTable from "react-data-table-component";
import {estilos} from "../../../utils/tableStyled";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowDownLong} from "@fortawesome/free-solid-svg-icons";
import Lottie from "react-lottie-player";
import AnimacionLoading from "../../../assets/json/loading.json";

function DetallesVenta(props) {
    const { datosProducto, nombreCliente, datos, fecha } = props;

    console.log(datosProducto)
    
    const { numeroTiquet } = datos;
    const {nombre, precio} = datosProducto;

    //Para el modal
    const [showModal, setShowModal] = useState(false);
    const [contentModal, setContentModal] = useState(null);
    const [titulosModal, setTitulosModal] = useState(null);

    // Para cancelar la venta
    const handlePrint = (content) => {
        setTitulosModal("Detalles del tiquet No. "+ numeroTiquet.toString());
        setContentModal(content);
        setShowModal(true);
    }
    
    const columns = [
        {
            name: ' Producto',
            selector: row => row.nombre,
            sortable: false,
            center: true,
            reorder: false
        },
        {
            name: ' Precio',
            selector: row => (
            <>
            <Badge bg="success">
                            ${''}
                            {new Intl.NumberFormat('es-MX', {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                            }).format(row.precio)} MXN
                            </Badge>
            </>
            ),
            sortable: false,
            center: true,
            reorder: false
        },
    ];
    
    // Configurando animacion de carga
    const [pending, setPending] = useState(true);
    const [rows, setRows] = useState([]);


    useEffect(() => {
        const timeout = setTimeout(() => {
            setRows(datosProducto);
            setPending(false);
        }, 2000);
        return () => clearTimeout(timeout);
    }, []);

    const paginationComponentOptions = {
        rowsPerPageText: 'Filas por página',
        rangeSeparatorText: 'de'
    };
    
       const [resetPaginationToogle, setResetPaginationToogle] = useState(false);
       
       return (
        <>        
        <Container fluid>
        Cliente: {nombreCliente}
            <DataTable
                columns={columns}
                data={datosProducto}
                progressPending={pending}
                pagination
                paginationComponentOptions={paginationComponentOptions}
                paginationResetDefaultPage={resetPaginationToogle}
                customStyles={estilos}
                sortIcon={<FontAwesomeIcon icon={faArrowDownLong} />} 
            />
        <br/>
        <br/>
        <Row>
                <Col sm={8}></Col>
                <Col sm={4}>
                    <button
                        className="btnImprimirdeNuevo"
                        title="Ver ticket" 
                        onClick={() => handlePrint(
                            <GeneraPDF
                                fecha={fecha}
                                datos={datos}
                                datosProducto={datosProducto}
                            />
                        )}
                    > 🖨︎</button>
                </Col>
            </Row>
        </Container>
        
        <BasicModal show={showModal} setShow={setShowModal} title={titulosModal}>
            {contentModal}
        </BasicModal>
        
        </>
    );
}

export default DetallesVenta;
