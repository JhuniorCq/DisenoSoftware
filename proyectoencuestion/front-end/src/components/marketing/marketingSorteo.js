import { useEffect, useState } from "react";
import SorteoMarketing from "../navbarsorteo";
import Vistaparti from "../vistaParticipantes";
import Configuracion from "../vistaConfiguracion";
import Sorteo from "../vistaSorteo";
import VistaEnviar from "../vistaEnviarCorreo";
import Editar from "../vistaEditaCorreo";

const SorteoMrk = () => {
    return(
        <body>
            <SorteoMarketing/>
            <Vistaparti/>
            <Configuracion/>
            <Sorteo/>
            <Editar/>
            <VistaEnviar/> 
        </body>
    );
}
export default Sorteo;