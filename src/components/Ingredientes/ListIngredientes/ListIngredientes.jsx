import { useState, useEffect } from 'react';
import "../../../scss/styles.scss";
import { Badge, Container } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrashCan, faArrowDownLong } from "@fortawesome/free-solid-svg-icons";
import BasicModal from "../../Modal/BasicModal";
import DataTable from "react-data-table-component";
import { estilos } from "../../../utils/tableStyled";
import CancelarIngredientes from '../CancelarIngredientes';
import EliminaIngredientes from '../EliminaIngredientes';
import ModificaIngredientes from '../ModificaIngredientes';
import 'dayjs/locale/es';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';

function ListIngredientes(props) {
    const { listIngredientes, location, navigate, rowsPerPage, setRowsPerPage, page, setPage, noTotalIngredientes } = props;

    dayjs.locale('es');
    dayjs.extend(localizedFormat);

    //Para el modal
    const [showModal, setShowModal] = useState(false);
    const [contentModal, setContentModal] = useState(null);
    const [titulosModal, setTitulosModal] = useState(null);

    //Para la eliminacion de categorias
    const eliminaIngredientes = (content) => {
        setTitulosModal("Eliminación ingrediente");
        setContentModal(content);
        setShowModal(true);
    }

    //Para la modificacion de categorias
    const modificaIngredientes = (content) => {
        setTitulosModal("Modificación ingrediente");
        setContentModal(content);
        setShowModal(true);
    }

    // Para cancelar la venta
    const cancelarIngrediente = (content) => {
        setTitulosModal("Cancelar ingrediente");
        setContentModal(content);
        setShowModal(true);
    }

    // Para cancelar la venta
    const recuperarIngrediente = (content) => {
        setTitulosModal("Recuperar ingrediente");
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
            name: "Precio de adquisición",
            selector: row => (
                <>
                    <Badge
                        bg="success" className="estado">
                        ${''}
                        {new Intl.NumberFormat('es-MX', {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                        }).format(row.costoAdquisicion)} MXN
                    </Badge>
                </>
            ),
            sortable: false,
            center: true,
            reorder: false
        },
        {
            name: "UM adquisición",
            selector: row => row.umAdquisicion === "Paquete" ? row.umAdquisicion : row.umAdquisicion === "Unidad" ? row.umPrimaria : row.umAdquisicion + row.umPrimaria.toLowerCase(),
            sortable: false,
            center: true,
            reorder: false
        },
        {
            name: "UM producción",
            selector: row => row.umProduccion === "Piezas" ? row.umProduccion : row.umProduccion === "Unidad" ? row.umPrimaria : row.umPrimaria + row.umProduccion.toLowerCase(),
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
                                        title="Cancelar ingrediente"
                                        onClick={() => {
                                            cancelarIngrediente(
                                                <CancelarIngredientes
                                                    datosIngrediente={row}
                                                    location={location}
                                                    navigate={navigate}
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
                                        title="Recuperar ingrediente"
                                        onClick={() => {
                                            recuperarIngrediente(
                                                <CancelarIngredientes
                                                    datosIngrediente={row}
                                                    location={location}
                                                    navigate={navigate}
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
            selector: row => dayjs(row.fechaActualizacion).format('dddd, LL hh:mm A'),
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
                            title="Modificar ingrediente"
                            bg="success"
                            className="editar"
                            onClick={() => {
                                modificaIngredientes(
                                    <ModificaIngredientes
                                        datosIngredientes={row}
                                        location={location}
                                        navigate={navigate}
                                        setShowModal={setShowModal}
                                    />
                                )
                            }}>
                            <FontAwesomeIcon icon={faPenToSquare} className="text-lg" />
                        </Badge>

                        <Badge
                            title="Eliminar ingrediente"
                            bg="danger"
                            className="eliminar"
                            onClick={() => {
                                eliminaIngredientes(
                                    <EliminaIngredientes
                                        datosIngrediente={row}
                                        location={location}
                                        navigate={navigate}
                                        setShowModal={setShowModal}
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

    // Definiendo estilos para data table
    // Configurando animacion de carga
    const [pending, setPending] = useState(true);
    const [rows, setRows] = useState([]);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setRows(listIngredientes);
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
                    data={listIngredientes}
                    progressPending={pending}
                    paginationComponentOptions={paginationComponentOptions}
                    paginationResetDefaultPage={resetPaginationToogle}
                    customStyles={estilos}
                    sortIcon={<FontAwesomeIcon icon={faArrowDownLong} />}
                    pagination
                    paginationServer
                    paginationTotalRows={noTotalIngredientes}
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

export default ListIngredientes;
