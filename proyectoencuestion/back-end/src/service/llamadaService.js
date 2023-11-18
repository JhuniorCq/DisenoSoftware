const {LlamadaRepository} = require('../repository/llamadaRepository');
const llamadaRepository = new LlamadaRepository();

class LlamadaService{
    async crearLlamada(llamadaData){
        //Validación de Datos

        //Lógica

        //Llamada a LlamadaRepository para que ingrese datos en la BD
        const result = llamadaRepository.crearLlamada(llamadaData);
        return result;
    }

    async mostrarLlamadas(){


        const result = llamadaRepository.mostrarLlamadas();
        return result;
    }
}

module.exports = {
    LlamadaService: LlamadaService
}