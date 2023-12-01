import axios from "axios";

const campanasAPI = axios.create({
    baseURL: 'https://modulo-marketing.onrender.com',
});

export const getLlamadasCliente = async (id) => {

    if (id === '-1') {
        try {
            const response = await axios.get('http://localhost:3000/clientesllamadas');
            return response.data;
        } catch (error) {
            // Handle the error, e.g., log it or return an empty array.
            console.error("Error fetching client calls:", error);
            return [];
        }
    }
    else {
        try {
            const response = await campanasAPI.get('/mostrarCampanasLlamada');
            return response.data;
        } catch (error) {
            // Handle the error, e.g., log it or return an empty array.
            console.error("Error fetching client calls:", error);
            return [];
        }
    }
};

export const getLlamadasAdministrar = async () => {
    // try {
    //     const response = await axios.get('http://localhost:3000/llamadasadministrar');
    //     return response.data;
    // } catch (error) {
    //     // Handle the error, e.g., log it or return an empty array.
    //     console.error("Error fetching administrate calls:", error);
    //     return [];
    // }

    const data = await (await campanasAPI.get('/mostrarLlamadasAdministrar')).data;
    return data;
};

export const createLlamadasAdministrar = async (llamada) => {
    try {
        await campanasAPI.post('/llamadasadministrar', llamada);
        // Optionally, you can return a success response or handle it as needed.
    } catch (error) {
        // Handle the error, e.g., log it or throw an exception.
        console.error("Error creating administrate call:", error);
        throw error;
    }
};
