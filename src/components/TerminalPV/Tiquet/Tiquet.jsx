import { useState, useEffect } from 'react';
import "../../../scss/styles.scss";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons'
import BasicModal from "../../Modal/BasicModal";
import { obtenUltimoNoTiquet, registraVentas } from "../../../api/ventas";
import { Col, Button, Row } from "react-bootstrap";
import DatosExtraVenta from "../../Ventas/DatosExtraVenta";
import { logoTiquetGris } from "../../../assets/base64/logo-tiquet";
import 'dayjs/locale/es';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';

function Tiquet(props) {
    const { products, empty, remove } = props;

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
            tiquetGenerado.document.write('<style>.tabla{width:100%;border-collapse:collapse;margin:16px 0 16px 0;}.tabla th{border:1px solid #ddd;padding:4px;background-color:#d4eefd;text-align:left;font-size:30px;}.tabla td{border:1px solid #ddd;text-align:left;padding:6px;} p {margin-top: -10px !important;} .cafe__number {margin-top: -10px !important;} .logotipo {width: 91px !important; margin: 0 auto;} img {width: 91px !important; margin: 0 auto;} .detallesTitulo {margin-top: 10px !important;} .ticket__actions {display: none !important;} .remove-icon {display: none !important;} .remove-icono {display: none !important;} .items__price {color: #000000 !important;} </style>');
            tiquetGenerado.document.write('</head><body>');
            tiquetGenerado.document.write(document.getElementById('ticketGenerado').innerHTML);
            tiquetGenerado.document.write('</body></html>');

            tiquetGenerado.document.close();
            tiquetGenerado.focus();
            tiquetGenerado.print();
            tiquetGenerado.close();
        }
    }

    const handlePrintDouble = () => {
        if (products.length === 0) {
            toast.warning("Debe cargar articulos a la venta")
        } else {
            const tiquetGenerado = window.open('Tiquet', 'PRINT', 'height=800,width=1200');
            tiquetGenerado.document.write('<html><head>');
            tiquetGenerado.document.write('<style>.tabla{width:100%;border-collapse:collapse;margin:16px 0 16px 0;}.tabla th{border:1px solid #ddd;padding:4px;background-color:#d4eefd;text-align:left;font-size:30px;}.tabla td{border:1px solid #ddd;text-align:left;padding:6px;} p {margin-top: -10px !important;} .cafe__number {margin-top: -10px !important;} .logotipo {width: 91px !important; margin: 0 auto;} img {width: 91px !important; margin: 0 auto;} .detallesTitulo {margin-top: 10px !important;} .ticket__actions {display: none !important;} .remove-icon {display: none !important;} .remove-icono {display: none !important;} .items__price {color: #000000 !important;} </style>');
            tiquetGenerado.document.write('</head><body>');
            tiquetGenerado.document.write(document.getElementById('ticketGenerado').innerHTML);
            tiquetGenerado.document.write('</body></html>');

            tiquetGenerado.document.write('<html><head>');
            tiquetGenerado.document.write('<style>.tabla{width:100%;border-collapse:collapse;margin:16px 0 16px 0;}.tabla th{border:1px solid #ddd;padding:4px;background-color:#d4eefd;text-align:left;font-size:30px;}.tabla td{border:1px solid #ddd;text-align:left;padding:6px;} p {margin-top: -10px !important;} .cafe__number {margin-top: -10px !important;} .logotipo {width: 91px !important; margin: 0 auto;} img {width: 91px !important; margin: 0 auto;} .detallesTitulo {margin-top: 10px !important;} .ticket__actions {display: none !important;} .remove-icon {display: none !important;} .remove-icono {display: none !important;} .items__price {color: #000000 !important;} </style>');
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

        if (tipoPago === "Tarjeta") {
            comision = "0.03"
        }

        if (products.length === 0) {
            toast.warning("Debe cargar articulos a la venta")
        } else {
            const hoy = new Date();
            const grupo = (hoy.getMonth() + 1);
            try {
                const dataTemp = {
                    numeroTiquet: numeroTiquet,
                    cliente: nombreCliente,
                    estado: "true",
                    detalles: observaciones,
                    tipoPago: tipoPago,
                    tipoPedido: tipoPedido,
                    hacerPedido: hacerPedido,
                    efectivo: dineroIngresado,
                    cambio: parseFloat(dineroIngresado) - (parseFloat(total) + (parseFloat(total) * parseFloat(iva)) + (parseFloat(total) * parseFloat(comision))) ? parseFloat(dineroIngresado) - (parseFloat(total) + (parseFloat(total) * parseFloat(iva)) + (parseFloat(total) * parseFloat(comision))) : "0",
                    productos: products,
                    iva: parseFloat(total) * parseFloat(iva),
                    comision: parseFloat(total) * parseFloat(comision),
                    subtotal: total,
                    total: parseFloat(total) + (parseFloat(total) * parseFloat(iva)) + (parseFloat(total) * parseFloat(comision)),
                    agrupar: grupo
                }

                registraVentas(dataTemp).then(response => {
                    const { data } = response;
                    setDeterminaBusquedaTiquet(true)
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
    const [nombreCliente, setNombreCliente] = useState("");
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
    const [fechayHora, setFechayHora] = useState("");

    useEffect(() => {
        const hoy = new Date();
        const hora = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();
        // const fecha = hoy.getDate() + '-' + ( hoy.getMonth() + 1 ) + '-' + hoy.getFullYear() + " " + hora;
        const fecha = hoy.getFullYear() + '-' + (hoy.getMonth() + 1) + '-' + hoy.getDate() + " " + hora;
        // console.log(fecha)
        // console.log("Fecha actual ", hoy)
        setFechayHora(dayjs(fecha).format('dddd, LL hh:mm A'))
    }, []);

    return (
        <>
            <div id="ticketGenerado" className="ticket">
                <div className="ticket__information">
                    {/**/}
                    <div className="cafe">
                        {/**/}
                        <div id="logoFinal" className="logotipo">
                            <img src={logoTiquetGris} alt="logo" />
                        </div>
                        {/**/}
                        <div className="detallesTitulo">
                            <p className="cafe__number">Teléfono para pedidos</p>
                            <p className="cafe__number">442-714-09-79</p>
                            <p className="cafe__number">Ticket #{numeroTiquet}</p>
                            <p className="invoice__cliente">Cliente {nombreCliente}</p>
                            <p className="invoice__cliente">Pedido {tipoPedido}</p>
                            <p className="invoice__cliente">Hecho {hacerPedido}</p>
                            <p className="cafe__number">
                                {fechayHora}
                            </p>
                        </div>
                    </div>
                    {/**/}
                    <div className="ticket__table">
                        <table>
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
                                        <td title="Quitar producto" onClick={() => handleDeleteProduct(item)} className="remove-icon">❌</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/**/}
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

                                <div className="subtotal__IVA">

                                </div>

                                <div className="subtotal__price">
                                    Subtotal ${''}
                                    {new Intl.NumberFormat('es-MX', {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2,
                                    }).format(total)} MXN
                                </div>

                                {
                                    tipoPago === "Tarjeta" &&
                                    (
                                        <>
                                            <div className="subtotal__cambio">
                                                Comisión ${''}
                                                {new Intl.NumberFormat('es-MX', {
                                                    minimumFractionDigits: 2,
                                                    maximumFractionDigits: 2,
                                                }).format(parseFloat(total) * parseFloat("0.03") ? parseFloat(total) * parseFloat("0.03") : "0")} MXN
                                            </div>
                                        </>
                                    )
                                }


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
                                                }).format((parseFloat(total) + parseFloat(total) * parseFloat("0.03")) + (parseFloat(total) * parseFloat(IVA)) ? (parseFloat(total) + parseFloat(total) * parseFloat("0.03")) + (parseFloat(total) * parseFloat(IVA)) : "0")} MXN
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
                                                }).format(parseFloat(total) + parseFloat(total) * parseFloat("0.03") ? parseFloat(total) + parseFloat(total) * parseFloat("0.03") : "0")} MXN
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
                    {/**/}
                </div>
                <div className="ticket__actions">
                    <Button title="Registrar venta" onClick={() => handleRegistraVenta()}>✅</Button>

                    <Button title="Imprimir ticket único" onClick={() => handlePrint()}>📄</Button>

                    <Button title="Imprimir doble ticket" onClick={() => handlePrintDouble()}> 2️⃣</Button>

                    <Button title="Limpiar el ticket" onClick={() => handleEmptyTicket()}>🗑️</Button>

                    <Button title="Aplicar IVA" onClick={() => handleIVAApply()}>🧾</Button>

                    <Button title="Cancelar IVA" onClick={() => handleIVACancel()}>🚫️</Button>

                    <Button
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
                                    setShowModal={setShowModal}
                                />
                            )
                        }>
                        <FontAwesomeIcon icon={faCircleInfo} />
                    </Button>
                </div>
            </div>

            <BasicModal show={showModal} setShow={setShowModal} title={titulosModal}>
                {contentModal}
            </BasicModal>
        </>
    );
}

export default Tiquet;
