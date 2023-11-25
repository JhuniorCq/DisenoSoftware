import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const campanasAPI = axios.create({
    baseURL: 'https://modulo-marketing.onrender.com'
})

export const getCampanas = async () => {
    const data = await (await campanasAPI.get('/mostrarCampanas')).data;
    return data;
}
// devolviendo de la primera manera


export const crearCampanas = (campana) => {
    campanasAPI.post('/crearCampana', campana);
}

export const useCreateCampana = () => {
    const queryClient = useQueryClient();

    return useMutation(crearCampanas, {
        onSuccess: () => {
            queryClient.invalidateQueries('campanas');
        },
    });
};

// ------------------------------------------------------------------------

export const createSegmentacion = (segmentacion) => {
    campanasAPI.post('/crearSegmentacion', segmentacion);
}

export const useCreateSegmentacion = () => {
    const queryClient = useQueryClient();

    return useMutation(createSegmentacion, {
        onSuccess: () => {
            queryClient.invalidateQueries('segmentacion');
        },
    });
};


// ------------------------------------------------------------------------

export const getPublicoCorreosCampanas = async (cliente = "") => {

    const { data } = (await axios.get('http://localhost:3000/publicocorreoscampanas'));

    console.log("publico fetch!");

    if (cliente.length >= 4) {
        const filterData = data.filter((dato) => {
            return (dato.name.toString().toLowerCase().includes(cliente.toLowerCase()) ||
                dato.surname.toString().toLowerCase().includes(cliente.toLowerCase()))
        })
        return [...filterData];
    }

    return data;

}
// devolviendo de la segunda manera (hay mas)

export const createPublicoCorreosCampanas = (publico) => {
    campanasAPI.post('/publicocorreoscampanas', publico)
}

// export const createCorreosCampanas




export const getCorreosCampanas = async () => {
    const data = await (await campanasAPI.get('/mostrarCampanasCorreo')).data;
    return data;
}

export const createCorreosCampanas = (correo) => {
    campanasAPI.post('/correoscampanascreadas', correo);
}