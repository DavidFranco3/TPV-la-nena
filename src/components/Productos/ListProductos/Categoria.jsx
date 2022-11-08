import { useState, useEffect } from 'react';
import {obtenerCategoria} from "../../../api/categorias";
import {toast} from "react-toastify";

function Categoria(props) {
    const { id } = props;

    // Para almacenar el nombre del cliente
    const [nombreCategoria, setNombreCategoria] = useState("");

    useEffect(() => {
        //
        try {
            obtenerCategoria(id).then(response => {
                const { data } = response;
                // console.log(data)
                const { nombre } = data;
                setNombreCategoria(nombre)
            }).catch(e => {
                //console.log(e)
                if(e.message === 'Network Error') {
                    //console.log("No hay internet")
                    toast.error("Conexión al servidor no disponible");
                }
            })
        } catch (e) {
            console.log(e)
        }
    }, [id]);

    return (
        <>
            {nombreCategoria}
        </>
    );
}

export default Categoria;
