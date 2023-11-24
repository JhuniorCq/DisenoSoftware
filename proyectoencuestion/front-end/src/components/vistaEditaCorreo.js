import React from "react";
import { Link } from 'react-router-dom';
import "../styles/vistaeditar.css";

const Editar = () => {
  return (
    <div>
      <header className="VCheader">
      <a href="/Vistac" className="VCbutton1">
       Salir
      </a>
      </header>
      <div className="VCbuttons">
        <button className="VCbutton2">Editar</button>

        <a href="/EnviarCorreo" className="VCbutton3">
        Enviar o programa
        </a>

      </div>
      <a href="/EnviarCorreo" className="VCbtnsg">
        Siguiente
        </a>
      <div className="VCcontainer">
        <div>
          <h5 className="VCsb1" id="asunto">
            Asunto
          </h5>
          <div id="VCcuadrotexto"></div>
        </div>
        <div>
          <h5 className="VCsb1" id="VCname">
            Nombre del correo
          </h5>
          <input type="text" className="VCbox1" placeholder="Escribe aquí" />
        </div>
        <div>
          <div id="VCcuadrotexto1"></div>
        </div>
      </div>
    </div>
  );
};

export default Editar;
