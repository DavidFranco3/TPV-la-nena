import { useState, useEffect } from 'react';
import {map} from "lodash";
import moment from "moment";
import "moment/locale/es";
import {Badge, Image, Container} from "react-bootstrap";
import "./ListHistoricoVentasMes.scss";
import Total from "../../../page/HistoricoVentasMes/Total";
import BasicModal from "../../Modal/BasicModal";
import HistorialVentasMes from "../../../page/HistorialVentasMes";
import LogoHistorial from "../../../assets/png/historial.png";
import ProcesamientoCSV from "../ProcesamientoCSV";
import {estilos} from "../../../utils/tableStyled";
import DataTable from "react-data-table-component";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPenToSquare, faTrashCan, faArrowDownLong} from "@fortawesome/free-solid-svg-icons";

function ListHistoricoVentasMes(props) {
    const { listVentas, rowsPerPage, setRowsPerPage, page, setPage, noTotalVentas, setRefreshCheckLogin } = props;

    //console.log(listVentas)

    moment.locale("es");

    //Para el modal
    const [showModal, setShowModal] = useState(false);
    const [contentModal, setContentModal] = useState(null);
    const [titulosModal, setTitulosModal] = useState(null);

    
    const [listaDias, setListaDias] = useState([]);

    useEffect(() => {
        let listaFechasTemp = []
        map(listVentas, (ventas, index) => {
            const tempFecha = ventas.agrupar.split("T");
            //console.log(tempFecha)
            listaFechasTemp.push(tempFecha[0]);
        })
        //console.log(listaFechasTemp)
        let listaDias = listaFechasTemp.filter((item,index)=>{
            return listaFechasTemp.indexOf(item) === index;
        })
        setListaDias(listaDias)
        //console.log(listaDias);
    }, [listVentas]);

    //Para ver detalles
    const detallesHistorial = (content) => {
        setTitulosModal("Historial del mes");
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
            name: "Ventas del mes",
            selector: row => moment(row).format('MMMM'),
            sortable: false,
            center: true,
            reorder: false
        },
        {
            name: "Detalles del mes",
            selector: row => (
                    <>
            <Total
                                dia={row}
                            />
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
                                title="Ver las ventas del mes" 
                                bg="light"
                                className="vistaDetalles"
                                onClick={() => {
                                    detallesHistorial(
                                        <HistorialVentasMes
                                            setRefreshCheckLogin={setRefreshCheckLogin}
                                            dia={row}
                                            setShowModal={setShowModal}
                                        />
                                    )
                                }}
                            >
                                <Image
                                    src={LogoHistorial}
                                    className="logoHistorial"
                                />
                            </Badge>
                                
                            <ProcesamientoCSV dia={row} />
                                
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
                setRows(listaDias);
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
                    data={listaDias}
                    dense
                    progressPending={pending}
                    paginationComponentOptions={paginationComponentOptions}
                    paginationResetDefaultPage={resetPaginationToogle}
                    customStyles={estilos}
                    sortIcon={<FontAwesomeIcon icon={faArrowDownLong} />}
                    pagination
                    paginationServer
                    paginationTotalRows={noTotalVentas}
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

export default ListHistoricoVentasMes;
