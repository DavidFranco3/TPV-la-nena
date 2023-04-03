import { Spinner, Button, Col, Row, Alert, Image } from "react-bootstrap";
import "../../../scss/styles.scss";
import paso1 from "../../../assets/slider/paso1.png";
import paso2 from "../../../assets/slider/paso2.png";
import paso3 from "../../../assets/slider/paso3.png";
import paso4 from "../../../assets/slider/paso4.png";
import paso6 from "../../../assets/slider/paso6.png";

function Slider(props) {
    const { setRefreshCheckLogin, location, navigate } = props;

    return (
        <>
            <div className="slider-frame">
                <ul>
                    <li><h1>PASO 1:</h1><h2>Seleccionar la categoría, debes hacer click sobre la imagen de alguna categoria, una vez que lo hagas te apareceran los productos pertenecientes a dicha categoría</h2><Image src={paso1} alt="paso1"/></li>
                    <li><h1>PASO 2:</h1><h2>Seleccionar los productos, una vez que seleccionaste una categoría, lo siguiente es elegir productos, debes hacer click sobre la imagen de algun producto y este se añadira al ticket, si deseas regresar al menu de categorías, debes dar click sobre el pequeño boton con forma de casa</h2><Image src={paso2} alt="paso2"/></li>
                    <li><h1>PASO 3:</h1><h2>Añadir los detalles, en el pequeño menu inferior, da click sobre el boton con forma de signo de exclamacion, y se te desplegara un modal</h2><Image src={paso3} alt="paso3"/></li>
                    <li><h1>PASO 4:</h1><h2>Añadir detalles, en este modal deberas introducir la informacion adicional de la compra</h2><Image src={paso4} alt="paso4"/></li>
                    <li><h1>PASO 5:</h1><h2>Aqui hay 2 opciones, la primera es hacer click sobre el boton de basurero, lo cual limpiara todo el ticket y deberas repetir el proceso desde el paso 1, la segunda opcion es hacer click sobre el boton con forma de palomita, lo cual guardara tu compra</h2><Image src={paso3} alt="paso3"/></li>
                    <li><h1>PASO 6:</h1><h2>Confirmar el pedido, por ultimo, solo debes hacer click sobre el boton que dice "Enviar mensaje", esto abrira tu apliacion de Whatsapp en un chat con el negocio y tendras un mensaje ya escrito, lo unico que debes hacer es click en enviar y listo, ya solo deberas esperar tu pedido</h2><Image src={paso6} alt="paso3"/></li>
                </ul>
            </div>
        </>
    );
}

export default Slider;
