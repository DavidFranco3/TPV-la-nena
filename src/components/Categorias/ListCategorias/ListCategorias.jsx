import { useState, useEffect } from 'react';
import "../../../scss/styles.scss";
import moment from "moment";
import {Badge, Container} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPenToSquare, faTrashCan, faArrowDownLong} from "@fortawesome/free-solid-svg-icons";
import BasicModal from "../../Modal/BasicModal";
import EliminaCategorias from "../EliminaCategorias";
import ModificaCategorias from "../ModificaCategorias";
import DataTable from "react-data-table-component";
import {estilos} from "../../../utils/tableStyled";

function ListCategorias(props) {
    const { listCategorias, location, history, rowsPerPage, setRowsPerPage, page, setPage, noTotalCategorias } = props;

    moment.locale("es");

    //Para el modal
    const [showModal, setShowModal] = useState(false);
    const [contentModal, setContentModal] = useState(null);
    const [titulosModal, setTitulosModal] = useState(null);

    //Para la eliminacion de categorias
    const eliminaCategorias = (content) => {
        setTitulosModal("Eliminación categoría");
        setContentModal(content);
        setShowModal(true);
    }

    //Para la modificacion de categorias
    const modificaCategorias = (content) => {
        setTitulosModal("Modificación categoría");
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
                                    title="Modificar Categoría"
                                    bg="success"
                                    className="editar"
                                    onClick={() => {
                                    modificaCategorias(
                                        <ModificaCategorias
                                            datosCategorias={row}
                                            location={location}
                                            history={history}
                                            setShowModal={setShowModal}
                                        />
                                    )
                                }}>
                                    <FontAwesomeIcon icon={faPenToSquare} className="text-lg" />
                                </Badge>
                                
                                <Badge 
                                       title="Eliminar categoría"
                                       bg="danger"
                                       className="eliminar"
                                       onClick={() => {
                                    eliminaCategorias(
                                        <EliminaCategorias
                                            datosCategoria={row}
                                            location={location}
                                            history={history}
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
                setRows(listCategorias);
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
                    data={listCategorias}
                    progressPending={pending}
                    paginationComponentOptions={paginationComponentOptions}
                    paginationResetDefaultPage={resetPaginationToogle}
                    customStyles={estilos}
                    sortIcon={<FontAwesomeIcon icon={faArrowDownLong} />}
                    pagination
                    paginationServer
                    paginationTotalRows={noTotalCategorias}
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

export default ListCategorias;
