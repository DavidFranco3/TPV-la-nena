import { useState, useEffect } from "react"
import { Col, Row } from "react-bootstrap";
import "../../../scss/styles.scss";
import { logoTiquetGris } from "../../../assets/base64/logo-tiquet";
import { toast } from "react-toastify";
import 'dayjs/locale/es';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import { listarMovimientos } from "../../../api/movimientosCajas";
import { obtenerCaja } from "../../../api/cajas"

function GeneraPdf(props) {
    const { datos } = props;

    const { idCaja, movimientosAcumulados, dineroAcumulado, observaciones, fechaCreacion } = datos;

    const movimientosTotales = movimientosAcumulados.concat(datos);

    console.log(movimientosTotales);

    dayjs.locale('es');
    dayjs.extend(localizedFormat);

    // Almacenar el listado de materias primas registradas
    const [listMovimientos, setListMovimientos] = useState(null);

    useEffect(() => {
        try {
            listarMovimientos(idCaja).then(response => {
                const { data } = response;

                if (!listMovimientos && data) {
                    setListMovimientos(formatModelMovimientosCajas(data));
                } else {
                    const datosMovimientos = formatModelMovimientosCajas(data);
                    setListMovimientos(datosMovimientos);
                }
            }).catch(e => {
                console.log(e)
            })
        } catch (e) {
            console.log(e)
        }
    }, []);

    // Almacenar el listado de materias primas registradas
    const [saldo, setSaldo] = useState(null);

    useEffect(() => {
        try {
            obtenerCaja(idCaja).then(response => {
                const { data } = response;
                const { saldo } = data;

                setSaldo(saldo);
            }).catch(e => {
                console.log(e)
            })
        } catch (e) {
            console.log(e)
        }
    }, []);

    const handlePrint = () => {
        toast.info("Generando... espere por favor")

        const timer = setTimeout(() => {
            const tiquetGenerado = window.open('Tiquet', 'PRINT', 'height=400,width=600');
            tiquetGenerado.document.write('<html><head>');
            tiquetGenerado.document.write('<style>.tabla{width:100%;border-collapse:collapse;margin:16px 0 16px 0;}.tabla th{border:1px solid #ddd;padding:4px;background-color:#d4eefd;text-align:left;font-size:30px;}.tabla td{border:1px solid #ddd;text-align:left;padding:6px;} p {margin-top: -10px !important;} .cafe__number {margin-top: -10px !important;} .logotipo {width: 91px !important; margin: 0 auto;} img {width: 91px !important; margin: 0 auto;} .detallesTitulo {margin-top: 10px !important;} </style>');
            tiquetGenerado.document.write('</head><body>');
            tiquetGenerado.document.write(document.getElementById('tiquetAutogenerado').innerHTML);
            tiquetGenerado.document.write('</body></html>');

            tiquetGenerado.document.close();
            tiquetGenerado.focus();
            tiquetGenerado.print();
            tiquetGenerado.close();
        }, 2500);
        return () => clearTimeout(timer);

    }

    return (
        <>
            <div id="tiquetAutogenerado" className="ticket__autogenerado">
                <div className="ticket__information">
                    <div className="cafe">
                        {/**/}
                        <div id="logo" className="logotipo">
                            <img src={logoTiquetGris} alt="logo" />
                        </div>
                        {/**/}
                        <div className="detallesTitulo">
                            <p className="cafe__number">Teléfono para pedidos</p>
                            <p className="cafe__number">442-714-09-79</p>
                            <p className="cafe__number">
                                {dayjs(fechaCreacion).format('dddd, LL hh:mm A')}
                            </p>
                        </div>
                    </div>
                    <div className="ticket__table">
                        <table>
                            <thead>
                                <tr>
                                    <th className="items__numeracion">#</th>
                                    <th className="items__description">Movimiento</th>
                                    <th className="items__price">Monto</th>
                                </tr>
                            </thead>
                            <tbody>
                                {movimientosTotales?.map((item, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}.- </td>
                                        <td className="items__description">{item.movimiento}</td>
                                        <td>
                                            ${''}
                                            {new Intl.NumberFormat('es-MX', {
                                                minimumFractionDigits: 2,
                                                maximumFractionDigits: 2,
                                            }).format(item.monto)} MXN
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="subtotal">
                        <hr />
                        <Row>
                            <Col>
                                <p className="observaciones__tiquet">
                                    {observaciones}
                                </p>
                            </Col>
                            <Col>
                                <div className="subtotal__price">
                                    Total de efectivo ${''}
                                    {new Intl.NumberFormat('es-MX', {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2,
                                    }).format(dineroAcumulado)} MXN
                                </div>
                            </Col>
                        </Row>
                        <hr />
                    </div>
                </div>
            </div>

            <Row>
                <Col sm={8}></Col>
                <Col sm={4}>
                    <button
                        className="btnImprimirdeNuevo"
                        title="Imprimir ticket"
                        onClick={() => handlePrint()}
                    > 🖨︎</button>
                </Col>
            </Row>
        </>
    );
}

function formatModelMovimientosCajas(movimientos) {
    const tempMovimientos = []
    movimientos.forEach((movimiento) => {
        tempMovimientos.push({
            id: movimiento._id,
            idCaja: movimiento.idCaja,
            idCajero: movimiento.idCajero,
            cajero: movimiento.cajero,
            movimiento: movimiento.movimiento,
            monto: movimiento.monto,
            pago: movimiento.pago,
            estado: movimiento.estado,
            fechaCreacion: movimiento.createdAt,
            fechaActualizacion: movimiento.updatedAt
        });
    });
    return tempMovimientos;
}

export default GeneraPdf;
