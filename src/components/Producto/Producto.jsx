import React from 'react';
import "./Producto.scss";

function Producto(props) {
    const { imagen, nombre, precio } = props;
    return (
        <>
            <div className="product">
                <div className="product__image">
                    <img src={imagen} alt={nombre + " " + precio} title={nombre + " " + "$"+precio}/>
                </div>
                <div className="product__name">
                    <p className="informacionProducto">{nombre}</p>
                </div>
                <div className="product__price">
                    <p className="informacionProducto">$ {precio}</p>
                </div>
            </div>
        </>
    );
}

export default Producto;
