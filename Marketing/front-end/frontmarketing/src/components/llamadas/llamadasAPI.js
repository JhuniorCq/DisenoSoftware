import axios from "axios";

const campanasAPI = axios.create({
    baseURL: 'http://localhost:3000'
})


export const getLlamadasCliente = async () => {
    const data = await (await campanasAPI.get('/clientesllamadas')).data;
    return data;
}

export const getLlamadasAdministrar = async () => {
    const data = await (await campanasAPI.get('/llamadasadministrar')).data;
    return data;
}

export const createLlamadas = (llamada) => {
    campanasAPI.post('/clientesllamadas', llamada);
}

