import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrashCan, faArrowDownLong } from "@fortawesome/free-solid-svg-icons";
import BasicModal from "../../Modal/BasicModal";
import moment from "moment";
import "moment/locale/es";
import EliminaProductos from "../EliminaProductos";
import { Badge, Container } from "react-bootstrap";
import ModificaProductos from "../ModificaProductos";
import CancelarProductos from '../CancelarProductos';
import "../../../scss/styles.scss";
import DataTable from "react-data-table-component";
import { estilos } from "../../../utils/tableStyled";
import Categoria from "./Categoria";

function ListProductos(props) {
    const { listProductos, listCategorias, location, history, rowsPerPage, setRowsPerPage, page, setPage, noTotalProductos, setRefreshCheckLogin } = props;

    moment.locale("es");

    //Para el modal
    const [showModal, setShowModal] = useState(false);
    const [contentModal, setContentModal] = useState(null);
    const [titulosModal, setTitulosModal] = useState(null);

    //Para la eliminacion de productos
    const eliminaProductos = (content) => {
        setTitulosModal("Eliminación producto");
        setContentModal(content);
        setShowModal(true);
    }

    //Para la modificacion de productos
    const modificaProductos = (content) => {
        setTitulosModal("Modificación producto");
        setContentModal(content);
        setShowModal(true);
    }

    // Para cancelar la venta
    const cancelarProducto = (content) => {
        setTitulosModal("Cancelar producto");
        setContentModal(content);
        setShowModal(true);
    }

    // Para cancelar la venta
    const recuperarProducto = (content) => {
        setTitulosModal("Recuperar producto");
        setContentModal(content);
        setShowModal(true);
    }

    const handleChangePage = (page) => {
        // console.log("Nueva pagina "+ newPage)
        setPage(page);
    };

    const handleChangeRowsPerPage = (newPerPage) => {
        // console.log("Registros por pagina "+ parseInt(event.target.value, 10))
        setRowsPerPage(newPerPage)
        //setRowsPerPage(parseInt(event.target.value, 10));
        setPage(1);
    };

    const columns = [
        {
            name: "Nombre",
            selector: row => row.nombre,
            sortable: false,
            center: true,
            reorder: false
        },
        {
            name: "Categoría",
            selector: row => (
                <>
                    <Categoria
                        id={row.categoria}
                    />
                </>
            ),
            sortable: false,
            center: true,
            reorder: false
        },
        {
            name: "Precio",
            selector: row => (
                <>
                    <Badge
                        bg="success" className="estado">
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
        {
            name: "Estado",
            selector: row => (
                <>
                    {
                        row.estado === "true" ?
                            (
                                <>
                                    <Badge
                                        bg="success"
                                        //className="estado"
                                        className="indicadorCancelarVenta"
                                        title="Cancelar categoria"
                                        onClick={() => {
                                            cancelarProducto(
                                                <CancelarProductos
                                                    datosProducto={row}
                                                    listCategorias={listCategorias}
                                                    location={location}
                                                    history={history}
                                                    setShowModal={setShowModal}
                                                />
                                            )
                                        }}
                                    >
                                        Habilitado
                                    </Badge>
                                </>
                            )
                            :
                            (
                                <>
                                    <Badge
                                        bg="danger"
                                        //className="estado"
                                        className="indicadorCancelarVenta"
                                        title="Recuperar categoria"
                                        onClick={() => {
                                            recuperarProducto(
                                                <CancelarProductos
                                                    datosProducto={row}
                                                    listCategorias={listCategorias}
                                                    location={location}
                                                    history={history}
                                                    setShowModal={setShowModal}
                                                />
                                            )
                                        }}
                                    >
                                        Deshabilitado
                                    </Badge>
                                </>
                            )
                    }
                </>
            ),

            sortable: false,
            center: true,
            reorder: false
        },
        {
            name: "Modificación",
            selector: row => moment(row.fechaActualizacion).format('LLLL'),
            sortable: false,
            center: true,
            reorder: false
        },
        {
            name: "Acciones",
            selector: row => (
                <>
                    <div className="flex justify-end items-center space-x-4">
                        <Badge
                            bg="success"
                            title="Modificar producto"
                            className="editar"
                            onClick={() => {
                                modificaProductos(
                                    <ModificaProductos
                                        datosProducto={row}
                                        listCategorias={listCategorias}
                                        location={location}
                                        history={history}
                                        setShowModal={setShowModal}
                                    />
                                )
                            }}>
                            <FontAwesomeIcon icon={faPenToSquare} className="text-lg" />
                        </Badge>

                        <Badge
                            title="Eliminar producto"
                            bg="danger"
                            className="eliminar" onClick={() => {
                                eliminaProductos(
                                    <EliminaProductos
                                        datosProducto={row}
                                        listCategorias={listCategorias}
                                        location={location}
                                        history={history}
                                        setShowModal={setShowModal}
                                        setRefreshCheckLogin={setRefreshCheckLogin}
                                    />
                                )
                            }}>
                            <FontAwesomeIcon icon={faTrashCan} className="text-lg" />
                        </Badge>

                    </div>
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
            setRows(listProductos);
            setPending(false);
        }, 0);
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
                <DataTable
                    columns={columns}
                    noDataComponent="No hay registros para mostrar"
                    data={listProductos}
                    progressPending={pending}
                    paginationComponentOptions={paginationComponentOptions}
                    paginationResetDefaultPage={resetPaginationToogle}
                    customStyles={estilos}
                    sortIcon={<FontAwesomeIcon icon={faArrowDownLong} />}
                    pagination
                    paginationServer
                    paginationTotalRows={noTotalProductos}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                    onChangePage={handleChangePage}
                />
            </Container>

            <BasicModal show={showModal} setShow={setShowModal} title={titulosModal}>
                {contentModal}
            </BasicModal>
        </>
    );
}

export default ListProductos;
