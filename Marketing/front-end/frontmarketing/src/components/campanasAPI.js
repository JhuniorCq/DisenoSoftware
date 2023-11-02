import axios from "axios";

const campanasAPI = axios.create({
    baseURL : 'http://localhost:3000'
})

export const getCampanas = async() => {
    const data = await (await campanasAPI.get('/campanas')).data;
    return data;
}
// devolviendo de la primera manera


export const crearCampanas = (campana) => {
    campanasAPI.post('/campanas', campana)
}

// ------------------------------------------------------------------------

export const getPublicoCorreosCampanas = async(cliente = "") => {

    const {data} = (await campanasAPI.get('/publicocorreoscampanas'));
    
    console.log("publico fetch!");

    if(cliente.length >= 4){
        const filterData = data.filter((dato) =>{
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
    const {data} = (await campanasAPI.get('/correoscampanascreadas'));
    return data;
}

export const createCorreosCampanas = (correo) => {
    campanasAPI.post('/correoscampanascreadas', correo);
}