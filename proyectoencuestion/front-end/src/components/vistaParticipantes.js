import React from "react";
import { Link } from 'react-router-dom';
import "../styles/vistaParticipantes.css";

const Vistaparti = () => {
  return (
    <div>
      <div className="Pencabezado">
        <h3 className="Ph3">Sorteos</h3>
        <div className="Pcontainer">
          <ul className="Pul">
            <li>
              <a className="Pli" href="/Sorteom">Participantes</a>
            </li> 
            <li>
              <a className="Pli" href="/Vistac">Configuracion</a>
            </li> 
            <li>
              <a className="Pli" href="/Vistas">Sorteo</a>
            </li> 
          </ul>
        </div>
        <hr className="Phr" />
      </div>
      <div className="Pencabezado">
        <h4 className="Ptxt">Público objetivo</h4>
        <h6 className="Ptxt">Público objetivo</h6>
        <input type="text" className="Psearch" placeholder="Buscar participante" />
      </div>
      <div className="Ptable">
        <div className="Pcalendar-row">
          <div className="Pcalendar-day">id</div>
          <div className="Pcalendar-day">Nombres</div>
          <div className="Pcalendar-day">Apellidos</div>
          <div className="Pcalendar-day">Correo electronico</div>
          <div className="Pcalendar-day">Genero</div>
          <div className="Pcalendar-day">Celular</div>
        </div>
        {[...Array(7)].map((_, index) => (
          <div key={index} className="Pcalendar-row">
            {[...Array(6)].map((_, cellIndex) => (
              <div key={cellIndex} className="Pcalendar-cell"></div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Vistaparti;
