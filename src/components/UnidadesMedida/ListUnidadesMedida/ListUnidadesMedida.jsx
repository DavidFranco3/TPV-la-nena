import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import DataTable from 'react-data-table-component';
import "../../../scss/styles.scss";
import { Badge } from "react-bootstrap";
import BasicModal from "../../Modal/BasicModal";
import EliminacionFisicaUnidadesMedida from "../EliminacionFisica";
import ModificacionUnidadesMedida from "../Modificacion";
import EliminacionLogicaUnidadesMedida from '../EliminacionLogica';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDownLong, faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { estilos } from "../../../utils/tableStyled";
import 'dayjs/locale/es'
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';

function ListUnidadesMedida(props) {
    const { listUM, location, navigate, rowsPerPage, setRowsPerPage, page, setPage, noTotalUM } = props;

    dayjs.locale('es') // use Spanish locale globally
    dayjs.extend(localizedFormat)

    const enrutamiento = useNavigate();

    // Para hacer uso del modal
    const [showModal, setShowModal] = useState(false);
    const [contentModal, setContentModal] = useState(null);
    const [titulosModal, setTitulosModal] = useState(null);

    //Para la eliminacion fisica de clientes
    const eliminaUM = (content) => {
        setTitulosModal("Eliminando");
        setContentModal(content);
        setShowModal(true);
    }

    // Para la modificacion de datos
    const modificaUM = (content) => {
        setTitulosModal("Modificando");
        setContentModal(content);
        setShowModal(true);
    }

    //Para la eliminacion logica de clientes
    const eliminaLogicaUM = (content) => {
        setTitulosModal("Deshabilitando unidad de medida");
        setContentModal(content);
        setShowModal(true);
    }

    //Para la eliminacion logica de clientes
    const habilitaUM = (content) => {
        setTitulosModal("Habilitando unidad de medida");
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
            name: 'Nombre',
            selector: row => row.nombre,
            sortable: false,
            center: true,
            reorder: false
        },
        {
            name: 'Abreviatura',
            selector: row => row.abreviatura,
            sortable: false,
            center: true,
            reorder: false
        },
        {
            name: 'Tipo',
            selector: row => row.tipo,
            sortable: false,
            center: true,
            reorder: false
        },
        {
            name: 'Estado',
            sortable: false,
            center: true,
            reorder: false,
            selector: row => row.estadoUM === "true" ?
                (
                    <>
                        <Badge
                            bg="success"
                            className="editar"
                            title="Deshabilitar UM"
                            onClick={() => {
                                eliminaLogicaUM(
                                    <EliminacionLogicaUnidadesMedida
                                        dataUM={row}
                                        setShowModal={setShowModal}
                                        navigate={navigate}
                                    />
                                )
                            }}
                        >
                            Habilitada
                        </Badge>
                    </>
                )
                :
                (
                    <>
                        <Badge
                            bg="danger"
                            className="eliminar"
                            title="Habilitar cliente"
                            onClick={() => {
                                habilitaUM(
                                    <EliminacionLogicaUnidadesMedida
                                        dataUM={row}
                                        setShowModal={setShowModal}
                                        navigate={navigate}
                                    />
                                )
                            }}
                        >
                            Deshabilitada
                        </Badge>
                    </>
                )
        },
        {
            name: 'Última modificación',
            selector: row => dayjs(row.fechaActualizacion).format("LL"),
            sortable: false,
            center: true,
            reorder: false
        },
        {
            name: 'Acciones',
            center: true,
            reorder: false,
            selector: row => (
                <>
                    <div className="flex justify-end items-center space-x-4">
                        <Badge
                            bg="success"
                            className="editar"
                            title="Modificar"
                            onClick={() => {
                                modificaUM(
                                    <ModificacionUnidadesMedida
                                        dataUM={row}
                                        setShowModal={setShowModal}
                                        navigate={navigate}
                                    />)
                            }}
                        >
                            <FontAwesomeIcon icon={faPenToSquare} className="text-lg" />
                        </Badge>
                        <Badge
                            bg="danger"
                            title="Eliminar"
                            className="eliminar"
                            onClick={() => {
                                eliminaUM(
                                    <EliminacionFisicaUnidadesMedida
                                        dataUM={row}
                                        setShowModal={setShowModal}
                                        navigate={navigate}
                                    />)
                            }}
                        >
                            <FontAwesomeIcon icon={faTrashCan} className="text-lg" />
                        </Badge>
                    </div>
                </>
            )
        }
    ];

    // Configurando animacion de carga
    const [pending, setPending] = useState(true);
    const [rows, setRows] = useState([]);


    useEffect(() => {
        const timeout = setTimeout(() => {
            setRows(listUM);
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
                    data={listUM}
                    progressPending={pending}
                    paginationComponentOptions={paginationComponentOptions}
                    paginationResetDefaultPage={resetPaginationToogle}
                    customStyles={estilos}
                    sortIcon={<FontAwesomeIcon icon={faArrowDownLong} />}
                    pagination
                    paginationServer
                    paginationTotalRows={noTotalUM}
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

export default ListUnidadesMedida;
