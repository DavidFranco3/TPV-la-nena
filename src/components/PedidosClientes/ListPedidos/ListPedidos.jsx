import { useState, useEffect } from 'react';
import { Badge, Container } from "react-bootstrap";
import "../../../scss/styles.scss";
import BasicModal from "../../Modal/BasicModal";
import DetallesPedido from "../DetallesPedido";
import CancelarPedido from "../CancelarPedido";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faX, faRotateLeft, faArrowDownLong, faMessage } from "@fortawesome/free-solid-svg-icons";
import DataTable from "react-data-table-component";
import { estilos } from "../../../utils/tableStyled";
import 'dayjs/locale/es';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';

function ListPedidos(props) {
    const { listPedidos, tipoUsuario, location, setRefreshCheckLogin, navigate, rowsPerPage, setRowsPerPage, page, setPage, noTotalPedidos } = props;

    dayjs.locale('es');
    dayjs.extend(localizedFormat);

    //Para el modal
    const [showModal, setShowModal] = useState(false);
    const [contentModal, setContentModal] = useState(null);
    const [titulosModal, setTitulosModal] = useState(null);

    //Para ver detalles
    const detallesPedido = (content) => {
        setTitulosModal("Detalles del pedido");
        setContentModal(content);
        setShowModal(true);
    }

    // Para cancelar la venta
    const cancelarPedido = (content) => {
        setTitulosModal("Cancelar pedido");
        setContentModal(content);
        setShowModal(true);
    }

    // Para cancelar la venta
    const recuperarPedido = (content) => {
        setTitulosModal("Recuperar pedido");
        setContentModal(content);
        setShowModal(true);
    }

    // Para cancelar la venta
    const registrarMovimiento = (content) => {
        setTitulosModal("Registrar movimiento");
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
            name: "No. Pedido",
            selector: row => row.numeroTiquet,
            sortable: false,
            center: true,
            reorder: false,
        },
        {
            name: "Día de la venta",
            selector: row => dayjs(row.fechaCreacion).format('dddd, LL hh:mm A'),
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
                                        className="estado"
                                    >
                                        Pedido completado
                                    </Badge>
                                </>
                            )
                            :
                            (
                                <>
                                    <Badge
                                        bg="danger"
                                        className="estado"
                                    >
                                        Pedido cancelado
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
            name: "Productos",
            sortable: false,
            center: true,
            reorder: false,
            selector: row => row.productosVendidos,
        },
        {
            name: "Total",
            sortable: false,
            center: true,
            reorder: false,
            selector: row => (
                <>
                    <Badge
                        bg="success">
                        ${''}
                        {new Intl.NumberFormat('es-MX', {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                        }).format(row.total)} MXN
                    </Badge>
                </>
            ),
        },
        {
            name: "Confirmar",
            selector: row => (
                <>
                    {tipoUsuario === "externo" ?
                        (
                            <>
                                <a
                                    className="text-emerald-700 no-underline"
                                    //className="editar"
                                    //cursor= "pointer !important"
                                    title="Enviar mensaje de whatsapp"
                                    href={"whatsapp://send?text=Se ha realizado un nuevo pedido con numero " + row.numeroTiquet + "&phone=+524427140979"}
                                    target="_blank"
                                    rel="noreferrer"
                                >Enviar mensaje</a>
                            </>
                        )
                        :
                        (
                            "No disponible"
                        )
                    }
                </>

            ),
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
                            title="Ver productos vendidos"
                            bg="primary"
                            className="indicadorDetallesVenta"
                            onClick={() => {
                                detallesPedido(
                                    <DetallesPedido
                                        datos={row}
                                        location={location}
                                        navigate={navigate}
                                    />
                                )
                            }}
                        >
                            <FontAwesomeIcon icon={faEye} className="text-lg" />
                        </Badge>
                        {/*{
                            row.estado === "true" ?
                                (
                                    <>
                                        <Badge
                                            bg="danger"
                                            title="Cancelar venta"
                                            className="indicadorCancelarVenta"
                                            onClick={() => {
                                                cancelarPedido(
                                                    <CancelarPedido
                                                        datosPedidos={row}
                                                        location={location}
                                                        navigate={navigate}
                                                        setShowModal={setShowModal}
                                                    />
                                                )
                                            }}
                                        >
                                            <FontAwesomeIcon icon={faX} className="text-lg" />
                                        </Badge>
                                    </>
                                )
                                :
                                (
                                    <>
                                        <Badge
                                            bg="success"
                                            title="Recuperar venta"
                                            className="indicadorCancelarVenta"
                                            onClick={() => {
                                                recuperarPedido(
                                                    <CancelarPedido
                                                        datosPedidos={row}
                                                        location={location}
                                                        navigate={navigate}
                                                        setShowModal={setShowModal}
                                                    />
                                                )
                                            }}
                                        >
                                            <FontAwesomeIcon icon={faRotateLeft} className="text-lg" />
                                        </Badge>
                                    </>
                                )
                        }*/}
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
            setRows(listPedidos);
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
                    data={listPedidos}
                    progressPending={pending}
                    paginationComponentOptions={paginationComponentOptions}
                    paginationResetDefaultPage={resetPaginationToogle}
                    customStyles={estilos}
                    sortIcon={<FontAwesomeIcon icon={faArrowDownLong} />}
                    pagination
                    paginationServer
                    paginationTotalRows={noTotalPedidos}
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

export default ListPedidos;
