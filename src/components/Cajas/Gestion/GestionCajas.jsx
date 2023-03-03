import { LogsInformativos } from "../../Logs/LogsSistema/LogsSistema";
import { obtenerCaja, actualizaCaja } from "../../../api/cajas";

// Realiza la modificación de saldos al realizar un movimiento
export function LogCajaActualizacion(caja, total) {
    try {
        obtenerCaja(caja).then(response => {
            const { data } = response;

            const dataTemp = {

                saldo: parseFloat(data.saldo) + parseFloat(total)
            }
            // Inicia actualización de saldos de los socios
            actualizaCaja(caja, dataTemp).then(response => {
                const { data } = response;
                LogsInformativos("Se actualizo el saldo de la caja " + caja, dataTemp)
                // console.log("Actualización de saldo personal")
            }).catch(e => {
                // console.log(e)
            })
            // Termina actualización de saldos de los socios
        }).catch(e => {
            console.log(e)
        })
    } catch (e) {
        console.log(e)
    }
}