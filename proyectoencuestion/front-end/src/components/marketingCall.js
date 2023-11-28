import React from "react";
import { Link } from 'react-router-dom';
import "../styles/callcenter.css"

const CallcenterM = () => {
  return (
    <div>
      <header className="CCheader">
      <a href="/" className="CCbutton1">
       Salir
      </a>
      </header>
      <div className="CCencabezado">
        <h3 className="CCh3">Llamadas</h3>
        <div className="CCcontainer">
          <ul className="CCul">
            <li>
              <a className="CCli" >Clientes</a>
            </li> 
          </ul>
        </div>
        <hr className="CChr" />
      </div>
      <div className="CCencabezado1">
        <h4 className="CCtxt">Público objetivo</h4>
        <h6 className="CCtxt">Público objetivo</h6>
        <input type="text" className="CCsearch" placeholder="Buscar participante" />
      </div>
      <div className="CCtable">
        <div className="CCcalendar-row">
          <div className="CCcalendar-day">Nombres</div>
          <div className="CCcalendar-day">Apellidos</div>
          <div className="CCcalendar-day">Celular</div>
          <div className="CCcalendar-day">Estado</div>
        </div>
        {[...Array(7)].map((_, index) => (
          <div key={index} className="CCcalendar-row">
            {[...Array(4)].map((_, cellIndex) => (
              <div key={cellIndex} className="CCcalendar-cell"></div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CallcenterM;
