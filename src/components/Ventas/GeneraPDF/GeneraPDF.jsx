import {Col, Row} from "react-bootstrap";
import "./GeneraPDF.scss";
import { logoTiquetGris } from "../../../assets/base64/logo-tiquet";
import {toast} from "react-toastify";

function GeneraPdf(props) {
    const { datos, datosProducto, fecha } = props;

    const { numeroTiquet, cliente, detalles, tipoPago, efectivo, cambio, subtotal, tipoPedido, hacerPedido, total, iva, comision } = datos;

    const handlePrint = () => {
        toast.info("Generando... espere por favor")
        // Primer renderizado del tiquet -- sin el logo del cliente
        const tiquetGenerado = window.open('Tiquet', 'PRINT', 'height=400,width=600');
        tiquetGenerado.document.write('<html><head>');
        tiquetGenerado.document.write('<style>.tabla{width:100%;border-collapse:collapse;margin:16px 0 16px 0;}.tabla th{border:1px solid #ddd;padding:4px;background-color:#d4eefd;text-align:left;font-size:15px;}.tabla td{border:1px solid #ddd;text-align:left;padding:6px;} p {margin-top: -10px !important;} .cafe__number {margin-top: -10px !important;} .logotipo {width: 91px !important; margin: 0 auto;} img {width: 91px !important; margin: 0 auto;} .detallesTitulo {margin-top: 10px !important;} </style>');
        tiquetGenerado.document.write('</head><body>');
        //tiquetGenerado.document.write(document.getElementById("1").setAttribute("src", LogoTiquet));
        // tiquetGenerado.document.write(ImagetoPrint(LogoTiquet));
        tiquetGenerado.document.write(document.getElementById('tiquetAutogenerado').innerHTML);
        tiquetGenerado.document.write('</body></html>');
        tiquetGenerado.document.close();
        tiquetGenerado.focus();
        //tiquetGenerado.print();
        tiquetGenerado.close();

        const timer = setTimeout(() => {
            const tiquetGenerado2 = window.open('Tiquet', 'PRINT', 'height=400,width=600');
            tiquetGenerado2.document.write('<html><head>');
            tiquetGenerado2.document.write('<style>.tabla{width:100%;border-collapse:collapse;margin:16px 0 16px 0;}.tabla th{border:1px solid #ddd;padding:4px;background-color:#d4eefd;text-align:left;font-size:15px;}.tabla td{border:1px solid #ddd;text-align:left;padding:6px;} p {margin-top: -10px !important;} .cafe__number {margin-top: -10px !important;} .logotipo {width: 91px !important; margin: 0 auto;} img {width: 91px !important; margin: 0 auto;} .detallesTitulo {margin-top: 10px !important;} </style>');
            tiquetGenerado2.document.write('</head><body>');
            tiquetGenerado2.document.write(document.getElementById('tiquetAutogenerado').innerHTML);
            tiquetGenerado2.document.write('</body></html>');
            tiquetGenerado2.document.close();
            tiquetGenerado2.focus();
            tiquetGenerado2.print();
            tiquetGenerado2.close();
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
                            <img src={logoTiquetGris} alt="logo"/>
                        </div>
                        {/**/}
                        <div className="detallesTitulo">
                            <p className="cafe__number">Teléfono para pedidos</p>
                            <p className="cafe__number">442-714-09-79</p>
                            <p className="cafe__number">Ticket #{numeroTiquet}</p>
                            <p className="invoice__cliente">Cliente {cliente}</p>
                            <p className="invoice__cliente">Pedido {tipoPedido}</p>
                            <p className="invoice__cliente">Hecho {hacerPedido}</p>
                            <p className="cafe__number">
                                {fecha}
                            </p>
                        </div>
                    </div>
                    <div className="ticket__table">
                        <table>
                            <thead>
                            <tr>
                                <th className="items__numeracion">#</th>
                                <th className="items__description">Descripcion</th>
                                <th className="items__qty">Cantidad</th>
                                <th className="items__price">Precio</th>
                            </tr>
                            </thead>
                            <tbody>
                            {datosProducto?.map((item, index) => (
                                <tr key={index}>
                                    <td>{ index + 1 }.- </td>
                                    <td className="items__description">{item.nombre}</td>
                                    <td>1</td>
                                    <td>
                                    ${''}
                                    {new Intl.NumberFormat('es-MX', {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2,
                                    }).format(item.precio)} MXN
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="subtotal">
                        <hr/>
                        <Row>
                            <Col>
                                <p className="observaciones__tiquet">
                                    {detalles}
                                </p>
                            </Col>
                            <Col>
                                <div className="subtotal__cambio">
                                    Pago realizado con {tipoPago}
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
                                                    }).format(comision)} MXN
                                                </div>
                                            </>
                                        )
                                }
                                {
                                    iva != "0" &&
                                        (
                                            <>
                                <div className="subtotal__price">
                                    IVA ${''}
                                    {new Intl.NumberFormat('es-MX', {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2,
                                    }).format(iva)} MXN
                                </div>
                                </>
                                        )
                                }
                                <div className="subtotal__price">
                                    Subtotal ${''}
                                    {new Intl.NumberFormat('es-MX', {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2,
                                    }).format(subtotal)} MXN
                                </div>
                                <div className="subtotal__price">
                                    Total ${''}
                                    {new Intl.NumberFormat('es-MX', {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2,
                                    }).format(total)} MXN
                                </div>
                                {
                                    tipoPago === "Efectivo" &&
                                        (
                                            <>
                                                <div className="subtotal__cambio">
                                                    Efectivo ${''}
                                                    {new Intl.NumberFormat('es-MX', {
                                                    minimumFractionDigits: 2,
                                                    maximumFractionDigits: 2,
                                                    }).format(efectivo)} MXN
                                                </div>
                                                <div className="subtotal__cambio">
                                                    Cambio ${''}
                                                    {new Intl.NumberFormat('es-MX', {
                                                    minimumFractionDigits: 2,
                                                    maximumFractionDigits: 2,
                                                    }).format(cambio)} MXN
                                                </div>
                                            </>
                                        )
                                }
                            </Col>
                        </Row>
                        <hr/>
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

export default GeneraPdf;
