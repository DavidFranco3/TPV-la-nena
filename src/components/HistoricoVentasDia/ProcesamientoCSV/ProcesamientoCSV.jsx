import { useState, useEffect } from 'react';
import { toast } from "react-toastify";
import { listarDetallesProductosVentasPorDia, listarVentasPorDia } from "../../../api/ventas";
import { Badge, Image } from "react-bootstrap";
import LogoExcel from "../../../assets/png/excel.png";
import { exportCSVFile } from "../../../utils/exportCSV";
import "../../../scss/styles.scss";

function ProcesamientoCsv(props) {
    const { dia } = props;

    const [listDetallesDia, setListDetallesDia] = useState(null);

    // Para almacenar los totales de la ventas del dia
    const [totales, setTotales] = useState(null);

    // Para almacenar los totales de la ventas del dia
    const [titulos, setTitulos] = useState(null);

    const headers = {
        numeroTiquet: "Número de Tiquet",
        estado: "Estado de la venta",
        cliente: "Cliente",
        nombre: "Nombre del producto",
        precio: "Precio",
        tipoPago: "Tipo de pago",
        totalVenta: "Total de venta en el tiquet"
    };

    useEffect(() => {
        try {
            // Inicia listado de detalles de los articulos vendidos
            listarDetallesProductosVentasPorDia(dia).then(response => {
                const { data } = response;
                // console.log(data)
                setListDetallesDia(data)
            }).catch(e => {
                console.log(e)
            })
            // Termina listado de detalles de los artículos vendidos

            listarVentasPorDia(dia).then(response => {
                const { data } = response;
                const { efectivo, tarjeta, transferencia, tortasVendidas, bebidasVendidas, extrasVendidos, sandwichesVendidos, desayunosVendidos, enviosVendidos } = data;
                //console.log(data)
                const dataTitulos = [{
                    efectivo: "Total efectivo",
                    tarjeta: "Total tarjeta",
                    transferencia: "Total transferencia",
                    total: "Total final",
                    tortasVendidas: "Total de tortas vendidas",
                    bebidasVendidas: "Total de bebidas vendidas",
                    extrasVendidos: "Total de ingredientes extras vendidos",
                    sandwichesVendidos: "Total de sandwiches vendidos",
                    desayunosVendidos: "Total de desayunos vendidos",
                    totalProductosVendidos: "Total de los productos vendidos",
                    enviosVendidos: "Total de envios realizados"
                }]
                const dataFinal = {
                    efectivo: efectivo,
                    tarjeta: tarjeta,
                    transferencia: transferencia,
                    total: efectivo + transferencia + tarjeta,
                    tortasVendidas: tortasVendidas,
                    bebidasVendidas: bebidasVendidas,
                    extrasVendidos: extrasVendidos,
                    sandwichesVendidos: sandwichesVendidos,
                    desayunosVendidos: desayunosVendidos,
                    totalProductosVendidos: tortasVendidas + bebidasVendidas + extrasVendidos + sandwichesVendidos + desayunosVendidos,
                    enviosVendidos: enviosVendidos
                }
                //console.log(dataFinal)

                setTotales(dataFinal)
                setTitulos(dataTitulos)
                // Termina procesamiento de la nueva información del corte del día
            })
        } catch (e) {
            console.log(e)
        }
    }, []);

    const generacionCSV = () => {
        try {
            toast.info("Generando contenido, espere por favor ....")
            const timer = setTimeout(() => {
            const dataConcatTitulos = titulos.concat(totales)
            const datosTemp = listDetallesDia.concat(dataConcatTitulos)
            exportCSVFile(headers, datosTemp, "CORTE_CAJA_DIA" + "_" + dia)
        }, 5000);
        return () => clearTimeout(timer);
        } catch (e) {
            console.log(e)
        }
    }


    return (
        <>
            <Badge
                bg="light"
                className="iconoExcel"
                onClick={() => {
                    generacionCSV()
                }}
            >
                <Image
                    title="Imprimir CSV"
                    alt="Imprimir CSV"
                    src={LogoExcel}
                    className="descargaExcel"
                />
            </Badge>
        </>
    );
}

export default ProcesamientoCsv;
