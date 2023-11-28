import React from "react";
import { Link } from 'react-router-dom';
import SorteoMarketing from "./navbarsorteo";
import "../styles/vistaConfiguracion.css";


const Configuracion = () => {
  return (
    <div>
      <SorteoMarketing /> 
      <div className="Cencabezado">
        <h3 className="Ch3">Sorteos</h3>
        <div className="Ccontainer">
        <ul className="Cul">
            <li>
              <a className="Cli" href="/Sorteom">Participantes</a>
            </li> 
            <li>
              <a className="Cli" href="/Vistac">Configuracion</a>
            </li> 
            <li>
              <a className="Cli" href="/Vistas">Sorteo</a>
            </li>  
          </ul>
        </div>
        <hr className="Chr" />
      </div>

      <div className="Csection1">
        <div className="Cbtn1">Enviar correo</div>
      </div>
      <div className="Csection2">
         <button className="Cbtn2">
        <Link to="/EditarCorreo">Enviar</Link>
      </button>
        <div className="Ccont">
          <h5 className="Ch5"> Público objetivo</h5>
          <select className="Ccombobox">
            <option value="opcion1">Opción 1</option>
            <option value="opcion2">Opción 2</option>
            <option value="opcion3">Opción 3</option>
          </select>
        </div>
        <div className="Ccont">
          <h5 className="Ch5">Asunto</h5>
          <input type="text" className="Ccaja1" placeholder="Escribe aquí" />
        </div>
        <div className="Ccont">
          <h5 className="Ch5">Mensaje</h5>
          <input type="text" className="Ccaja2" placeholder="Escribe aquí" />
        </div>
      </div>
    </div>
  );
};

export default Configuracion;
