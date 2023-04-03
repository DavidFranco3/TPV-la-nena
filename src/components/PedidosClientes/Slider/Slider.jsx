import { Spinner, Button, Col, Row, Alert, Image } from "react-bootstrap";
import "../../../scss/styles.scss";
import paso1 from "../../../assets/slider/paso1.png";
import paso2 from "../../../assets/slider/paso2.png";
import paso3 from "../../../assets/slider/paso3.png";
import paso4 from "../../../assets/slider/paso4.png";

function Slider(props) {
    const { setRefreshCheckLogin, location, navigate } = props;

    return (
        <>
            <div className="slider-frame">
                <ul>
                    <li><h2>DAVID</h2><Image src={paso1} alt="paso1"/></li>
                    <li><Image src={paso2} alt="paso2"/></li>
                    <li><Image src={paso3} alt="paso3"/></li>
                    <li><Image src={paso4} alt="paso4"/></li>
                </ul>
            </div>
        </>
    );
}

export default Slider;
