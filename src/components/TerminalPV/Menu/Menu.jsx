import { useEffect } from 'react';
import "../../../scss/styles.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import Producto from "../Producto";
import Categoria from "../Categoria";
import { getTokenApi, isExpiredToken, logoutApi } from "../../../api/auth";
import { toast } from "react-toastify";
import { Button } from "react-bootstrap";

function Menu(props) {
    const { addItems, setRefreshCheckLogin, listProductos, listCategorias, setCategoriaActual, categoriaActual } = props;

    // Cerrado de sesión automatico
    useEffect(() => {
        if (getTokenApi()) {
            if (isExpiredToken(getTokenApi())) {
                toast.warning("Sesión expirada");
                toast.success("Sesión cerrada por seguridad");
                logoutApi();
                setRefreshCheckLogin(true);
            }
        }
    }, []);
    // Termina cerrado de sesión automatico

    const clickHandler = (product) => {
        addItems(product);
    }

    const clickHomeHandler = () => {
        setCategoriaActual("")
    }

    return (
        <>
            <div className="menu">
                {
                    !categoriaActual ?
                        (
                            listCategorias &&
                            (
                                listCategorias.map((categoria, index) => {
                                    return (
                                        <Button
                                            key={index}
                                            title={categoria.nombre}
                                            onClick={() => setCategoriaActual(categoria.id)}>
                                            <Categoria
                                                key={index}
                                                imagen={categoria.imagen}
                                                nombre={categoria.nombre}
                                            />
                                        </Button>
                                    )
                                })
                            )
                        )
                        :
                        (
                            <>
                                <div className="regresarCategorias">
                                    <FontAwesomeIcon
                                        icon={faHouse}
                                        className="home"
                                        title="Regresar"
                                        onClick={() => {
                                            clickHomeHandler()
                                        }}
                                    />
                                </div>
                                {
                                    listProductos &&
                                    (
                                        listProductos.map((product, index) => {
                                            return (
                                                <Button key={index}
                                                    title={product.nombre + " " + "$" + product.precio}
                                                    onClick={() => clickHandler(product)}>
                                                    <Producto
                                                        key={index}
                                                        imagen={product.imagen}
                                                        nombre={product.nombre}
                                                        precio={product.precio}
                                                    />
                                                </Button>
                                            )
                                        })
                                    )

                                }
                            </>
                        )
                }
            </div>
        </>
    );
}

export default Menu;
