import { useState, useEffect } from 'react';
import "../../../scss/styles.scss";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons'
import BasicModal from "../../Modal/BasicModal";
import { obtenUltimoNoTiquet, registraVentas, obtenerVentas } from "../../../api/ventas";
import { Col, Button, Row, Image, Table } from "react-bootstrap";
import DatosExtraVenta from "../../Ventas/DatosExtraVenta";
import { logoTiquetGris } from "../../../assets/base64/logo-tiquet";

import dayjs from 'dayjs';
import 'dayjs/locale/es';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

import { LogsInformativos } from "../../Logs/LogsSistema/LogsSistema";
import { useParams, useNavigate } from "react-router-dom";

function Tiquet(props) {
    const { idUsuario, products, empty, remove } = props;

    const parametros = useParams();
    const { id } = parametros;

    const enrutamiento = useNavigate();

    const rutaRegreso = () => {
        enrutamiento("/Historiales")
    }

    console.log(id);

dayjs.extend(utc);
dayjs.extend(timezone);
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

    //se agrega esta constante para la formula y que no se generen repetidos
    const MAX_INTENTOS_GENERACION = 100;

    //esta funcion verifica el numero anterior para establecer un numero y que no se repita el numero de ticket
    const verificaExistenciaNumeroTiquet = async (numeroTiquet) => {
        try {
            // Obtener el número del último tiquet desde el archivo ventas.js
            const response = await obtenUltimoNoTiquet();
            const ultimoNumeroTiquet = parseInt(response.data.noTiquet);
    
            // Verificar si el número generado ya existe
            let intentos = 0;
            while (intentos < MAX_INTENTOS_GENERACION) {
                if (ultimoNumeroTiquet === parseInt(numeroTiquet)) {
                    // Incrementar el número del tiquet y seguir verificando
                    numeroTiquet++;
                    intentos++;
                } else {
                    // El número generado es único
                    return false;
                }
            }
    
            // Si llegamos a este punto, se ha intentado generar un número único varias veces sin éxito
            console.error("No se pudo generar un número de tiquet único después de varios intentos");
            return true; // Puedes manejar esto según tus necesidades
        } catch (error) {
            console.error("Error al verificar la existencia del número de tiquet:", error);
            // Puedes manejar este error según tus necesidades
            throw error; // Puedes elegir lanzar el error nuevamente o manejarlo de otra manera
        }
    };

    //se modifico para que la funcion siga hasta encontrar un numero que no este registrado
    useEffect(() => {
        setDeterminaBusquedaTiquet(false);
    
        const obtenerNumeroTiquet = async () => {
            try {
                const response = await obtenUltimoNoTiquet();
                const { data } = response;
    
                let nuevoNumeroTiquet;
                
                if (data.noTiquet === "0") {
                    nuevoNumeroTiquet = 1;
                } else {
                    // Incrementar el número hasta encontrar uno único
                    let intentos = 0;
                    do {
                        intentos++;
                        nuevoNumeroTiquet = parseInt(data.noTiquet) + intentos;
                        const existe = await verificaExistenciaNumeroTiquet(nuevoNumeroTiquet);
                        if (!existe) {
                            break; // Salir del bucle si el número es único
                        }
                    } while (intentos < MAX_INTENTOS_GENERACION);
    
                    if (intentos === MAX_INTENTOS_GENERACION) {
                        console.error("No se pudo generar un número de ticket único después de varios intentos.");
                        // Puedes manejar esta situación según tus necesidades
                    }
                }
    
                setNumeroTiquet(nuevoNumeroTiquet);
            } catch (error) {
                console.error("Error al obtener el último número de ticket:", error);
                setNumeroTiquet("1"); // Establecer a 1 en caso de error
            }
        };
    
        obtenerNumeroTiquet();
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
            const formattedDate = dayjs(fechayHoraSinFormato).tz('America/Mexico_City').format('YYYY-MM-DDTHH:mm:ss.SSS');

            try {
                const dataTemp = {
                    numeroTiquet: numeroTiquet,
                    mesa: mesa,
                    tipo: "Productos adicionales",
                    cliente: nombreCliente,
                    usuario: idUsuario,
                    tiquetVenta: numeroTiquetAsociado,
                    estado: "true",
                    detalles: observaciones,
                    tipoPago: tipoPago,
                    tipoPedido: tipoPedido,
                    hacerPedido: hacerPedido,
                    efectivo: dineroIngresado,
                    pagado: hacerPedido == "por WhatsApp" || hacerPedido == "por llamada" ? "false" : tipoPedido == "para comer aquí" ? "false" : "true",
                    cambio: parseFloat(dineroIngresado) - (parseFloat(total) + (parseFloat(total) * parseFloat(iva)) + (parseFloat(total) * parseFloat(comision))) ? parseFloat(dineroIngresado) - (parseFloat(total) + (parseFloat(total) * parseFloat(iva)) + (parseFloat(total) * parseFloat(comision))) : "0",
                    productos: products,
                    iva: parseFloat(total) * parseFloat(iva),
                    comision: parseFloat(total) * parseFloat(comision),
                    subtotal: total,
                    total: parseFloat(total) + (parseFloat(total) * parseFloat(iva)) + (parseFloat(total) * parseFloat(comision)),
                    agrupar: grupo,
                    año: añoVenta,
                    semana: weekNumber,
                    createdAt: formattedDate
                }

                registraVentas(dataTemp).then(response => {
                    const { data } = response;
                    setDeterminaBusquedaTiquet(true)
                    LogsInformativos("Se ha registrado la venta " + numeroTiquet, data.datos);
                    toast.success(data.mensaje)
                    handlePrint();
                    rutaRegreso();
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


    const [numeroTiquetAsociado, setNumeroTiquetAsociado] = useState("");
    // Para almacenar el nombre de mesa
    const [mesa, setMesa] = useState("");
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

    const cargarDatos = () => {
        try {
            obtenerVentas(id).then(response => {
                const { data } = response;
                // console.log(data)
                setNombreCliente(data.cliente);
                setMesa(data.mesa);
                setNumeroTiquetAsociado(data.numeroTiquet);
                setDineroIngresado(data.subtotal);
                setTipoPago(data.tipoPago);
                setTipoPedido(data.tipoPedido);
                setHacerPedido(data.hacerPedido);
                setObservaciones(data.detalles);
            }).catch(e => {
                console.log(e)
            })
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        cargarDatos();
    }, []);

    // Para el modal de las observaciones
    const datosExtraVenta = (content) => {
        setTitulosModal("Datos extra de la venta");
        setContentModal(content);
        setShowModal(true);
    }
    const [fechayHora, setFechayHora] = useState("");
    const [fechayHoraSinFormato, setFechayHoraSinFormato] = useState("");

    useEffect(() => {
        const hoy = new Date();
        const adjustedDate = dayjs(hoy).utc().utcOffset(-360).format(); // Ajusta la hora a CST (UTC -6)

        setFechayHora(dayjs(adjustedDate).locale('es').format('dddd, LL hh:mm A'));
        setFechayHoraSinFormato(adjustedDate);
    }, []);

    const Encabezado = ({ logo, mesa, numeroTiquet, nombreCliente, tipoPedido, hacerPedido, fechayHora }) => {
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
                        tipoPago !== "para llevar" &&
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

            </div>
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
                        mesa={mesa}
                        nombreCliente={nombreCliente}
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
                        total={total}
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
