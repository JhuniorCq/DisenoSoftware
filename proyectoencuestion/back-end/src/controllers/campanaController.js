const {CampanaService} = require('../service/campanaService');
const {CrearCampanaCommand, MostrarCampanasCommand, EliminarCampanaCommand, MostrarTipoCampanaCommand, MostrarCampanasEsteMesCommand, MostrarCampanasRecientesCommand, MostrarCampanasCorreoCommand, MostrarCampanasLlamadaCommand, MostrarCampanasSorteoCommand, BuscarCampanaPorIDCommand, InfoCampanaCommand} = require('../command/campanaCommand');
const campanaService = new CampanaService();
const axios = require('axios');

//Decirla a Enzo que los inputs en CREAR CAMPAÑA sean los que se ponen en la desestructuración de campanaData
const crearCampana = async (req, res, next) => {
    try {

        const responseClientes = await axios.get('https://clientemodulocrm.onrender.com/clientes');
        const datosTodosClientes = responseClientes.data;// ME TRAE A TODOS LOS CLIENTES
        // const dni = "123456789";
        const responseCliente = await axios.get(`https://clientemodulocrm.onrender.com/clientes/buscarPorDNI/${dni}`);
        const datosUnCliente = responseCliente.data;// ME TRAR UN CLIENTE CUANDO PASO SU DNI

        const crearCampanaCommand = new CrearCampanaCommand(campanaService);
        
        const campanaData = req.body;

        const result = await crearCampanaCommand.execute(campanaData, datosTodosClientes, datosUnCliente);

        res.json(result);

    } catch (error) {
        next(error);
    }
}

const mostrarCampanas = async (req, res, next) => {
    try {
        const mostrarCampanasCommand = new MostrarCampanasCommand(campanaService);
        const result = await mostrarCampanasCommand.execute();

        // console.log(result);
        res.json(result);

    } catch(error) {
        next(error);
    }
}

const mostrarCampanasEsteMes = async (req, res, next) => {
    try {
        const mostrarCampanasEsteMesCommand = new MostrarCampanasEsteMesCommand(campanaService);
        const result = await mostrarCampanasEsteMesCommand.execute();

        console.log(result);
        res.json(result);

    } catch(error) {
        next(error);
    }
}

const mostrarCampanasRecientes = async (req, res, next) => {
    try {

        const mostrarCampanasRecientesCommand = new MostrarCampanasRecientesCommand(campanaService);
        const result = await mostrarCampanasRecientesCommand.execute();

        console.log(result);
        res.json(result);

    } catch(error) {
        next(error);
    }
}

const eliminarCampana = async (req, res, next) => {
    try {
        const eliminarCampanaCommand = new EliminarCampanaCommand(campanaService);

        const {id} = req.params;

        const result = await eliminarCampanaCommand.execute(id);

        console.log(`La campaña #${id} ha sido eliminada`); //Para probar que se elimina

        if(result.rowCount === 0){
            return res.status(404).json({
                message: "Campaña no encontrada."
            });
        }

        console.log(result.rows);

        res.sendStatus(204);

    } catch (error) {
        next(error);
    }
}

//Esta Ruta mostrará los tipos de campaña en los "options" del "select"
const mostrarTipoCampana = async (req, res, next) => {
    try {
        const mostrarTipoCampanaCommand = new MostrarTipoCampanaCommand(campanaService);
        const {id} = req.params;
        
        const nombreTipoCampana = await mostrarTipoCampanaCommand.execute(id);
        console.log(nombreTipoCampana);
        res.send(nombreTipoCampana);

    } catch(error) {
        next(error);
    }
}

const mostrarCampanasCorreo = async (req, res, next) => {
    try {
        const mostrarCampanasCorreoCommand = new MostrarCampanasCorreoCommand(campanaService);
        const result = await mostrarCampanasCorreoCommand.execute();

        console.log(result);
        res.json(result);
    } catch(error) {
        next(error);
    }
}

const mostrarCampanasLlamada = async (req, res, next) => {
    try {
        const mostrarCampanasLlamadaCommand = new MostrarCampanasLlamadaCommand(campanaService);
        const result = await mostrarCampanasLlamadaCommand.execute();

        console.log(result);
        res.json(result);
    } catch(error) {
        next(error);
    }
}

const mostrarCampanasSorteo = async (req, res, next) => {
    try {
        const mostrarCampanasSorteoCommand = new MostrarCampanasSorteoCommand(campanaService);
        const result = await mostrarCampanasSorteoCommand.execute();

        console.log(result);
        res.json(result);
    } catch(error) {
        next(error);
    }
}

const buscarCampanaPorID = async (req, res, next) => {
    try {
        const buscarCampanaPorIDCommand = new BuscarCampanaPorIDCommand(campanaService);

        const {idCampana} = req.params;

        const campana_id = await buscarCampanaPorIDCommand.execute(idCampana);

        res.json(campana_id);//Devolver con un res.json o un res.send ¿?

    } catch(error) {
        next(error);
    }
}

const infoCampana = async (req, res, next) => {
    try {
        const infoCampanaCommand = new InfoCampanaCommand(campanaService);
        const result = await infoCampanaCommand.execute();
        
        res.json(result);
    } catch(error) {
        next(error);
    }
}

module.exports = {
    crearCampana: crearCampana,
    mostrarCampanas: mostrarCampanas,
    mostrarCampanasEsteMes: mostrarCampanasEsteMes,
    mostrarCampanasRecientes: mostrarCampanasRecientes,
    eliminarCampana: eliminarCampana,
    mostrarTipoCampana: mostrarTipoCampana,
    mostrarCampanasCorreo: mostrarCampanasCorreo,
    mostrarCampanasLlamada: mostrarCampanasLlamada,
    mostrarCampanasSorteo: mostrarCampanasSorteo,
    buscarCampanaPorID: buscarCampanaPorID,
    infoCampana: infoCampana
}