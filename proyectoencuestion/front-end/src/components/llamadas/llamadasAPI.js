import axios from "axios";

const campanasAPI = axios.create({
    baseURL: 'http://localhost:3000',
});

export const getLlamadasCliente = async () => {
    try {
        const response = await campanasAPI.get('/clientesllamadas');
        return response.data;
    } catch (error) {
        // Handle the error, e.g., log it or return an empty array.
        console.error("Error fetching client calls:", error);
        return [];
    }
};

export const getLlamadasAdministrar = async () => {
    try {
        const response = await campanasAPI.get('/llamadasadministrar');
        return response.data;
    } catch (error) {
        // Handle the error, e.g., log it or return an empty array.
        console.error("Error fetching administrate calls:", error);
        return [];
    }
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
