import { useState, useEffect } from 'react';
import "../../../scss/styles.scss";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons'
import BasicModal from "../../Modal/BasicModal";
import { obtenUltimoNoTiquet, registraVentas } from "../../../api/ventas";
import { Col, Button, Row, Image, Table } from "react-bootstrap";
import DatosExtraVenta from "../../Ventas/DatosExtraVenta";
import Descuento from '../../Ventas/Descuento';
import { logoTiquetGris } from "../../../assets/base64/logo-tiquet";
import 'dayjs/locale/es';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import { LogsInformativos } from "../../Logs/LogsSistema/LogsSistema";

function Tiquet(props) {
    const { idUsuario, products, empty, remove } = props;

    dayjs.locale('es');
    dayjs.extend(localizedFormat);

    const total = products.reduce((amount, item) => (amount + parseFloat(item.precio)), 0);

    const [determinaBusquedaTiquet, setDeterminaBusquedaTiquet] = useState(false);
    const [numeroTiquet, setNumeroTiquet] = useState("");

    //Para el modal
    const [showModal, setShowModal] = useState(false);
    const [contentModal, setContentModal] = useState(null);
    const [titulosModal, setTitulosModal] = useState(null);

    const handleEmptyTicket = () => {
        empty();
        setTipoPago("");
        setIVA("0");
        setTipoPedido("");
        setHacerPedido("");
        setNombreCliente("");
        setDineroIngresado("");
        setObservaciones("");
        setTipoDescuento("");
    }

    const [IVA, setIVA] = useState("0");

    const handleIVACancel = () => {
        setIVA("0");
    }

    const handleIVAApply = () => {
        setIVA("0.16");
    }

    const handlePrint = () => {
        if (products.length === 0) {
            toast.warning("Debe cargar articulos a la venta")
        } else {
            const tiquetGenerado = window.open('Tiquet', 'PRINT', 'height=800,width=1200');
            tiquetGenerado.document.write('<html><head>');
            tiquetGenerado.document.write('<style>.tabla{width:100%;border-collapse:collapse;margin:16px 0 16px 0;}.tabla th{border:1px solid #ddd;padding:4px;background-color:#d4eefd;text-align:left;font-size:30px;}.tabla td{border:1px solid #ddd;text-align:left;padding:6px;} p {margin-top: -10px !important;} .cafe__number {margin-top: -10px !important;} .logotipo {width: 91px !important; margin: 0 auto;} img {width: 91px !important; margin: 0 auto;} .logotipoRappi {width: 91px !important; margin: 0 auto;} img {width: 91px !important; margin: 0 auto;}  .detallesTitulo {margin-top: 10px !important;} .ticket__actions {display: none !important;} .remove-icon {display: none !important;} .remove-icono {display: none !important;} .items__price {color: #000000 !important;} </style>');
            tiquetGenerado.document.write('</head><body>');
            tiquetGenerado.document.write(document.getElementById('ticketGenerado').innerHTML);
            tiquetGenerado.document.write('</body></html>');

            tiquetGenerado.document.close();
            tiquetGenerado.focus();
            tiquetGenerado.print();
            tiquetGenerado.close();
        }
    }

    useEffect(() => {
        setDeterminaBusquedaTiquet(false)
        try {
            obtenUltimoNoTiquet().then(response => {
                const { data } = response;
                // console.log(data)
                setNumeroTiquet(data.noTiquet === "0" ? "1" : parseInt(data.noTiquet) + 1)
            }).catch(e => {
                console.log(e)
                setNumeroTiquet("1")
            })
        } catch (e) {
            console.log(e.response)
        }
    }, [determinaBusquedaTiquet]);

    const handleRegistraVenta = () => {
        let iva = "0";
        let comision = "0";

        if (IVA === "0.16") {
            iva = "0.16"
        }

        if (products.length === 0) {
            toast.warning("Debe cargar articulos a la venta")
        } else {
            const hoy = new Date();
            const grupo = (hoy.getMonth() + 1);
            const añoVenta = hoy.getFullYear();

            // Configurar el objeto Date para que tome en cuenta el inicio de semana según tu localidad
            hoy.setHours(0, 0, 0);
            hoy.setDate(hoy.getDate() + 4 - (hoy.getDay() || 7));

            // Calcular el número de la semana
            const yearStart = new Date(hoy.getFullYear(), 0, 1);
            const weekNumber = Math.ceil(((hoy - yearStart) / 86400000 + 1) / 7);

            try {
                const dataTemp = {
                    numeroTiquet: numeroTiquet,
                    cliente: nombreCliente,
                    tipo: "Pedido inicial",
                    mesa: mesa,
                    usuario: idUsuario,
                    estado: "true",
                    detalles: observaciones,
                    tipoPago: tipoPago,
                    tipoPedido: tipoPedido,
                    hacerPedido: hacerPedido,
                    efectivo: dineroIngresado,
                    pagado: hacerPedido == "por WhatsApp" || hacerPedido == "por llamada" ? "false" : tipoPedido == "para comer aquí" ? "false" : "true",
                    cambio: parseFloat(dineroIngresado) - (parseFloat(total) + (parseFloat(total) * parseFloat(iva)) + (parseFloat(total) * parseFloat(comision))) ? parseFloat(dineroIngresado) - (parseFloat(total) + (parseFloat(total) * parseFloat(iva)) + (parseFloat(total) * parseFloat(comision))) : "0",
                    productos: products,
                    tipoDescuento: tipoDescuento,
                    descuento: parseFloat(porcentajeDescontado) > 0 ? (parseFloat(total) - (parseFloat(total) * (parseFloat(porcentajeDescontado)))) : parseFloat(dineroDescontado) > 0 ? parseFloat(total) - parseFloat(dineroDescontado) : total,
                    iva: parseFloat(total) * parseFloat(iva),
                    comision: parseFloat(total) * parseFloat(comision),
                    subtotal: total,
                    atendido: "false",
                    total: parseFloat(total) + (parseFloat(total) * parseFloat(iva)) + (parseFloat(total) * parseFloat(comision)),
                    agrupar: grupo,
                    año: añoVenta,
                    semana: weekNumber,
                    createdAt: fechayHoraSinFormato
                }

                registraVentas(dataTemp).then(response => {
                    const { data } = response;
                    setDeterminaBusquedaTiquet(true)
                    LogsInformativos("Se ha registrado la venta " + numeroTiquet, data.datos);
                    handlePrint();
                    toast.success(data.mensaje)

                    handleEmptyTicket()
                })
            } catch (e) {
                console.log(e)
            }
        }
    }

    const handleDeleteProduct = (item) => {
        remove(item);
    }

    // Para almacenar el nombre del cliente
    const [tipoDescuento, setTipoDescuento] = useState("");
    // Para almacenar el nombre del cliente
    const [dineroDescontado, setDineroDescontado] = useState("0");
    // Para almacenar el nombre del cliente
    const [porcentajeDescontado, setPorcentajeDescontado] = useState("0");
    // Para almacenar el nombre del cliente
    const [nombreCliente, setNombreCliente] = useState("");
    // Para almacenar el numero de mesa
    const [mesa, setMesa] = useState("");
    // Para alamcenar el dinero ingresado
    const [dineroIngresado, setDineroIngresado] = useState("");
    // Para almacenar el tipo de pago
    const [tipoPago, setTipoPago] = useState("");
    // Para almacenar el tipo de pedido
    const [tipoPedido, setTipoPedido] = useState("");
    // Para almacenar la forma en la que se hizo el pedido
    const [hacerPedido, setHacerPedido] = useState("");
    // Para almacenar las observaciones
    const [observaciones, setObservaciones] = useState("");
    // Para el modal de las observaciones
    const datosExtraVenta = (content) => {
        setTitulosModal("Datos extra de la venta");
        setContentModal(content);
        setShowModal(true);
    }
    //Para el modal de descuentos
    const descuento = (content) => {
        setTitulosModal("Descuento");
        setContentModal(content);
        setShowModal(true);
    }
    const [fechayHora, setFechayHora] = useState("");
    const [fechayHoraSinFormato, setFechayHoraSinFormato] = useState("");

    useEffect(() => {
        const hoy = new Date();
        const hora = (hoy.getHours() - 1) + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();
        // const fecha = hoy.getDate() + '-' + ( hoy.getMonth() + 1 ) + '-' + hoy.getFullYear() + " " + hora;
        const fecha = hoy.getFullYear() + '-' + (hoy.getMonth() + 1) + '-' + hoy.getDate() + "T" + hora;

        const hora2 = ((hoy.getHours()-6) < 10 ? "0" + (hoy.getHours()-6) : (hoy.getHours()-6)) + ':' + ((hoy.getMinutes()) < 10 ? "0" + (hoy.getMinutes()) : (hoy.getMinutes()));
        // const fecha = hoy.getDate() + '-' + ( hoy.getMonth() + 1 ) + '-' + hoy.getFullYear() + " " + hora;
        const fecha2 = hoy.getFullYear() + '-' + (hoy.getMonth() + 1) + '-' + hoy.getDate() + "T" + hora2;
        // console.log(fecha)
        // console.log("Fecha actual ", hoy)
        setFechayHora(dayjs(fecha).format('dddd, LL hh:mm A'));
        setFechayHoraSinFormato(fecha2);
    }, []);

    const [totalFinal, setTotalFinal] = useState(0);

    useEffect(() => {
        setTotalFinal(parseFloat(porcentajeDescontado) > 0 ? (parseFloat(total) - (parseFloat(total) * (parseFloat(porcentajeDescontado)))) : parseFloat(dineroDescontado) > 0 ? parseFloat(total) - parseFloat(dineroDescontado) : total)
    }, [total, porcentajeDescontado, dineroDescontado]);

    const Encabezado = ({ logo, logoRappi, numeroTiquet, mesa, nombreCliente, tipoPedido, hacerPedido, fechayHora }) => {
        return (
            <div className="cafe">
                {/**/}
                <div id="logoFinal" className="logotipo">
                    <Image src={logo} alt="logo" />
                </div>
                {/**/}
                <div className="detallesTitulo">
                    <p className="cafe__number">Teléfono para pedidos</p>
                    <p className="cafe__number">442-714-09-79</p>
                    <p className="cafe__number">Ticket #{numeroTiquet}</p>
                    <p className="cafe__number">Cliente {nombreCliente}</p>
                    {
                        tipoPedido !== "para llevar" &&
                        (
                            <>
                                <p className="invoice__cliente">Mesa {mesa}</p>
                            </>
                        )
                    }
                    <p className="invoice__cliente">Pedido {tipoPedido}</p>
                    <p className="invoice__cliente">Hecho {hacerPedido}</p>
                    <p className="cafe__number">
                        {fechayHora}
                    </p>
                </div>
            </div>
        )
    }

    const Cuerpo = ({ products, onClick }) => {
        return (
            <div className="ticket__table">
                <Table>
                    <thead>
                        <tr>
                            <th className="items__numeracion">#</th>
                            <th className="items__description">Descripción</th>
                            <th className="items__qty">Cantidad</th>
                            <th className="items__price">Precio</th>
                            <th className="remove-icono">Eliminar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products?.map((item, index) => (
                            <tr key={index}>
                                <td>{index + 1}.- </td>
                                <td className="items__description">{item.nombre}</td>
                                <td>1</td>
                                <td>
                                    ${''}
                                    {new Intl.NumberFormat('es-MX', {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2,
                                    }).format(item.precio)} MXN
                                </td>
                                <td title="Quitar producto" onClick={() => onClick(item)} className="remove-icon">❌</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        )
    }

    const Pie = ({ observaciones, tipoPago, total, IVA, dineroIngresado }) => {
        return (
            <div className="subtotal">
                <hr />
                <Row>
                    <Col>
                        <p className="observaciones__tiquet">
                            {observaciones}
                        </p>
                    </Col>
                    <Col>
                        <div className="subtotal__cambio">
                            Pago realizado con {tipoPago}
                        </div>

                        <div className="subtotal__cambio">
                            Descuento {parseFloat(porcentajeDescontado) > 0 ? parseFloat(porcentajeDescontado) * 100 + "%" : parseFloat(dineroDescontado) > 0 ? "$" + parseFloat(dineroDescontado) : "0"}
                        </div>

                        <div className="subtotal__IVA">

                        </div>

                        <div className="subtotal__price">
                            Subtotal ${''}
                            {new Intl.NumberFormat('es-MX', {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                            }).format(parseFloat(porcentajeDescontado) > 0 ? (parseFloat(total) - (parseFloat(total) * (parseFloat(porcentajeDescontado)))) : parseFloat(dineroDescontado) > 0 ? parseFloat(total) - parseFloat(dineroDescontado) : total)} MXN
                        </div>


                        {
                            tipoPago === "Efectivo" && IVA === "0.16" &&
                            (
                                <>
                                    <div className="subtotal__IVA">
                                        IVA ${''}
                                        {new Intl.NumberFormat('es-MX', {
                                            minimumFractionDigits: 2,
                                            maximumFractionDigits: 2,
                                        }).format(parseFloat(total) * parseFloat(IVA) ? parseFloat(total) * parseFloat(IVA) : "0")} MXN
                                    </div>

                                    <div className="subtotal__total">
                                        Total ${''}
                                        {new Intl.NumberFormat('es-MX', {
                                            minimumFractionDigits: 2,
                                            maximumFractionDigits: 2,
                                        }).format(parseFloat(total) + parseFloat(total) * parseFloat(IVA) ? parseFloat(total) + parseFloat(total) * parseFloat(IVA) : "0")} MXN
                                    </div>
                                </>
                            )
                        }

                        {
                            tipoPago === "Efectivo" && IVA === "0" &&
                            (
                                <>
                                    <div className="subtotal__total">
                                        Total ${''}
                                        {new Intl.NumberFormat('es-MX', {
                                            minimumFractionDigits: 2,
                                            maximumFractionDigits: 2,
                                        }).format(parseFloat(total) ? parseFloat(total) : "0")} MXN
                                    </div>
                                </>
                            )
                        }

                        {
                            tipoPago === "Tarjeta" && IVA === "0.16" &&
                            (
                                <>
                                    <div className="subtotal__IVA">
                                        IVA ${''}
                                        {new Intl.NumberFormat('es-MX', {
                                            minimumFractionDigits: 2,
                                            maximumFractionDigits: 2,
                                        }).format(parseFloat(total) * parseFloat(IVA) ? parseFloat(total) * parseFloat(IVA) : "0")} MXN
                                    </div>

                                    <div className="subtotal__total">
                                        Total ${''}
                                        {new Intl.NumberFormat('es-MX', {
                                            minimumFractionDigits: 2,
                                            maximumFractionDigits: 2,
                                        }).format((parseFloat(total)) + (parseFloat(total) * parseFloat(IVA)) ? (parseFloat(total)) + (parseFloat(total) * parseFloat(IVA)) : "0")} MXN
                                    </div>
                                </>
                            )
                        }

                        {
                            tipoPago === "Tarjeta" && IVA === "0" &&
                            (
                                <>

                                    <div className="subtotal__total">

                                        Total ${''}
                                        {new Intl.NumberFormat('es-MX', {
                                            minimumFractionDigits: 2,
                                            maximumFractionDigits: 2,
                                        }).format(parseFloat(total) ? parseFloat(total) : "0")} MXN
                                    </div>
                                </>
                            )
                        }

                        {
                            tipoPago === "Transferencia" && IVA === "0.16" &&
                            (
                                <>
                                    <div className="subtotal__total">
                                        IVA ${''}
                                        {new Intl.NumberFormat('es-MX', {
                                            minimumFractionDigits: 2,
                                            maximumFractionDigits: 2,
                                        }).format(parseFloat(total) * parseFloat(IVA) ? parseFloat(total) * parseFloat(IVA) : "0")} MXN
                                    </div>
                                    <div className="subtotal__total">
                                        Total ${''}
                                        {new Intl.NumberFormat('es-MX', {
                                            minimumFractionDigits: 2,
                                            maximumFractionDigits: 2,
                                        }).format(parseFloat(total) + parseFloat(total) * parseFloat(IVA) ? parseFloat(total) + parseFloat(total) * parseFloat(IVA) : "0")} MXN
                                    </div>
                                </>
                            )
                        }

                        {
                            tipoPago === "Transferencia" && IVA === "0" &&
                            (
                                <>
                                    <div className="subtotal__total">
                                        Total ${''}
                                        {new Intl.NumberFormat('es-MX', {
                                            minimumFractionDigits: 2,
                                            maximumFractionDigits: 2,
                                        }).format(parseFloat(total) ? parseFloat(total) : "0")} MXN
                                    </div>
                                </>
                            )
                        }

                        {
                            tipoPago === "Efectivo" &&
                            (
                                <>
                                    <div className="subtotal__cambio">
                                        Efectivo ${''}
                                        {new Intl.NumberFormat('es-MX', {
                                            minimumFractionDigits: 2,
                                            maximumFractionDigits: 2,
                                        }).format(parseFloat(dineroIngresado) ? parseFloat(dineroIngresado) : "0")} MXN

                                    </div>
                                    <div className="subtotal__cambio">
                                        Cambio ${''}
                                        {new Intl.NumberFormat('es-MX', {
                                            minimumFractionDigits: 2,
                                            maximumFractionDigits: 2,
                                        }).format(parseFloat(dineroIngresado) - (parseFloat(total) + parseFloat(total) * parseFloat(IVA)) ? parseFloat(dineroIngresado) - (parseFloat(total) + parseFloat(total) * parseFloat(IVA)) : "0")} MXN
                                    </div>
                                </>
                            )
                        }
                    </Col>
                </Row>
                <hr />
            </div>
        )
    }

    const Opciones = ({ icon }) => {
        return (
            <div className="ticket__actions">
                <button title="Registrar venta" onClick={() => handleRegistraVenta()}>✅</button>

                <button title="Limpiar el ticket" onClick={() => handleEmptyTicket()}>🗑️</button>

                <button title="Aplicar IVA" onClick={() => handleIVAApply()}>🧾</button>

                <button title="Cancelar IVA" onClick={() => handleIVACancel()}>🚫️</button>

                <button
                    title="Añadir detalles de la venta"
                    onClick={() =>
                        descuento(
                            <Descuento
                                tipoDescuento={tipoDescuento}
                                setTipoDescuento={setTipoDescuento}
                                dineroDescontado={dineroDescontado}
                                setDineroDescontado={setDineroDescontado}
                                porcentajeDescontado={porcentajeDescontado}
                                setPorcentajeDescontado={setPorcentajeDescontado}

                                setShowModal={setShowModal}
                            />
                        )
                    }>
                    📉
                </button>

                <button
                    title="Añadir detalles de la venta"
                    onClick={() =>
                        datosExtraVenta(
                            <DatosExtraVenta
                                setTipoPago={setTipoPago}
                                setDineroIngresado={setDineroIngresado}
                                setTipoPedido={setTipoPedido}
                                setHacerPedido={setHacerPedido}
                                setNombreCliente={setNombreCliente}
                                setObservaciones={setObservaciones}
                                setMesa={setMesa}

                                tipoPago={tipoPago}
                                dineroIngresado={dineroIngresado}
                                tipoPedido={tipoPedido}
                                hacerPedido={hacerPedido}
                                nombreCliente={nombreCliente}
                                observaciones={observaciones}
                                mesa={mesa}

                                setShowModal={setShowModal}
                            />
                        )
                    }>
                    <FontAwesomeIcon icon={icon} />
                </button>

                {/*<Button href="whatsapp://send?text=Hola Mundo&phone=+524531527363">Enviar mensaje</Button>*/}

            </div >
        )
    }

    return (
        <>
            <div id="ticketGenerado" className="ticket">
                <div className="ticket__information">
                    {/**/}
                    <Encabezado
                        logo={logoTiquetGris}
                        numeroTiquet={numeroTiquet}
                        nombreCliente={nombreCliente}
                        mesa={mesa}
                        tipoPedido={tipoPedido}
                        hacerPedido={hacerPedido}
                        fechayHora={fechayHora}
                    />

                    {/**/}
                    <Cuerpo
                        products={products}
                        onClick={handleDeleteProduct}
                    />

                    {/**/}
                    <Pie
                        observaciones={observaciones}
                        tipoPago={tipoPago}
                        total={totalFinal}
                        IVA={IVA}
                        dineroIngresado={dineroIngresado}
                    />
                </div>
                <Opciones
                    icon={faCircleInfo}
                />
            </div>

            <BasicModal show={showModal} setShow={setShowModal} title={titulosModal}>
                {contentModal}
            </BasicModal>
        </>
    );
}

export default Tiquet;
