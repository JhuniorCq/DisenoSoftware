import React from "react";
import { Link } from 'react-router-dom';
import "../styles/vistaConfiguracion.css";

const Configuracion = () => {
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
      <div className="section1">
        <button className="btn1">Enviar correo</button>
      </div>
      <div className="section2">
        <button className="btn2">Enviar</button>
        <div className="cont">
          <h5 className="subtitulo"> Público objetivo</h5>
          <select className="combobox">
            <option value="opcion1">Opción 1</option>
            <option value="opcion2">Opción 2</option>
            <option value="opcion3">Opción 3</option>
          </select>
        </div>
        <div className="cont">
          <h5 className="subtitulo1">Asunto</h5>
          <input type="text" className="caja1" placeholder="Escribe aquí" />
        </div>
        <div className="cont">
          <h5 className="subtitulo2">Mensaje</h5>
          <input type="text" className="caja2" placeholder="Escribe aquí" />
        </div>
      </div>
    </div>
  );
};

export default Configuracion;
