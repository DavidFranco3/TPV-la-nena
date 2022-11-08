import { API_CLOUDINARY } from "../utils/constants";

import axios from "axios";

// Guardar archivos en cloudinary
export async function subeArchivosCloudinary(imagen, carpeta) {

    const data = new FormData()
    data.append("file", imagen)
    data.append("upload_preset", "TPV_LA_NENA")
    data.append('public_id', `${carpeta}/${Date.now() + "_" + imagen.name}`)
    data.append('folder', `${carpeta}`)
    data.append("cloud_name","omarlestrella")

    const config = {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    };

    return await axios.post(API_CLOUDINARY, data, config);
}
