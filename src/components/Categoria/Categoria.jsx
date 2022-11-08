import React from 'react';
import "../../scss/styles.scss";

function Categoria(props) {
    const { imagen, nombre } = props;
    return (
        <>
            <div className="categoria">
                <div className="categoria__image">
                    <img src={imagen} alt={nombre} title={nombre} />
                </div>
                <div className="categoria__name">
                    <p>{nombre}</p>
                </div>
            </div>
        </>
    );
}

export default Categoria;
