import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';
import "../styles/vistaParticipantes.css";

const Vistaparti = () => {
  const [campañasSorteo, setCampañasSorteo] = useState([]);
  const [campañaSeleccionada, setCampañaSeleccionada] = useState("opcion1");
  const [personas, setPersonas] = useState([]);

  useEffect(() => {
    cargarCampañasSorteo();
  }, []);

  useEffect(() => {
    cargarPersonasPorCampaña();
  }, [campañaSeleccionada]);

  const cargarCampañasSorteo = () => {
    const url = 'https://modulo-marketing.onrender.com/mostrarCampanasSorteo';

    axios.get(url)
      .then(response => {
        setCampañasSorteo(response.data);
      })
      .catch(error => console.error('Error al cargar las campañas de sorteo:', error));
  };

  const cargarPersonasPorCampaña = () => {
    const urlPersonas = `https://modulo-marketing.onrender.com/obtenerClientesSegmentados/${campañaSeleccionada}`;

    axios.get(urlPersonas)
      .then(response => {
        console.log('Respuesta de la API:', response.data);
        setPersonas(response.data);
      })
      .catch(error => console.error('Error al cargar las personas por campaña:', error));
  };

  const handleCampañaChange = event => {
    setCampañaSeleccionada(event.target.value);
  };

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
        <select className="CCselect" onChange={handleCampañaChange} value={campañaSeleccionada}>
          <option value="opcion1">Seleccione la campaña</option>
          {campañasSorteo.map(campaña => (
            <option key={campaña.id} value={campaña.id}>{campaña.nombre}</option>
          ))}
        </select>
        <input type="text" className="Psearch" placeholder="Buscar participante" />
      </div>
      <div className="Ptable">
        <div className="Pcalendar-row">
          <div className="Pcalendar-day">id</div>
          <div className="Pcalendar-day">Nombres</div>
          <div className="Pcalendar-day">Apellidos</div>
          <div className="Pcalendar-day">Correo electrónico</div>
          <div className="Pcalendar-day">Género</div>
          <div className="Pcalendar-day">Celular</div>
        </div>
        {Array.isArray(personas) ? (
          personas.map(persona => (
            <div key={persona.id} className="Pcalendar-row">
              <div className="Pcalendar-cell">{persona.id}</div>
              <div className="Pcalendar-cell">{persona.nombres}</div>
              <div className="Pcalendar-cell">{persona.apellidos}</div>
              <div className="Pcalendar-cell">{persona.correo}</div>
              <div className="Pcalendar-cell">{persona.genero}</div>
              <div className="Pcalendar-cell">{persona.celular}</div>
            </div>
          ))
        ) : (
          <p>No se encontraron personas.</p>
        )}
      </div>
    </div>
  );
};

export default Vistaparti;
