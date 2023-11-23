import React from "react";
import { Link } from 'react-router-dom';
import "../styles/vistaParticipantes.css";

const Vistaparti = () => {
  return (
    <div>
      <div className="encabezado1">
        <h1>Sorteos</h1>
        <div className="container">
          <ul>
          <li className="sub">
          <Link to="/Vistap">Participantes</Link>
          </li>
          <li className="sub">
          <Link to="/Vistac">Configuracion</Link>
          </li>
          <li className="sub">
          <Link to="/Vistas">Sorteo</Link>
          </li>
          </ul>
        </div>
        <hr />
      </div>
      <div className="encabezado">
        <h4 className="txt">Público objetivo</h4>
        <h5 className="txt">Público objetivo</h5>
        <input type="text" className="search" placeholder="Buscar participante" />
      </div>
      <div className="table">
        <div className="calendar-row">
          <div className="calendar-day">id</div>
          <div className="calendar-day">Nombres</div>
          <div className="calendar-day">Apellidos</div>
          <div className="calendar-day">Correo electronico</div>
          <div className="calendar-day">Genero</div>
          <div className="calendar-day">Celular</div>
        </div>
        {[...Array(7)].map((_, index) => (
          <div key={index} className="calendar-row">
            {[...Array(6)].map((_, cellIndex) => (
              <div key={cellIndex} className="calendar-cell"></div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Vistaparti;
