import { useState, useEffect, useCallback } from 'react';
import { useDropzone } from "react-dropzone";
import { toast } from "react-toastify";
import { Image, Form } from "react-bootstrap";
import "../../scss/styles.scss";

function Dropzone(props) {
    const { setImagenFile, imagenProductoBD } = props;
    //console.log(imagenProductoBD)

    const [slide, setSlide] = useState([]);

    const onDropImagen = useCallback((acceptedFiles) => {
        //console.log(acceptedFiles);

        setSlide(acceptedFiles.map(file => Object.assign(file, {
            preview: URL.createObjectURL(file)
        })));

        const file = acceptedFiles[0];
        //setURLFinal(URL.createObjectURL(file));
        setImagenFile(file);
    });

    const { getRootProps, getInputProps } = useDropzone({
        accept: "image/*",
        onDrop: onDropImagen,
    });

    useEffect(() => {
        slide.map((file, key) => {
            const tempType = file.type.split("/");
            const type = tempType[0];
            //console.log(Ext);
            //console.log(type);
            if (type !== "image") {
                //const tempP = file.preview;
                //slider1(tempP);
                toast.error("Archivo no permitido");
            }
            return "";
        });
    }, [slide]);

    const visualizarSlide1 = slide.map(file => (
        <div key={file?.name}>
            <div>
                <Image
                    src={file?.preview}
                    alt="logo"
                />
            </div>
        </div>
    ));

    return (
        <div className="archivo"
            {...getRootProps()}
        >
            {imagenProductoBD && slide.length === 0 ?
                (
                    <>
                        <aside>
                            <Image
                                src={imagenProductoBD}
                                alt="logo"
                            />
                        </aside>
                    </>
                )
                :
                slide.length !== 0 &&
                (
                    <>
                        <aside>
                            {visualizarSlide1}
                        </aside>
                    </>
                )
            }
            <Form.Control {...getInputProps()} />
        </div>
    );
}

export default Dropzone;
